import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCeoo6qt8hLP23X648LVOnqP46WzDscqvk",
  authDomain: "stuxia-5b535.firebaseapp.com",
  projectId: "stuxia-5b535",
  storageBucket: "stuxia-5b535.firebasestorage.app",
  messagingSenderId: "801101038904",
  appId: "1:801101038904:web:70d01ab63f631b74acadcd",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export { signInWithPopup, signOut };