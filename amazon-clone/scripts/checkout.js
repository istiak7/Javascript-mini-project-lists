import { cart, removeFromCart } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryOptions } from '../data/deliveryoptions.js';


let cartSummaryHTML = '';
let paymentSummaryHTML = '';
let totalItems = 0;
let CostPerProduct = 0;
let totalCost = 0;


cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  let matchingProduct;
  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  let withinOneDay = dayjs().add(1, 'day').format('dddd, MMMM D');
  let withinTwoDays = dayjs().add(2, 'day').format('dddd, MMMM D');
  let withinSevenDays = dayjs().add(7, 'day').format('dddd, MMMM D');


  cartSummaryHTML +=
    `
  <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${withinOneDay}
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
                <div class="delivery-option">
                  <input type="radio" checked
                    class="delivery-option-input"
                   
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${withinOneDay}
                    </div>
                    <div class="delivery-option-price"
                    data-product-shipping-charge="0.00">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"

                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                     ${withinTwoDays}
                    </div>
                    <div class="delivery-option-price"
                    data-product-shipping-charge="4.99">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio"
                    class="delivery-option-input"
                  
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${withinSevenDays}
                    </div>
                    <div class="delivery-option-price"
                    data-product-shipping-charge="9.99">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
    `
  CostPerProduct = matchingProduct.priceCents * cartItem.qauntity;
  totalCost += CostPerProduct;
  totalItems += cartItem.qauntity;
});
paymentSummaryHTML +=


  `
      <div class="payment-summary-row">
        <div>Items (${totalItems}):</div>
        <div class="payment-summary-money">$${totalCost / 100}</div>
      </div>

      <div class="payment-summary-row">
        <div>Shipping &amp; handling:</div>
        <div class="payment-summary-shipping">$0.00</div>
      </div>

      <div class="payment-summary-row subtotal-row">
        <div>Total before tax:</div>
        <div class="payment-summary-money">$${totalCost / 100}</div>
      </div>

      <div class="payment-summary-row tax-row">
        <div>Estimated tax (10%):</div>
        <div class="payment-summary-money">$${((totalCost / 100) * 0.10).toFixed(2)}</div>
      </div>

      <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">$${(Number(totalCost / 100) + ((totalCost / 100) * 0.10)).toFixed(2)
        }</div>
      </div>
`

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


document.addEventListener("change", function (event) {
  if (event.target.classList.contains("delivery-option-input")) {

    // Get the shipping charge from the selected radio button
    let shippingCharge = parseFloat(event.target
      .closest(".delivery-option")
      .querySelector(".delivery-option-price")
      .getAttribute("data-product-shipping-charge"));


    let shippingCostElement = document.querySelector(".payment-summary-shipping");
    shippingCostElement.innerText = `$${shippingCharge.toFixed(2)}`;

  
    let finalCost = (Number(totalCost / 100) + Number(shippingCharge)).toFixed(2);
    let totalBeforeTaxElement = finalCost;
    
    document.querySelector('.subtotal-row .payment-summary-money').innerText = `$${totalBeforeTaxElement}` ;

    let estimatedTax = finalCost * 0.10;
    document.querySelector('.tax-row .payment-summary-money').innerHTML = `$${estimatedTax.toFixed(2)}`;
    document.querySelector('.total-row .payment-summary-money').innerHTML = `$${Number(finalCost) + Number(estimatedTax.toFixed(2))}`;

  }
});



document.querySelector('.js-payment-summary').
  innerHTML = paymentSummaryHTML;