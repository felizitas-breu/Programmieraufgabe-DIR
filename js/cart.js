const cartKey = "warenkorb"; 

let cart = JSON.parse(localStorage.getItem(cartKey)) || [];

document.querySelectorAll(".buy-btn").forEach(button => {
  button.addEventListener("click", () => {
    const name = button.dataset.name;
    const price = parseFloat(button.dataset.price);

    cart.push({ name, price });
    localStorage.setItem(cartKey, JSON.stringify(cart));
    alert(`${name} wurde in den Warenkorb gelegt!`);
  });
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

