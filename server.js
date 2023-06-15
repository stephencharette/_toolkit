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

let serviceAccount = require("./firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// const googleProvider = new GoogleAuthProvider();
// const signInWithGoogle = async () => {
//   try {
//     const res = await signInWithPopup(auth, googleProvider);
//     const user = res.user;
//     const q = query(collection(db, "users"), where("uid", "==", user.uid));
//     const docs = await getDocs(q);
//     if (docs.docs.length === 0) {
//       await addDoc(collection(db, "users"), {
//         uid: user.uid,
//         name: user.displayName,
//         authProvider: "google",
//         email: user.email,
//       });
//     }
//   } catch (err) {
//     console.error(err);
//     alert(err.message);
//   }
// };

const db = admin.firestore();

// Get a list of cities from your database
async function getCities() {
  let docSnapshot = await db.collection("test").doc("SF").get();
  return docSnapshot.data();
}

async function initialize() {
  test = await getCities();
}

initialize();

app.get("/express_backend", (req, res) => res.send(test.name));

module.exports = app;
