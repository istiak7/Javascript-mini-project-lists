export let cart = JSON.parse(localStorage.getItem('cart')) || [];

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function addToCart(productId, productPrice, quantity) {

  let matchingItem;
  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
    }
  });

  if (matchingItem) {
    matchingItem.qauntity += quantity;
    matchingItem.productPrice = Number(matchingItem.productPrice) + Number(productPrice);
  }
  else {
    cart.push({
      productId: productId,
      productPrice: productPrice,
      qauntity: quantity
    })
  }
  saveToStorage();
}

export function updateCardQuantity() {

  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.qauntity;
  });
  document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;

}

export function removeFromCart(productId) {
  const newCard = [];
  cart.forEach((cardItem) => {
    if (cardItem.productId !== productId) {
      newCard.push(cardItem);
    }
  });
  cart = newCard;
  saveToStorage();
  
}