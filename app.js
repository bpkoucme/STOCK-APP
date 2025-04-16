// Configuration Firebase (ta config)
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

const btnEntree = document.getElementById("btnEntree");
const btnSortie = document.getElementById("btnSortie");
const btnScan = document.getElementById("btnScan");
const btnRapport = document.getElementById("btnRapport");
const formSection = document.getElementById("formSection");
const rapportSection = document.getElementById("rapportSection");
const formTitle = document.getElementById("formTitle");
const productCode = document.getElementById("productCode");
const productQuantity = document.getElementById("productQuantity");
const btnValider = document.getElementById("btnValider");
const rapportList = document.getElementById("rapportList");

let currentAction = "";

btnEntree.onclick = () => {
    formSection.style.display = "block";
    rapportSection.style.display = "none";
    formTitle.innerText = "Entrée de Stock";
    currentAction = "entree";
};

btnSortie.onclick = () => {
    formSection.style.display = "block";
    rapportSection.style.display = "none";
    formTitle.innerText = "Sortie de Stock";
    currentAction = "sortie";
};

btnScan.onclick = () => {
    formSection.style.display = "block";
    rapportSection.style.display = "none";
    formTitle.innerText = "Scanner Code";
    currentAction = "scan";
};

btnRapport.onclick = () => {
    formSection.style.display = "none";
    rapportSection.style.display = "block";
    afficherRapport();
};

btnValider.onclick = () => {
    const code = productCode.value.trim();
    const quantite = parseInt(productQuantity.value.trim());

    if (!code || isNaN(quantite)) {
        alert("Remplis bien tous les champs!");
        return;
    }

    const timestamp = Date.now();
    const data = {
        code,
        quantite,
        action: currentAction,
        date: new Date().toLocaleString()
    };

    db.ref("stocks/" + timestamp).set(data).then(() => {
        alert("Enregistré avec succès!");
        productCode.value = "";
        productQuantity.value = "";
        formSection.style.display = "none";
    }).catch(error => {
        alert("Erreur : " + error.message);
    });
};

function afficherRapport() {
    rapportList.innerHTML = "Chargement...";
    db.ref("stocks").once("value").then(snapshot => {
        rapportList.innerHTML = "";
        snapshot.forEach(child => {
            const item = child.val();
            const li = document.createElement("li");
            li.textContent = `[${item.date}] ${item.action} - ${item.code} : ${item.quantite}`;
            rapportList.appendChild(li);
        });
    });
}
