// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCk03nm1I7QatHZLOV7UZpenJZeE4VtOcE",
    authDomain: "ecommerce-94bad.firebaseapp.com",
    projectId: "ecommerce-94bad",
    storageBucket: "ecommerce-94bad.appspot.com",
    messagingSenderId: "733927641920",
    appId: "1:733927641920:web:0987e7b37e6a8cb79920a5"
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;