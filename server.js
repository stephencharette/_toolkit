const functions = require("firebase-functions");

const express = require("express"); //Line 1
const app = express();
var cors = require("cors");
const fetch = require("node-fetch");
const path = require("path");
const admin = require("firebase-admin");

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(cors());
app.use(express.static(path.join(__dirname, "client/build")));

let bodyParser = require("body-parser");
app.use(bodyParser.json());

FIREBASE_PATH = "/etc/secrets/firebase.json";
let serviceAccount = require(FIREBASE_PATH);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const librariesCollection = db.collection("libraries");
const settingsCollection = db.collection("settings");

// TODO: hitting twice???
const verifyTokenMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return;

  const idToken = token.split("Bearer ")[1];

  if (!token || !token.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Verify the ID token and extract the user ID
  const decodedToken = await admin
    .auth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
      req.userId = decodedToken.uid;
    })
    .catch((error) => {
      console.error("Error verifying ID token:", error);
    });

  next();
};

app.post("/api/login", verifyTokenMiddleware, async (req, res) => {
  const userId = req.userId;
  const settings = await getSettings(userId);
  console.log(settings);
  if (!settings) {
    const response = await settingsCollection
      .doc(userId)
      .set({ theme: "Nord" });
    console.log(response);
  }
  return res.status(200).json({ userId: userId });
});

app.get(
  "/users/:user_id/code_snippets",
  verifyTokenMiddleware,
  async (req, res) => {
    const userId = req.params.user_id;
    const library = await getLibrary(userId);

    return res.status(200).json({ userId: userId, library: library });
  }
);

async function getLibrary(userId) {
  const codeSnippetsCollection = librariesCollection
    .doc(userId)
    .collection("code_snippets");

  let codeSnippets = {};

  await codeSnippetsCollection
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const codeSnippetId = doc.id;
        const data = doc.data();

        codeSnippets[codeSnippetId] = data;
      });
    })
    .catch((error) => {
      console.error("Error getting code snippets: ", error);
    });

  return { codeSnippets: codeSnippets };
}

async function getSettings(userId) {
  const userSettingsDoc = settingsCollection.doc(userId);
  const userSettingsSnapshot = await userSettingsDoc.get();
  const settings = userSettingsSnapshot.data();

  return settings;
}

async function initialize() {}

initialize();

app.get("/");

app.get("/settings/:user_id", verifyTokenMiddleware, async (req, res) => {
  const userId = req.params.user_id;
  const settings = await getSettings(userId);

  return res.status(200).json({ settings: settings });
});

app.patch("/settings/:user_id", verifyTokenMiddleware, async (req, res) => {
  const userId = req.params.user_id;
  const userSettings = await settingsCollection.doc(userId);

  let updateFields = {};
  if (req.query.theme) {
    updateFields["theme"] = req.query.theme;
  }

  try {
    await userSettings.update(updateFields);
  } catch (error) {
    // TODO: make this a constant (No document to update)
    if (error.code === 5) {
      await settingsCollection.doc(userId).set(updateFields);
    }
  }

  return res.status(200).json({ settings: updateFields });
});

app.patch(
  "/users/:user_id/code_snippets/:code_snippet_id",
  verifyTokenMiddleware,
  async (req, res) => {
    const userId = req.params.user_id;
    const codeSnippetId = req.params.code_snippet_id;
    const codeSnippet = await librariesCollection
      .doc(userId)
      .collection("code_snippets")
      .doc(codeSnippetId);

    let updateFields = {};
    if (req.query.lang) {
      updateFields["lang"] = req.query.lang;
    }
    if (req.query.code) {
      updateFields["code"] = req.query.code;
    }
    if (req.query.title) {
      updateFields["title"] = req.query.title;
    }

    await codeSnippet.update(updateFields);

    return res.status(200).json({ code_snippet: updateFields });
  }
);

app.post(
  "/users/:user_id/code_snippets",
  verifyTokenMiddleware,
  async (req, res) => {
    const userId = req.params.user_id;
    const codeSnippetsCollection = await librariesCollection
      .doc(userId)
      .collection("code_snippets");

    let fields = {};
    if (req.query.lang) {
      fields["lang"] = req.query.lang;
    }
    if (req.query.code) {
      fields["code"] = req.query.code;
    }

    const result = await codeSnippetsCollection.add(fields);

    return res.status(200).json({ documentId: result.id });
  }
);

app.delete(
  "/users/:user_id/code_snippets/:code_snippet_id",
  verifyTokenMiddleware,
  async (req, res) => {
    const userId = req.params.user_id;
    const codeSnippetId = req.params.code_snippet_id;
    const codeSnippetsCollection = await librariesCollection
      .doc(userId)
      .collection("code_snippets");

    await codeSnippetsCollection.doc(codeSnippetId).delete();

    return res.status(200);
  }
);

app.get("/*", function (req, res) {
  res.sendFile(
    path.join(__dirname, "./client/public/index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

module.exports = app;
