const cartIcon = document.getElementById("cart__icon");
const cart = document.querySelector(".cart");
const closeCart = document.getElementById("clos-cart");
let Navbar = document.querySelector(".header");

window.addEventListener('scroll', () => {
  if (document.body.scrollTop > 40 || document.documentElement.scrollTop > 40) {
    Navbar.classList.add("active1");
  } else {
    Navbar.classList.remove("active1");
  }
});

cartIcon.addEventListener("click", function () {
  cart.classList.add("active");
});
closeCart.addEventListener("click", function () {
  cart.classList.remove("active");
});

if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  loadCartFromLocalStorage();

  let removeCartButtons = document.getElementsByClassName("cart-remove");
  for (let button of removeCartButtons) {
    button.addEventListener("click", removeCartItem);
  }

  let quantityInputs = document.getElementsByClassName("cart-quantity");
  for (let i = 0; i < quantityInputs.length; i++) {
    let input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  let addCartButtons = document.getElementsByClassName("add-cart");
  for (let i = 0; i < addCartButtons.length; i++) {
    let button = addCartButtons[i];
    button.addEventListener("click", addCartClicked);
  }

  document.getElementsByClassName("btn-buy")[0]
    .addEventListener('click', buyButtonClicked);
}

function buyButtonClicked() {
  let totalElement = document.getElementsByClassName("total-price")[0];
  let total = parseFloat(totalElement.innerText.replace("$", ""));

  if (total === 0) {
    alert("Enter a product first");
    return;
  }
  alert("Your order is now placed");
  let cartContent = document.getElementsByClassName("cart-content")[0];
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  updateTotal();
  saveCartToLocalStorage();
  cart.classList.remove("active");
}

function removeCartItem(event) {
  let buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updateTotal();
  saveCartToLocalStorage();
}

function updateTotal() {
  let cartContent = document.getElementsByClassName("cart-content")[0];
  let cartBoxes = cartContent.getElementsByClassName("cart-box");
  let total = 0;
  for (let i = 0; i < cartBoxes.length; i++) {
    var cartBox = cartBoxes[i];
    var priceElement = cartBox.getElementsByClassName("cart-price")[0];
    var price = parseFloat(priceElement.innerText.replace("$", ""));
    var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
    var quantity = quantityElement.value;
    total += quantity * price;
  }
  total = Math.round(total * 100) / 100;
  document.getElementsByClassName("total-price")[0].innerText = "$" + total;
  saveCartToLocalStorage();
}

function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
    alert("The number cannot be a text or smaller than 1");
  }
  updateTotal();
}

function addCartClicked(event) {
  cart.classList.add("active");
  let button = event.target;
  let shopProduct = button.parentElement;
  let title = shopProduct.getElementsByClassName("product-title")[0].innerText;
  let price = shopProduct.getElementsByClassName("price")[0].innerText;
  let productImg = shopProduct.getElementsByClassName("product-img")[0].src;
  addProductToCart(title, price, productImg);
  updateTotal();
}

function addProductToCart(title, price, productImg) {
  let cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  let cartItems = document.getElementsByClassName("cart-content")[0];
  let cartItemNames = cartItems.getElementsByClassName("cart-product-title");
  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert("You have already added this item to the cart");
      return;
    }
  }
  let cartBoxContent = `
    <img src="${productImg}" alt="" class="cart-img" width="100px">
    <div class="detail-box">
      <div class="cart-product-title">${title}</div>
      <div class="cart-price">${price}</div>
      <input type="number" value="1" class="cart-quantity">
    </div>
    <i class='bx bxs-trash-alt cart-remove'></i>`;

  cartShopBox.innerHTML = cartBoxContent;
  cartItems.append(cartShopBox);
  cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener('click', removeCartItem);
  cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener('change', quantityChanged);
  saveCartToLocalStorage();
}

function saveCartToLocalStorage() {
  let cartContent = document.getElementsByClassName("cart-content")[0];
  let cartBoxes = cartContent.getElementsByClassName("cart-box");
  let cart = [];

  for (let i = 0; i < cartBoxes.length; i++) {
    let cartBox = cartBoxes[i];
    let title = cartBox.getElementsByClassName("cart-product-title")[0].innerText;
    let price = cartBox.getElementsByClassName("cart-price")[0].innerText;
    let quantity = cartBox.getElementsByClassName("cart-quantity")[0].value;
    let productImg = cartBox.getElementsByClassName("cart-img")[0].src;
    cart.push({
      title,
      price,
      quantity,
      productImg
    });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCartFromLocalStorage() {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  for (let i = 0; i < cart.length; i++) {
    let item = cart[i];
    addProductToCart(item.title, item.price, item.productImg);
    document.getElementsByClassName("cart-quantity")[i].value = item.quantity;
  }
  updateTotal();
}