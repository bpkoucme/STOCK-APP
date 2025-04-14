// === Initialisation Firebase ===
const firebaseConfig = {
  apiKey: "AIzaSyBOFN1uxZKtcVc_kstMe1mHoaFY9CNS3uA",
  authDomain: "monstockapp-73c82.firebaseapp.com",
  projectId: "monstockapp-73c82",
  storageBucket: "monstockapp-73c82.appspot.com",
  messagingSenderId: "903263639703",
  appId: "1:903263639703:web:ff08550aa21db9c25231d2"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// === Gestion du Login (code secret) ===
document.addEventListener("DOMContentLoaded", () => {
  const codeInput = document.getElementById("codeInput");
  const loginBtn = document.getElementById("loginBtn");

  if (loginBtn) {
    loginBtn.addEventListener("click", () => {
      const code = codeInput.value.trim();

      if (code === "16181694y") {
        document.getElementById("roleSection").style.display = "block";
        document.getElementById("loginSection").style.display = "none";
      } else {
        alert("Code incorrect !");
      }
    });
  }

  // Sélection du rôle
  const vendeurBtn = document.getElementById("vendeurBtn");
  const adminBtn = document.getElementById("adminBtn");

  if (vendeurBtn && adminBtn) {
    vendeurBtn.addEventListener("click", () => chargerInterface("vendeur"));
    adminBtn.addEventListener("click", () => chargerInterface("admin"));
  }
});

// === Chargement de l'interface selon le rôle ===
function chargerInterface(role) {
  document.getElementById("roleSection").style.display = "none";

  if (role === "vendeur") {
    document.getElementById("vendeurSection").style.display = "block";
  } else if (role === "admin") {
    document.getElementById("adminSection").style.display = "block";
    chargerHistorique();
  }
}

// === Enregistrement d'une entrée ou sortie ===
function enregistrerMouvement(type) {
  const produit = prompt("Nom du produit:");
  const quantite = parseInt(prompt("Quantité:"), 10);
  const timestamp = new Date();

  if (!produit || isNaN(quantite)) return alert("Données invalides");

  db.collection("mouvements").add({
    type,
    produit,
    quantite,
    timestamp: firebase.firestore.Timestamp.fromDate(timestamp)
  }).then(() => {
    alert(`${type} enregistrée avec succès.`);
  }).catch((error) => {
    console.error("Erreur d'enregistrement:", error);
  });
}

// === Chargement des mouvements en admin ===
function chargerHistorique() {
  const historique = document.getElementById("historique");
  historique.innerHTML = "Chargement...";

  db.collection("mouvements").orderBy("timestamp", "desc").get()
    .then(snapshot => {
      historique.innerHTML = "";
      snapshot.forEach(doc => {
        const data = doc.data();
        const ligne = document.createElement("div");
        ligne.textContent = `${data.timestamp.toDate().toLocaleString()} - ${data.type} - ${data.produit} : ${data.quantite}`;
        historique.appendChild(ligne);
      });
    }).catch(error => {
      historique.innerHTML = "Erreur lors du chargement.";
      console.error(error);
    });
}

// === Dépenses côté Admin ===
function ajouterDepense() {
  const libelle = prompt("Libellé de la dépense:");
  const montant = parseFloat(prompt("Montant:"));

  if (!libelle || isNaN(montant)) return alert("Données invalides");

  db.collection("depenses").add({
    libelle,
    montant,
    timestamp: firebase.firestore.Timestamp.fromDate(new Date())
  }).then(() => {
    alert("Dépense enregistrée.");
  }).catch((error) => {
    console.error("Erreur:", error);
  });
}
