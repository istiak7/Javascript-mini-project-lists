export const cart = [{
    productId : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    qauntity : 2
},
{
    productId : "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    qauntity : 1
},
{
    productId : "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    qauntity : 2
}];

export function addToCart(productId, productPrice) {  

    let matchingItem;
    cart.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        matchingItem = cartItem;
      }
    });
  
    if (matchingItem) {
      matchingItem.qauntity += 1;
      matchingItem.productPrice = Number(matchingItem.productPrice) + Number(productPrice);
    }
    else {
      cart.push({
        productId: productId,
        productPrice: productPrice,
        qauntity: 1
      })
    }
  }
  
export function updateCardQuantity() {
  
      let cartQuantity = 0;
      cart.forEach((cartItem) => {
        cartQuantity += cartItem.qauntity;
      });
      document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
  
  }