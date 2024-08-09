import { orders } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { updateCartQuantity } from "./utils/cart-quantity.js";

const url = new URL(window.location.href);
const orderId = url.searchParams.get('orderId');
const productId = url.searchParams.get('productId')

let trackingPageHtml = '';

renderTrackingPage();

async function renderTrackingPage() {

  updateCartQuantity();

  await loadProductsFetch();

  orders.forEach((order) => {
    if (order.id === orderId) {
  
      order.products.forEach((product) => {
  
        if (product.productId === productId) {

          const productDetails = getProduct(product.productId);

          const currentTime = dayjs();
          const orderTime = dayjs(order.orderTime);
          const deliveryTime = dayjs(product.estimatedDeliveryTime);

          const deliveredMessage = currentTime < deliveryTime ? 'Arriving on' : 'Delivered on';
          const deliveryTimePercent = Math.round(((currentTime - orderTime) / (deliveryTime - orderTime)) * 100);

          console.log(deliveryTimePercent);
  
          trackingPageHtml = `
  
              <div class="delivery-date">
                ${deliveredMessage} ${dayjs(product.estimatedDeliveryTime).format('dddd, MMMM D')}
              </div>
  
              <div class="product-info">
                ${productDetails.name} 
              </div>
  
              <div class="product-info">
                Quantity: ${product.quantity}
              </div>
  
              <img class="product-image" src="${productDetails.image}">
  
              <div class="progress-labels-container">
                <div class="progress-label ${(deliveryTimePercent >= 0 && deliveryTimePercent <= 49) ? 'current-status' : ''}">
                  Preparing
                </div>
                <div class="progress-label ${(deliveryTimePercent >= 50 && deliveryTimePercent <= 99) ? 'current-status' : ''}">
                  Shipped
                </div>
                <div class="progress-label ${(deliveryTimePercent >= 100) ? 'current-status' : ''}">
                  Delivered
                </div>
              </div>
  
              <div class="progress-bar-container">
                <div class="progress-bar" style="width: ${deliveryTimePercent}%"></div>
              </div>
          `;
          
        }
      });
    }
  });

  document.querySelector('.js-order-tracking').innerHTML += trackingPageHtml;
}








