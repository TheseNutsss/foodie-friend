import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider  } from "firebase/auth";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyDFh4okXuM68uzLoaw6qfq12qExIqjr8no",
    authDomain: "foodie-friend-241bf.firebaseapp.com",
    projectId: "foodie-friend-241bf",
    storageBucket: "foodie-friend-241bf.appspot.com",
    messagingSenderId: "125128308778",
    appId: "1:125128308778:web:d4a401aa8481618b496b53"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const db = getFirestore(app)
const provider = new GoogleAuthProvider();
const storage = getStorage(app);
export {auth, db, provider, storage}
