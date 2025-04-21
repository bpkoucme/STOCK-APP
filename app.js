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

function loadProducts() {
    const productSection = document.getElementById("products");
    db.ref("products").on("value", snapshot => {
        productSection.innerHTML = "";
        snapshot.forEach(child => {
            const product = child.val();
            const div = document.createElement("div");
            div.className = "product-item";
            div.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.category}</p>
                <strong>${product.price} Fcfa</strong><br>
                <button onclick="openOrderForm('${child.key}')">Commander</button>
            `;
            productSection.appendChild(div);
        });
    });
}

let selectedProductId = null;

function openOrderForm(productId) {
    selectedProductId = productId;
    document.getElementById("orderForm").style.display = "block";
}

function submitOrder() {
    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const address = document.getElementById("customerAddress").value.trim();

    if (!name || !phone || !address || !selectedProductId) {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    const order = {
        name,
        phone,
        address,
        productId: selectedProductId,
        date: new Date().toLocaleString()
    };

    db.ref("orders").push(order, error => {
        if (error) {
            alert("Erreur lors de l'envoi !");
        } else {
            alert("Commande envoyée avec succès !");
            document.getElementById("orderForm").style.display = "none";
            document.getElementById("customerName").value = "";
            document.getElementById("customerPhone").value = "";
            document.getElementById("customerAddress").value = "";
        }
    });
}
