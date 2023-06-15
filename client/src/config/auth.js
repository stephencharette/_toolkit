import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDUHVkgRlWO7XuFOOaKkyL3C27jsRnaHKo",
  authDomain: "web-app-generator.firebaseapp.com",
  projectId: "web-app-generator",
  storageBucket: "web-app-generator.appspot.com",
  messagingSenderId: "455147459852",
  appId: "1:455147459852:web:173679bf1ef1a36f8d6529",
  measurementId: "G-JTJY25CEM9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
