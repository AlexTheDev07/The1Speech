import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/9.1.2/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCzv5mbY-F9hHXcWI8-wvyznL4cXQQNUBA",
    authDomain: "speech-cd68b.firebaseapp.com",
    databaseURL: "https://speech-cd68b-default-rtdb.europe-west1.firebasedatabase.app",
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
            document.getElementById('outputBox').innerHTML = data.text;
        }
    });
};

const transcriptText = document.getElementById("transcription");
const outputText = document.getElementById("outputBox");
const saveButton = document.getElementById("saveButton");

saveButton.addEventListener("click", function(event) {
    alert("TEST"); // Temporary to check if the click works
    const transcript = transcriptText.innerHTML; // Use innerHTML to get the transcription text
    if (transcript) {
        set(ref(db, 'transcription/'), { text: transcript })
            .then(() => {
                console.log("Transcription saved successfully.");
                outputText.innerHTML = transcript;
                transcriptText.innerHTML = ""; // Clear the input field after saving
            })
            .catch((error) => {
                console.error("Error saving transcription: ", error);
            });
    } else {
        alert("Please enter some text before saving.");
    }
});
