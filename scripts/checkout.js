import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/car.js';
// import '../data/backend-practice.js';

//Using async await method
async function loadPage() {

  try {

    // throw 'Manual error 1';
    
    await loadProductsFetch();

    await new Promise((resolve, reject) => {
      // throw "Manual error 2";
      loadCart(() => {
        // reject('Manual error 3');
        resolve();
      });
    });

  } catch (error) {
    console.log('Unexpected error occured in trycatch ---', error);
  }
  
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();

}

loadPage();

//Using fetch method
/*
Promise.all([
  loadProductsFetch()
  ,
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })

]).then((values) => {

  console.log(values);

  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
})
*/

// Using promises method
// Promises don't nest the code
// and keep it flat and easy to understand
/*
Promise.all([
  new Promise((resolve) => {
    loadProducts(() => {
      resolve('my value to resolve');
    });
  
  }),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })

]).then((values) => {

  console.log(values);

  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve('my value to resolve');
  });

}).then((value) => {

  console.log(value);

  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  });

}).then(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
*/

/*

// call backs causes too musch nesting
// and makes the code difficult to understand

loadProducts(() => {
  loadCart(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  });
});
*/

