import { cart, removeFromCart } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from '../data/deliveryoptions.js';


let cartSummaryHTML = '';

cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  let matchingProduct;
  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  cartSummaryHTML +=
    `
    <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.qauntity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary
                  js-delete-link"
                  data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>
              
              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
               <div class="delivery-info "> 
               
               </div>
              </div>
            </div>
          </div>
    `
});

let DeliveryHTML = '';
let count = 0;
  deliveryOptions.forEach((option) => {
    let matchingItem;
    cart.forEach((cartItem) => {
      if (cartItem.productId === option.id) {
        count++;
        matchingItem = cartItem;
        deliveryOptionsHTML(matchingItem, option);

      }
    });
  });

  console.log(count);

  function deliveryOptionsHTML(matchingItem, option) {
  
    const today = dayjs();
    const deliveryDate = today.add(option.deliveryDays, 'day').format('dddd, MMMM D');

    let deliveryString = '';
    let chargeForThreeDays = 4.99;
    let chargeForOneDay = 9.99;
    if (option.deliveryDays === 7) {
      deliveryString = 'FREE Shipping';
    }
    else if (option.deliveryDays === 3) {
      deliveryString = `$${chargeForThreeDays} - Shipping`;
    }
    else if (option.deliveryDays === 1) {
      deliveryString = `$${chargeForOneDay} - Shipping`;
    }
    
    DeliveryHTML +=
      `
       <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                    name="delivery-option-${matchingItem.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${deliveryDate}
                    </div>
                    <div class="delivery-option-price">
                      ${deliveryString} - Shipping
                    </div>
                  </div>
        </div>
        
    `;
}
console.log(DeliveryHTML);

document.querySelector('.js-order-summary').
  innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link').
  forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removeFromCart(productId);
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      console.log(container);
      container.remove();

    });

  });

// document.querySelector('.delivery-info').innerHTML = deliveryOptionsHTML;
const deliveryInfo = document.querySelector('.delivery-info');
deliveryInfo.innerHTML = DeliveryHTML;

