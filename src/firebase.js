import firebase from 'firebase';
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

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth =  firebase.auth;
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth, provider};
  export default db;