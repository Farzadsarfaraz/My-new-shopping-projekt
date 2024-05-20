 const cartIcon = document.getElementById("cart__icon");
const cart = document.querySelector(".cart");
const closeCart = document.getElementById("clos-cart");

cartIcon.addEventListener('click', function(){
    cart.classList.add("active");
});
closeCart.addEventListener('click', function(){
    cart.classList.remove("active");
});


if (document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready);
}else{
    ready();
}

 function ready(){
    let removeCartButton = document.getElementsByClassName("cart-remove");
    console.log(removeCartButton);
    for ( var i = 0; i < removeCartButton.length; i++){
       var button = removeCartButton[i];
       button.addEventListener('click', removeCartItem);
    }
    let quantityInput = document.getElementsByClassName("cart-quantity");
    for ( var i = 0; i <quantityInput.length; i++){
        var input = quantityInput[i];
        input.addEventListener('change', quantityChanged);
    }
    var addCart = document.getElementsByClassName("add-cart");
    for ( var i = 0; i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener('click', addCartClicked);
    }
 }
 function removeCartItem(event){
    let ButtonClicked = event.target;
    ButtonClicked.parentElement.remove();
    updatetotal();
 }
 function updatetotal(){
    let total = 0;
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = document.getElementsByClassName("cart-box");
    for ( var i = 0; i < cartBoxes.length; i++){
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var price = parseFloat(priceElement.innerText.replace("$", ""));
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var quantity = quantityElement.value;
        total = total + quantity * price;

        total = Math.round(total * 100)/100;

        document.getElementsByClassName("total-price")[0].innerHTML = "$" + total;
    }
 }

 function quantityChanged(event){
    let input = event.target;
    if(isNaN(input.value) || input.value <= 0){
        input.value = 1;
        alert(" The number can not be a text or smaller than 1");
    }
    updatetotal();
 }
 function addCartClicked(event){
    var button = event.target;
    var shoptProduct = button.parentElement;
    var title = document.getElementsByClassName("product-title")[0].innerText;
    var price = document.getElementsByClassName("price")[0].innerText;
    var productImg = document.getElementsByClassName("product-img")[0].src;
    addProductTocart(title, price, productImg);
    updatetotal();
 }

 function addProductTocart(title, price, productImg){
    var cartShopBox = document.createElement('div')
    cartShopBox.classList.add('cart-box');
    var cartIteams = document.getElementsByClassName("cart-content")[0];
    var cartIteamsName = cartIteams.getElementsByClassName('cart-product-title');
    for ( var i = 0; i <cartIteamsName.length; i++){
        alert("You have already entered it");

    }
    return;
 }
 var cartBoxContent = `
     <img src="pic1.webp" alt="" class="cart-img" width="100px">
     <div class="detail-box">
         <div class="cart-product-title"> long Dress</div>
         <div class="cart-price">50.4$</div>
         <input type="number" value="1" class="cart-quantity">
 </div>
            <i class='bx bxs-trash-alt cart-remove'></i>
 `
 cartBoxContent.innerHTML = cartBoxContent;
 cartIteams.append(cartShopBox)
 cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
 cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('click', quantityChanged);
 
