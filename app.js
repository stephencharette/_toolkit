// import { initializeApp } from "firebase/app";
// import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

const express = require("express");
const fetch = require("node-fetch");
const path = require("path");
const admin = require("firebase-admin");
const app = express();

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

app.use(express.static(path.join(__dirname, "client/build")));

let bodyParser = require("body-parser");
app.use(bodyParser.json());

// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyDUHVkgRlWO7XuFOOaKkyL3C27jsRnaHKo",
  authDomain: "web-app-generator.firebaseapp.com",
  projectId: "web-app-generator",
  storageBucket: "web-app-generator.appspot.com",
  messagingSenderId: "455147459852",
  appId: "1:455147459852:web:173679bf1ef1a36f8d6529",
  measurementId: "G-JTJY25CEM9",
};

admin.initializeApp(firebaseConfig);
let db = admin.firestore();

// Get a list of cities from your database
async function getCities(db) {
  const citiesCol = collection(db, "cities");
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map((doc) => doc.data());
  return cityList;
}

module.exports = app;
