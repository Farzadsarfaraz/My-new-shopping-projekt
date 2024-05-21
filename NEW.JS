const cartIcon = document.getElementById("cart__icon");
const cart = document.querySelector(".cart");
const closeCart = document.getElementById("clos-cart");
let Navbar = document.querySelector(".header");


window.addEventListener('scroll', () => {
  if(document.body.scrollTop > 40 || document.documentElement.scrollTop > 40){
    Navbar.classList.add("active1");
  }else{
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
  let removeCartButtons = document.getElementsByClassName("cart-remove");
  for (let button of removeCartButtons) {
    button.addEventListener("click", removeCartItem);
  };
  
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
  alert("Your order is now placed");
  let cartContent = document.getElementsByClassName("cart-content")[0];
  while (cartContent.hasChildNodes()) {
    cartContent.removeChild(cartContent.firstChild);
  }
  updatetotal();
  cart.classList.remove("active");
}

function removeCartItem(event) {
  let buttonClicked = event.target;
  buttonClicked.parentElement.remove();
  updatetotal();
}

function updatetotal() {
  var cartContent = document.getElementsByClassName("cart-content")[0];
  var cartBoxes = cartContent.getElementsByClassName("cart-box");
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
}

function quantityChanged(event) {
  let input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
    alert("The number cannot be a text or smaller than 1");
  }
  updatetotal();
}

function addCartClicked(event) {
  cart.classList.add("active");
  var button = event.target;
  var shopProduct = button.parentElement;
  var title = shopProduct.getElementsByClassName("product-title")[0].innerText;
  var price = shopProduct.getElementsByClassName("price")[0].innerText;
  var productImg = shopProduct.getElementsByClassName("product-img")[0].src;
  addProductToCart(title, price, productImg);
  updatetotal();
}

function addProductToCart(title, price, productImg) {
  var cartShopBox = document.createElement("div");
  cartShopBox.classList.add("cart-box");
  var cartItems = document.getElementsByClassName("cart-content")[0];
  var cartItemNames = cartItems.getElementsByClassName("cart-product-title");
  for (let i = 0; i < cartItemNames.length; i++) {
    if (cartItemNames[i].innerText == title) {
      alert("You have already added this item to the cart");
      return;
    }
  }
  
  var cartBoxContent = `
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
}