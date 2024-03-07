import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCbywmUoGGio4tcsz4ZpjBTG84tILIGmz8",

  authDomain: "social-media-2f10b.firebaseapp.com",

  projectId: "social-media-2f10b",

  storageBucket: "social-media-2f10b.appspot.com",

  messagingSenderId: "182227147331",

  appId: "1:182227147331:web:c31066500b8e72f4a052f6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
