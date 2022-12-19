import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCrDyJ4RRPXqkR8Eqx-a6v2tHAtayeauRc",
    authDomain: "whatsapp-clone-37a7f.firebaseapp.com",
    projectId: "whatsapp-clone-37a7f",
    storageBucket: "whatsapp-clone-37a7f.appspot.com",
    messagingSenderId: "420470649815",
    appId: "1:420470649815:web:da12bf33ba1486f9125192",
    measurementId: "G-ZWTN07HESY"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);
  const auth = getAuth();
  const provider =new GoogleAuthProvider()
  
  export {provider, auth}
  export default db;