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
 
