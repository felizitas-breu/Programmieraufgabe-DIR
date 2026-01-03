const cartKey = "warenkorb";
let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

const itemsList = document.getElementById("checkout-items");
const totalEl = document.getElementById("checkout-total");

function renderCheckout() {
  if (!itemsList || !totalEl) return;

  itemsList.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} – ${item.price.toFixed(2)} €`;
    itemsList.appendChild(li);
    total += item.price;
  });

  totalEl.textContent = `Gesamt: ${total.toFixed(2)} €`;
}

renderCheckout();

const form = document.getElementById("checkout-form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert("Der Warenkorb ist leer!");
      return;
    }

    alert("Vielen Dank für Ihr Interesse! Der Kauf wurde nicht abgeschlossen, da diese Webseite nur zur Übung einer Lehrveranstaltung erstellt wurde.");

    localStorage.removeItem(cartKey);
    cart = [];

    window.location.href = "index.html";
  });
}
