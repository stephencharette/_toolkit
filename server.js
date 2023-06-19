const functions = require("firebase-functions");

const express = require("express"); //Line 1
const app = express();
const fetch = require("node-fetch");
const path = require("path");
const admin = require("firebase-admin");

const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(express.static(path.join(__dirname, "client/build")));

let bodyParser = require("body-parser");
app.use(bodyParser.json());

let test;

let serviceAccount = require("/etc/secrets/firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// const verifyTokenMiddleware = async (req, res, next) => {
//   console.log(req.headers.authorization);
//   const token = req.headers.authorization;
//   console.log("asdfsdaf");

//   if (!token || !token.startsWith("Bearer ")) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }

//   const idToken = token.split("Bearer ")[1];

//   try {
//     // Verify the ID token and extract the user ID
//     const decodedToken = await firebase.auth().verifyIdToken(idToken);
//     req.userId = decodedToken.uid;

//     next(); // Proceed to the next middleware or route handler
//   } catch (error) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }
// };

// app.post("/api/login", verifyTokenMiddleware, (req, res) => {
//   console.log("sadfdfsadsf");
// });

const db = admin.firestore();

// Get a list of cities from your database
async function getCodeSnippets(userId) {
  let docSnapshot = await db.collection("code-snippets").doc("SF").get();
  return docSnapshot.data();
}

async function initialize() {
  // return await getCodeSnippets();
}

initialize();

app.get("/express_backend", (req, res) => res.send(test.name));
app.get("/");

module.exports = app;
