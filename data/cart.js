export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
  cart = [
    {
      productId: 'myId-001',
      quantity: 4,
      deliveryOptionId: '1'
    },
    {
      productId: 'myId-002',
      quantity: 2,
      deliveryOptionId: '2'
    }
  ];
}


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