// Configuration Firebase (même config que app.js)
const firebaseConfig = {
    apiKey: "AIzaSyD3-7...",  // remplace ici avec ta clé
    authDomain: "ton-projet.firebaseapp.com",
    databaseURL: "https://ton-projet.firebaseio.com",
    projectId: "ton-projet",
    storageBucket: "ton-projet.appspot.com",
    messagingSenderId: "000000000",
    appId: "1:000000000:web:abcdef"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const adminRapportList = document.getElementById("adminRapportList");

function chargerMouvements() {
    adminRapportList.innerHTML = "Chargement...";
    db.ref("stocks").on("value", snapshot => {
        adminRapportList.innerHTML = "";
        snapshot.forEach(child => {
            const data = child.val();
            const li = document.createElement("li");
            li.textContent = `[${data.date}] ${data.action} - ${data.code} : ${data.quantite}`;
            adminRapportList.appendChild(li);
        });
    });
}

chargerMouvements();
