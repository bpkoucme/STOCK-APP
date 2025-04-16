// Connexion à ta base Firebase
const firebaseConfig = {
  apiKey: "AIzaSyB0FN1uxZKtcVc_kstMe1mHoaFY9CNS3uA",
  authDomain: "monstockapp-73c82.firebaseapp.com",
  projectId: "monstockapp-73c82",
  storageBucket: "monstockapp-73c82.appspot.com",
  messagingSenderId: "903263639703",
  appId: "1:903263639703:web:ff08550aa21db9c25231d2"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Gestion des boutons
function ouvrirSection(nom) {
    let contenu = document.getElementById("contenu");
    switch(nom) {
        case 'entree':
            contenu.innerHTML = "<h2>Entrée de Stock</h2><p>Scanner ou saisir un produit pour l’ajouter.</p>";
            break;
        case 'sortie':
            contenu.innerHTML = "<h2>Sortie / Vente</h2><p>Scanner le produit vendu pour l’enregistrer.</p>";
            break;
        case 'transfert':
            contenu.innerHTML = "<h2>Transfert</h2><p>Gérez vos transferts entre dépôts.</p>";
            break;
        case 'rapport':
            contenu.innerHTML = "<h2>Rapport</h2><p>Consultez vos rapports d’activité.</p>";
            break;
        case 'depenses':
            contenu.innerHTML = "<h2>Dépenses</h2><p>Enregistrez les dépenses de l’entreprise.</p>";
            break;
    }
}
