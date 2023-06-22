const functions = require("firebase-functions");

const express = require("express"); //Line 1
const app = express();
var cors = require("cors");
const fetch = require("node-fetch");
const path = require("path");
const admin = require("firebase-admin");

const port = process.env.PORT || 3001;

app.listen(port, () =>
  console.log(
    `Listening on port ${port} ${process.env.REACT_APP_NOT_SECRET_CODE}`
  )
);

app.use(cors());
app.use(express.static(path.join(__dirname, "client/build")));

let bodyParser = require("body-parser");
app.use(bodyParser.json());

FIREBASE_PATH = "./etc/secrets/firebase.json";
let serviceAccount = require(FIREBASE_PATH);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const librariesCollection = db.collection("libraries");

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

app.post("/api/login", verifyTokenMiddleware, (req, res) => {
  return res.status(200).json({ userId: req.userId });
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

async function initialize() {}

initialize();

app.get("/");

app.patch(
  "/users/:user_id/code_snippets/:code_snippet_id",
  verifyTokenMiddleware,
  async (req, res) => {
    const userId = req.params.user_id;
    const codeSnippetId = req.params.code_snippet_id;
    const codeSnippetsCollection = await librariesCollection
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

    await codeSnippetsCollection.update(updateFields);

    return res.status(200);
  }
);

module.exports = app;

// M9I0otW7sqgzBQxfB46rBZOzYSd2
