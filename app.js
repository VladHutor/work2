// Firebase Configuration and Initialization
const firebaseConfig = {
    apiKey: "AIzaSyDRAFrxJfGAotRyjWYHKHKuFJBn14GuurA",
    authDomain: "work-ada80.firebaseapp.com",
    databaseURL: "https://work-ada80-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "work-ada80",
    storageBucket: "work-ada80.appspot.com",
    messagingSenderId: "184968354210",
    appId: "1:184968354210:web:b148523869331e9f59bafb",
    measurementId: "G-KMH42M5YXD"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// HTML Elements
const applicationNumberInput = document.getElementById('application-number');
const clientNameInput = document.getElementById('client-name');
const clientInnInput = document.getElementById('client-inn');
const clientBgInput = document.getElementById('client-bg');
const commentsInput = document.getElementById('comments');

// Function to save data to Firebase
function saveApplicationData() {
    const applicationNumber = applicationNumberInput.value;
    const clientName = clientNameInput.value;
    const inn = clientInnInput.value;
    const bg = clientBgInput.value;
    const comments = commentsInput.value;

    const newApplicationRef = database.ref('applications').push();
    newApplicationRef.set({
        applicationNumber: applicationNumber,
        clientName: clientName,
        inn: inn,
        bg: bg,
        comments: comments
    }).then(() => {
        console.log('Data saved successfully');
    }).catch((error) => {
        console.error('Error saving data:', error);
    });
}

// Event listeners to trigger data save
applicationNumberInput.addEventListener('input', saveApplicationData);
clientNameInput.addEventListener('input', saveApplicationData);
clientInnInput.addEventListener('input', saveApplicationData);
clientBgInput.addEventListener('input', saveApplicationData);
commentsInput.addEventListener('input', saveApplicationData);
