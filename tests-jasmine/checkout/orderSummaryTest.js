import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { cart, loadFromStorage } from "../../data/cart.js";

describe('Test suite: renderOrderSummary', () => {

  const productId1 = 'myId-001';
  const productId2 = 'myId-002';

  beforeEach(() => {
    spyOn(localStorage, 'setItem');

    document.querySelector('.js-test-container').innerHTML = `
      <div class="checkout-header" style="border: 3px dashed red; margin: 5px 0;"></div>
      <div class="js-order-summary" style="border: 3px solid orange; margin: 5px 0;"></div>
      <div class="js-payment-summary" style="border: 3px double purple; margin: 5px 0;"></div>
    `;

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

    renderOrderSummary();
  });

  afterEach(() => {
    document.querySelector('.js-test-container').innerHTML = '';
  });

  /***************************************************************/

  it('display the cart', () => {
   
    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(2);

    expect(
      document.querySelector(`.js-product-quantity-${productId1}`).innerText
    ).toContain('Quantity: 2');

    expect(
      document.querySelector(`.js-product-quantity-${productId2}`).innerText
    ).toContain('Quantity: 1');

    expect(
      document.querySelector(`.js-product-name-${productId2}`).innerText
    ).toContain('Umbrella');

    expect(
      document.querySelector(`.js-product-price-${productId1}`).innerHTML
    ).toContain('$1.20');

  });

  /***************************************************************/

  it('Removes the product', () => {

    document.querySelector(`.js-delete-link-${productId1}`).click();

    expect(
      document.querySelectorAll('.js-cart-item-container').length
    ).toEqual(1);

    expect(
      document.querySelector(`.js-cart-item-container-${productId1}`)
    ).toEqual(null);

    expect(
      document.querySelector(`.js-cart-item-container-${productId2}`)
    ).not.toEqual(null);

    expect(cart.length).toEqual(1);
    expect(cart[0].productId).toEqual(productId2);

  });

});