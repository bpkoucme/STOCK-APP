// Configuration Firebase (ta config ici)
const firebaseConfig = {
  apiKey: "AIzaSyBOFN1uxZKtcVc_kstMe1mHoaFY9CNS3uA",
  authDomain: "monstockapp-73c82.firebaseapp.com",
  projectId: "monstockapp-73c82",
  storageBucket: "monstockapp-73c82.appspot.com",
  messagingSenderId: "903263639703",
  appId: "1:903263639703:web:ff08550aa21db9c25231d2"
};

// Initialisation Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

let cart = [];

// Affiche les produits depuis Firebase
function displayProducts() {
  firebase.database().ref('produits').once('value', (snapshot) => {
    const list = document.getElementById("productList");
    list.innerHTML = "";
    const products = snapshot.val() || {};

    Object.keys(products).forEach((key) => {
      const p = products[key];
      const div = document.createElement("div");
      div.className = "product-card";
      div.innerHTML = `
        <img src="${p.image}" alt="Produit">
        <h3>${p.name}</h3>
        <p>${p.price} CFA</p>
        <button class="cart-button" onclick="addToCart('${key}')">Ajouter au panier</button>
      `;
      list.appendChild(div);
    });
  });
}

function addToCart(productKey) {
  firebase.database().ref('produits/' + productKey).once('value', (snapshot) => {
    cart.push(snapshot.val());
    document.getElementById("cartCount").innerText = cart.length;
    document.getElementById("cartButton").classList.remove("hidden");
  });
}

function addProduct() {
  const name = document.getElementById("productName").value;
  const price = document.getElementById("productPrice").value;
  const imageInput = document.getElementById("productImage");
  let image = "placeholder.jpg";

  if (name === "" || price === "") {
    alert("Veuillez remplir tous les champs.");
    return;
  }

  if (imageInput.files.length > 0) {
    const reader = new FileReader();
    reader.onload = function(e) {
      image = e.target.result;
      saveProduct(name, price, image);
    };
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    saveProduct(name, price, image);
  }
}

function saveProduct(name, price, image) {
  const newProduct = { name, price, image };
  firebase.database().ref('produits').push(newProduct).then(() => {
    alert("Produit ajouté !");
    document.getElementById("productName").value = "";
    document.getElementById("productPrice").value = "";
    document.getElementById("productImage").value = "";
    displayProducts();
    displayAdminProducts();
  });
}

function deleteProduct(productKey) {
  if (confirm("Voulez-vous vraiment supprimer ce produit ?")) {
    firebase.database().ref('produits/' + productKey).remove().then(() => {
      alert("Produit supprimé !");
      displayProducts();
      displayAdminProducts();
    });
  }
}

function displayAdminProducts() {
  firebase.database().ref('produits').once('value', (snapshot) => {
    const adminList = document.getElementById("adminProductList");
    adminList.innerHTML = "";
    const products = snapshot.val() || {};

    Object.keys(products).forEach((key) => {
      const p = products[key];
      const div = document.createElement("div");
      div.className = "admin-product";
      div.innerHTML = `
        <div style="display:flex; align-items: center;">
          <img src="${p.image}" alt="Produit">
          <div>
            <strong>${p.name}</strong><br>
            <small>${p.price} CFA</small>
          </div>
        </div>
        <button class="delete-button" onclick="deleteProduct('${key}')">Supprimer</button>
      `;
      adminList.appendChild(div);
    });
  });
}

// Activation section admin
document.addEventListener("keydown", function(event) {
  if (event.ctrlKey && event.shiftKey && event.key === "A") {
    const pass = prompt("Entrez le mot de passe Admin :");
    if (pass === "16181694y") {
      document.getElementById("adminPage").style.display = "block";
      displayAdminProducts();
    } else {
      alert("Mot de passe incorrect");
    }
  }
});

function showCart() {
  alert("Panier : " + cart.length + " produit(s).");
}

// Affichage initial
displayProducts();
