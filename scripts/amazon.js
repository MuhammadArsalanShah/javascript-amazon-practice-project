import { cart } from '../data/cart-class.js';
import { products, loadProducts } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import { updateCartQuantity } from './utils/cart-quantity.js';

const url = new URL(window.location.href);
const search = url.searchParams.get('search');
const searchBar = document.querySelector('.js-search-bar');

if (search) {
  searchBar.value = search;
  searchBar.focus();
}

loadProducts(renderProductsGrid); 

function renderProductsGrid() {
  
  /** Updating Cart icon header **/
  updateCartQuantity();

  let productsHtml = '';

  let filteredProducts = products;

  if (search) {
    filteredProducts = products.filter((product) => {

      let matchingKeyword = false;

      product.keywords.forEach((keyword) => {
        if (keyword.toLowerCase().includes(search.toLowerCase())) {
          matchingKeyword = true;
        }
      });

      return matchingKeyword || product.name.toLowerCase().includes(search.toLowerCase());

    });

  }

  if (filteredProducts.length !== 0) {
    filteredProducts.forEach((product) => {
      productsHtml += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>
          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>
          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>
          <div class="product-price">
            ${product.getPrice()}
          </div>
          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          ${product.extraInfoHTML()}
          <div class="product-spacer"></div>
          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>
          <button class="add-to-cart-button button-primary js-add-to-cart"
          data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
      `;
    });
  } else {
    let errorHtml = `<div class="no-item-found"><strong>Sorry!</strong> we couldn\'t find any matches for <strong>\"${search}\"</strong>. Check Spelling or Try Searching for more Generic Keywords</div>`
    document.querySelector('.js-main').innerHTML += errorHtml;
  }
    

  document.querySelector('.js-products-grid').innerHTML += productsHtml;

  /************ Show added message function start ************/
  const addedMessageTimeouts = {};

  function showAddedMessage(productId) {
    const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
    addedMessage.classList.add('added-to-cart-visible');

    const previousTimeoutId = addedMessageTimeouts[productId];
    
    if (previousTimeoutId) {
      clearTimeout(previousTimeoutId);
    }

    const timeoutId = setTimeout(() => {
      addedMessage.classList.remove('added-to-cart-visible');
    }, 2000);

    // Save the timeoutId for this product
    // so we can stop it later if we need to.
    addedMessageTimeouts[productId] = timeoutId;
  }
  /************ Show added message function end ************/

  document.querySelectorAll('.js-add-to-cart').forEach((button) => {
    button.addEventListener('click', () => {
    const { productId } = button.dataset;

    cart.addToCart(productId);
    updateCartQuantity();
    showAddedMessage(productId);
    
    });
  });

  /************ Search products function start ************/
  function searchProducts() {
    const searchedWord = document.querySelector('.js-search-bar').value;
    
    if (searchedWord) {
      window.location.href = `amazon.html?search=${searchedWord}`;
    }

  }

  document.querySelector('.js-search-button').addEventListener('click', searchProducts);

  document.querySelector('.js-search-bar').addEventListener('keydown', (event) => {
    if (event.key === 'Enter') { searchProducts(); }
  });
}