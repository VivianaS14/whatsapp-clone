import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDoc, getDocs, addDoc } from 'firebase/firestore/lite';
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDCfrVTe33a03sA1Pelp-cwNO9EbhIXdLk",
    authDomain: "whatsapp-clone-e9a6a.firebaseapp.com",
    projectId: "whatsapp-clone-e9a6a",
    storageBucket: "whatsapp-clone-e9a6a.appspot.com",
    messagingSenderId: "783755218034",
    appId: "1:783755218034:web:8eba3623c281b4236986eb",
    measurementId: "G-Z8QD9NBMTV"
};

// Initialize the app with firebase passed the firebaseConfig object
const firebaseapp = initializeApp(firebaseConfig);
// access to firestore
const db = getFirestore(firebaseapp);
// authentication handle
const auth = getAuth(firebaseapp);
// google authentication
const provider = new GoogleAuthProvider();

// export stuff we need
export { auth, provider, getDoc, getDocs, collection, addDoc };
export default db;