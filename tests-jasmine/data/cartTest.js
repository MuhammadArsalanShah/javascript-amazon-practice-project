import { addToCart, cart, loadFromStorage, removeFromCart } from "../../data/cart.js";

beforeEach(() => {

  spyOn(localStorage, 'setItem');

});

const productId1 = 'myId-001';
const productId2 = 'myId-002';

describe("Test Suite: addToCart", () => {

  it('add an existing product to the cart', () => {

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });

    loadFromStorage();

    addToCart(productId1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].quantity).toEqual(2);
  
    expect(localStorage.setItem).toHaveBeenCalledWith(
        'cart', JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      }])
    );
    
  });

  /***************************************************************/

  it('add a new product to the cart', () => {

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]);
    });

    loadFromStorage();

    addToCart(productId1);
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(cart[0].productId).toEqual(productId1);
    expect(cart[0].quantity).toEqual(1);

    expect(localStorage.setItem).toHaveBeenCalledWith(
        'cart', JSON.stringify([{
        productId: productId1,
        quantity: 1,
        deliveryOptionId: '1'
      }])
    );

  });

});


/***************************************************************/
/***************************************************************/
/***************************************************************/

describe('Test Suite: removeFromCart', () => {
  it('remove product that exist in cart', () => {

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
        {
          productId: productId1,
          quantity: 2,
          deliveryOptionId: '1'
        },
        {
          productId: productId2,
          quantity: 1,
          deliveryOptionId: '3'
        }
      ]);
    });

    loadFromStorage();

    removeFromCart(productId1);
    expect(cart).toEqual([
      {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '3'
      }
    ]);
    expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      'cart', JSON.stringify([{
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '3'
      }])
    );

  });

  /***************************************************************/

  it('remove product that does not exist in cart', () => {

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([
        {
          productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
          quantity: 1,
          deliveryOptionId: '1'
        }
      ]);
    });

    loadFromStorage();

    removeFromCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart).toEqual([]);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);

  });

});