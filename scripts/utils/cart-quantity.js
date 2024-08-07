import { cart } from "../../data/cart-class.js";

 /************ Update cart quantity function start ************/
 export function updateCartQuantity() {
  const cartQuantity = cart.calculateCartQuantity();
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
}
/************ Update cart quantity function end ************/