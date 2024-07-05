export let cart;

loadFromStorage();

/*********** Load from storage function start ***********/
export function loadFromStorage() {
  cart = JSON.parse(localStorage.getItem('cart'));

  if (!cart) {
    cart = [
      {
        productId: '58b4fc92-e98c-42aa-8c55-b6b79996769a',
        quantity: 2,
        deliveryOptionId: '1'
      },
      {
        productId: '5968897c-4d27-4872-89f6-5bcb052746d7',
        quantity: 1,
        deliveryOptionId: '3'
      }
    ];
  }
}
/*********** Load from storage function end ***********/


/*********** Save to storage function start ***********/
function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}
/************ Save to storage function end ************/

/************ Add to cart function start ************/
export function addToCart(productId) {

  const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
  const quantity = Number(quantitySelector.value);

  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({ productId, quantity, deliveryOptionId: '1' });
  }

  saveToStorage();
}
/************ Add to cart function end ************/

/*********** Remove from cart function start ***********/
export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
    cart = newCart;
    saveToStorage();
  })
}
/************ Remove from cart function end ************/

/********** Calculate cart quantity function start **********/
export function calculateCartQuantity() {
  let cartQuantity = 0;

  cart.forEach((cartItem) => {
   cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
}
/*********** Calculate cart quantity function end ***********/

/*********** Update quantity function start ***********/
export function updateQuantity(productId, newQuantity) {
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      cartItem.quantity = newQuantity;
    }
  });
  saveToStorage();
}
/************ Update quantity function end ************/

/*********** Update delivery option function start ***********/
export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });
  matchingItem.deliveryOptionId = deliveryOptionId;
  saveToStorage();
}
/************ Update delivery option function end ************/