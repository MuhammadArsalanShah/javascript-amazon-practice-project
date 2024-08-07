import { orders } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import { cart } from "../data/cart-class.js";
import { formatCurrency } from "./utils/money.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { updateCartQuantity } from "./utils/cart-quantity.js";

renderOrderPage();

let orderPageHtml = '';

async function renderOrderPage() {

  updateCartQuantity();
  
  await loadProductsFetch();
  
  orders.forEach(async (order) => {

    const orderProducts = order.products;

    orderPageHtml += `
      <div class="order-container"> 
          <div class="order-header">
            <div class="order-header-left-section">
              <div class="order-date">
                <div class="order-header-label">Order Placed:</div>
                <div>${dayjs(order.orderTime).format('MMMM D')}</div>
              </div>
              <div class="order-total">
                <div class="order-header-label">Total:</div>
                <div>$${formatCurrency(order.totalCostCents)}</div>
              </div>
            </div>

            <div class="order-header-right-section">
              <div class="order-header-label">Order ID:</div>
              <div>${order.id}</div>
            </div>
          </div>

          <div class="order-details-grid">
    `;
    orderProducts.forEach((product) => {
  
      const productDetails = getProduct(product.productId);

      const currentTime = dayjs();
      const deliveryTime = dayjs(product.estimatedDeliveryTime);

      const deliveredMessage = currentTime < deliveryTime ? 'Arriving on' : 'Delivered on';

      orderPageHtml += `
        
          <div class="product-image-container">
            <img src="${productDetails.image}">
          </div>

          <div class="product-details">
            <div class="product-name">
              ${productDetails.name}
            </div>
            <div class="product-delivery-date">
              ${deliveredMessage}: ${dayjs(product.estimatedDeliveryTime).format("MMMM D")}
            </div>
            <div class="product-quantity">
              Quantity: ${product.quantity}
            </div>
            <button class="buy-again-button button-primary js-buy-again-button" data-product-id="${product.productId}">
              <img class="buy-again-icon" src="images/icons/buy-again.png">
              <span class="buy-again-message">Buy it again</span>
            </button>
          </div>

          <div class="product-actions">
            <a href="tracking.html?orderId=${order.id}&productId=${product.productId}">
              <button class="track-package-button button-secondary">
                Track package
              </button>
            </a>
          </div>
          
      `;

    });

    orderPageHtml += ` 
        </div>
      </div> 
      `;
  });

  document.querySelector('.js-order-grid').innerHTML += orderPageHtml;
  

  document.querySelectorAll('.js-buy-again-button').forEach((button) => {
    button.addEventListener('click', () => {
      const { productId } = button.dataset;
      cart.addToCart(productId);
      updateCartQuantity();
      window.location.href = 'checkout.html';
    });
  });
}



