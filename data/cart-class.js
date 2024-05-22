class Cart {

  cartItems;

  #localStorageKey; //private property (can't access outside class)

  constructor(localStorageKey) {

    this.#localStorageKey = localStorageKey;
    this.#loadFromStorage(); 

  }

  /*********** Load from storage function start ***********/
  #loadFromStorage() { //private method (can't access outside class)
    this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));

    if (!this.cartItems) {
      this.cartItems = [
        {
          productId: 'myId-001',
          quantity: 2,
          deliveryOptionId: '1'
        },
        {
          productId: 'myId-002',
          quantity: 1,
          deliveryOptionId: '3'
        }
      ];
    }
  }
  /*********** Load from storage function end ***********/

  /*********** Save to storage function start ***********/
  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }
  /************ Save to storage function end ************/

  /************ Add to cart function start ************/
  addToCart(productId) {
  
    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
    const quantity = Number(quantitySelector.value);

    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      this.cartItems.push({ productId, quantity, deliveryOptionId: '1' });
    }

    this.saveToStorage();
  }
  /************ Add to cart function end ************/

  /*********** Remove from cart function start ***********/
  removeFromCart(productId) {
    const newCart = [];
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
      this.cartItems = newCart;
      this.saveToStorage();
    })
  }
  /************ Remove from cart function end ************/

  /********** Calculate cart quantity function start **********/
  calculateCartQuantity() {
    let cartQuantity = 0;

    this.cartItems.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
    });

    return cartQuantity;
  }
  /*********** Calculate cart quantity function end ***********/

  /*********** Update quantity function start ***********/
  updateQuantity(productId, newQuantity) {
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        cartItem.quantity = newQuantity;
      }
    });
    this.saveToStorage();
  }
  /************ Update quantity function end ************/

  /*********** Update delivery option function start ***********/
  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    this.cartItems.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
    matchingItem.deliveryOptionId = deliveryOptionId;
    this.saveToStorage();
  }
  /************ Update delivery option function end ************/

} // Cart class

const cart = new Cart('cart-oop');
const businessCart = new Cart('cart-business');

console.log(cart);
console.log(businessCart);
console.log(cart instanceof Cart);