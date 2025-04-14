// Connexion à Firebase avec tes vraies informations
const firebaseConfig = {
    apiKey: "AIzaSyD***************",  // ta vraie clé API
    authDomain: "bonprixkoucme.firebaseapp.com",
    databaseURL: "https://bonprixkoucme.firebaseio.com",
    projectId: "bonprixkoucme",
    storageBucket: "bonprixkoucme.appspot.com",
    messagingSenderId: "125*******",  // ton sender id
    appId: "1:125*********:web:******"  // ton app id complet
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Fonction : Ajouter une entrée de marchandise
function ajouterEntree(nom, quantite) {
    const ref = db.ref("stock/entrees").push();
    ref.set({
        produit: nom,
        quantite: quantite,
        date: new Date().toLocaleString()
    });
    alert("Entrée ajoutée !");
}

// Fonction : Ajouter une sortie de marchandise
function ajouterSortie(nom, quantite) {
    const ref = db.ref("stock/sorties").push();
    ref.set({
        produit: nom,
        quantite: quantite,
        date: new Date().toLocaleString()
    });
    alert("Sortie enregistrée !");
}

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("btnEntree").addEventListener("click", () => {
        const produit = prompt("Nom du produit:");
        const quantite = parseInt(prompt("Quantité:"));
        if (produit && quantite > 0) ajouterEntree(produit, quantite);
    });

    document.getElementById("btnSortie").addEventListener("click", () => {
        const produit = prompt("Nom du produit:");
        const quantite = parseInt(prompt("Quantité:"));
        if (produit && quantite > 0) ajouterSortie(produit, quantite);
    });
});
