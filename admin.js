// Configuration Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBOFN1uxZKtcVc_kstMe1mHoaFY9CNS3uA",
    authDomain: "monstockapp-73c82.firebaseapp.com",
    databaseURL: "https://monstockapp-73c82-default-rtdb.firebaseio.com",
    projectId: "monstockapp-73c82",
    storageBucket: "monstockapp-73c82.appspot.com",
    messagingSenderId: "903263639703",
    appId: "1:903263639703:web:ff08550aa21db9c25231d2"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Charger les commandes en temps réel
function loadOrders() {
    const orderList = document.getElementById("orderList");
    db.ref("orders").on("value", snapshot => {
        orderList.innerHTML = "";
        snapshot.forEach(child => {
            const order = child.val();
            const div = document.createElement("div");
            div.className = "order-item";
            div.innerHTML = `
                <strong>Client:</strong> ${order.name}<br>
                <strong>Téléphone:</strong> ${order.phone}<br>
                <strong>Adresse:</strong> ${order.address}<br>
                <strong>Produit ID:</strong> ${order.productId}<br>
                <strong>Date:</strong> ${order.date}
                <hr>
            `;
            orderList.appendChild(div);
        });
    });
}

// Lancer dès que la page est chargée
window.onload = loadOrders;
