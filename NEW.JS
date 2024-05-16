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
    var removeCartButton = document.getElementsByClassName("cart-remove");
    console.log(removeCartButton);
    for ( var i = 0; i < removeCartButton.length; i++){
       var button = removeCartButton[i];
       button.addEventListener('click', removeCartItem);
    }
 }
 function removeCartItem(event){
    var ButtonClicked = event.target;
    ButtonClicked.parentElement.remove();
 }