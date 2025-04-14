// === Configuration Firebase ===
const firebaseConfig = {
    apiKey: "AIzaSyBOFN1uxZKtcVc_kstMe1mHoaFY9CNS3uA",
    authDomain: "monstockapp-73c82.firebaseapp.com",
    projectId: "monstockapp-73c82",
    storageBucket: "monstockapp-73c82.appspot.com",
    messagingSenderId: "903263639703",
    appId: "1:903263639703:web:ff08550aa21db9c25231d2"
};

// Initialiser Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// === Contrôle de connexion par code secret ===
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const code = document.getElementById('accessCode').value;
    if (code === '16181694y') {
        document.getElementById('loginSection').style.display = 'none';
        document.getElementById('roleSection').style.display = 'block';
    } else {
        alert("Code incorrect, veuillez réessayer !");
    }
});

// === Choix du rôle : Admin ou Vendeur ===
document.getElementById('adminBtn').addEventListener('click', function() {
    document.getElementById('roleSection').style.display = 'none';
    document.getElementById('adminPage').style.display = 'block';
    loadAdminData();
});

document.getElementById('vendeurBtn').addEventListener('click', function() {
    document.getElementById('roleSection').style.display = 'none';
    document.getElementById('vendeurPage').style.display = 'block';
});

// === Fonctions Vendeur ===

// Ajouter une entrée
function ajouterEntree(nomProduit, quantite) {
    db.collection("stocks").add({
        type: "entrée",
        produit: nomProduit,
        quantite: quantite,
        date: new Date()
    }).then(() => {
        alert("Entrée enregistrée !");
    }).catch((error) => {
        console.error("Erreur :", error);
    });
}

// Ajouter une sortie
function ajouterSortie(nomProduit, quantite) {
    db.collection("stocks").add({
        type: "sortie",
        produit: nomProduit,
        quantite: quantite,
        date: new Date()
    }).then(() => {
        alert("Sortie enregistrée !");
    }).catch((error) => {
        console.error("Erreur :", error);
    });
}

// Scanner un produit (simulation simplifiée)
function scannerProduit() {
    const codeBarre = prompt("Scannez ou entrez le code-barres :");
    if (codeBarre) {
        db.collection("scans").add({
            code: codeBarre,
            date: new Date()
        }).then(() => {
            alert("Produit scanné et enregistré !");
        }).catch((error) => {
            console.error("Erreur :", error);
        });
    }
}

// === Fonctions Administrateur ===

// Charger les données des ventes et entrées/sorties
function loadAdminData() {
    db.collection("stocks").orderBy("date", "desc").onSnapshot((querySnapshot) => {
        const table = document.getElementById('adminData');
        table.innerHTML = "<tr><th>Type</th><th>Produit</th><th>Quantité</th><th>Date</th></tr>";
        querySnapshot.forEach((doc) => {
            const data = doc.data();
            table.innerHTML += `
                <tr>
                    <td>${data.type}</td>
                    <td>${data.produit}</td>
                    <td>${data.quantite}</td>
                    <td>${data.date.toDate().toLocaleString()}</td>
                </tr>`;
        });
    });
}

// Enregistrer une dépense
function ajouterDepense(description, montant) {
    db.collection("depenses").add({
        description: description,
        montant: montant,
        date: new Date()
    }).then(() => {
        alert("Dépense enregistrée !");
    }).catch((error) => {
        console.error("Erreur :", error);
    });
}
