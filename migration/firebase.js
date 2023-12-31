// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {connectDatabaseEmulator, getDatabase} from "firebase/database";
import minimist from "minimist";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCYTqeEQ4PXinvsjgXMu3LRfdBbJOFz9lU",
    authDomain: "kvest2023-25bd1.firebaseapp.com",
    projectId: "kvest2023-25bd1",
    storageBucket: "kvest2023-25bd1.appspot.com",
    messagingSenderId: "493447587998",
    appId: "1:493447587998:web:64adcc7763c0bc87a8338f",
    measurementId: "G-3J55FHEB6B",
    databaseURL: "https://kvest2023-25bd1-default-rtdb.firebaseio.com/",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
if (!minimist(process.argv.slice(2)).prod ){
    console.log("migration runs on emulator")
    connectDatabaseEmulator(database, "127.0.0.1", 9000);
}
