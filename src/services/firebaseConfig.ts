import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCHijv0ClOgwrLUDnX1CFvw3CprrJgCVXg",
    authDomain: "tickets-bb87c.firebaseapp.com",
    projectId: "tickets-bb87c",
    storageBucket: "tickets-bb87c.appspot.com",
    messagingSenderId: "210870568099",
    appId: "1:210870568099:web:90dce2e1cfbc95619aab16",
    measurementId: "G-MFD21VDDPP"
  };

  const app = initializeApp(firebaseConfig)

  const db = getFirestore(app)

  const auth = getAuth(app)

  const storage = getStorage(app)


  export {db,auth,storage}


  