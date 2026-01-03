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

    if (hasStudentProduct) {
      if (!studentProofInput.files || studentProofInput.files.length === 0) {
        alert("Bitte lade eine gültige Inskriptionsbestätigung als PDF hoch.");
        return;
      }

      const file = studentProofInput.files[0];
      if (file.type !== "application/pdf") {
        alert("Die Inskriptionsbestätigung muss ein PDF sein.");
        return;
      }
    }

    alert("Vielen Dank für Ihr Interesse! Der Kauf wurde nicht abgeschlossen, da diese Webseite nur zur Übung einer Lehrveranstaltung erstellt wurde.");

    localStorage.removeItem(cartKey);
    cart = [];

    window.location.href = "index.html";
  });
}


const studentProofWrapper = document.getElementById("student-proof-wrapper");
const studentProofInput = document.getElementById("student-proof");

const hasStudentProduct = cart.some(item =>
  item.name.toLowerCase().includes("student")
);

if (hasStudentProduct && studentProofWrapper) {
  studentProofWrapper.style.display = "block";
}
