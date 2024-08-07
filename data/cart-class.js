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

  /*********** Save to storage function start ***********/
  saveToStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItems));
  }

  /************ Add to cart function start ************/
  addToCart(productId) {
  
    const quantitySelector = document.querySelector(`.js-quantity-selector-${productId}`);
    
    let quantity;
    
    if (quantitySelector) {
      quantity =  Number(quantitySelector.value)
    } else {
      quantity = 1;
    }

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

  /*********** Reset cart function start ***********/
  resetCart() {
    this.cartItems = [];
    this.saveToStorage();
  }

  /********** Calculate cart quantity function start **********/
  calculateCartQuantity() {
    let cartQuantity = 0;

    this.cartItems.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
    });

    return cartQuantity;
  }

  /*********** Update quantity function start ***********/
  updateQuantity(productId, newQuantity) {
    this.cartItems.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        cartItem.quantity = newQuantity;
      }
    });
    this.saveToStorage();
  }

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

} // Cart class

export const cart = new Cart('cart');
