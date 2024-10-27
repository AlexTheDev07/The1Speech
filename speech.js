import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCzv5mbY-F9hHXcWI8-wvyznL4cXQQNUBA",
    authDomain: "speech-cd68b.firebaseapp.com",
    databaseURL: "https://speech-cd68b-default-rtdb.europe-west1.firebasedatabase.app", // Add your database URL
    projectId: "speech-cd68b",
    storageBucket: "speech-cd68b.appspot.com",
    messagingSenderId: "189245008930",
    appId: "1:189245008930:web:08f95d15ab40f03672ae7b",
    measurementId: "G-16JL9LCMMF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Load the last transcription from Firebase on page load
window.onload = function() {
    const transcriptionRef = ref(db, 'transcription/');
    onValue(transcriptionRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            document.getElementById('outputBox').innerHTML = data.text; // Adjusted to display correct data
        }
    });
};
