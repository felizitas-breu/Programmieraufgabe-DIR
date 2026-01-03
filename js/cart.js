const cartKey = "warenkorb"; 

let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

function updateCartCount() {
  const countSpan = document.getElementById("cart-count");
  if (!countSpan) return; 
  countSpan.textContent = cart.length; // Anzahl der Produkte
}


document.addEventListener("DOMContentLoaded", () => {

  document.querySelectorAll(".buy-btn").forEach(button => {
    button.addEventListener("click", () => {
      const name = button.dataset.name;
      const price = parseFloat(button.dataset.price);

      cart.push({ name, price });
      localStorage.setItem(cartKey, JSON.stringify(cart));

      updateCartCount(); 
      alert(`${name} wurde in den Warenkorb gelegt!`);
    });
  });

  updateCartCount();
});

function renderCart() {
  const cartList = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  if (!cartList || !cartTotal) return; 

  cartList.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `${item.name} – ${item.price.toFixed(2)} €`;
    cartList.appendChild(li);
    total += item.price;
  });

  cartTotal.textContent = `Gesamt: ${total.toFixed(2)} €`;
}

renderCart();


const clearCartBtn = document.getElementById("clear-cart");
if (clearCartBtn) {
  clearCartBtn.addEventListener("click", () => {
    cart = []; 
    localStorage.removeItem(cartKey); 
    renderCart(); 
    updateCartCount(); 
    alert("Der Warenkorb wurde geleert!");
  });
}


const checkoutBtn = document.getElementById("checkout-btn");
if (checkoutBtn) {
  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Dein Warenkorb ist leer!");
      return;
    }

    window.location.href = "checkout.html";
  });
}
