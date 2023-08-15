fetch("products.json")
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    localStorage.setItem("products", JSON.stringify(data));
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", "[]");
    }
  });

document.addEventListener("click", (e) => {

  if (e.target.classList.contains("addToCart")) {
    const productCard = e.target.closest(".item");
    const productInfo = {
      id: productCard.dataset.id,
      name: productCard.querySelector("h2").innerText,
      imgSrc: productCard.querySelector("img").getAttribute("src"),
      price: productCard.querySelector(".price").innerText,
    };

    addToCart(productInfo, 1); // Pass the quantity change as an argument
    updateCheckout(); // Update the checkout page
  }
});

// Inside the addToCart function
function addToCart(productInfo) {

  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const existingItem = cartItems.find((item) => item.id === productInfo.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.push({
      id: productInfo.id,
      name: productInfo.name,
      imgSrc: productInfo.imgSrc,
      price: productInfo.price,
      quantity: 1,
    });
  }

  localStorage.setItem("cart", JSON.stringify(cartItems));
  updateCartForCheckout(productInfo.id, quantityChange); // Update cartItemsForCheckout

}
// Update cartItemsForCheckout
function updateCartForCheckout(productId, quantityChange) {
  const cartItemsForCheckout = JSON.parse(localStorage.getItem("cartForCheckout")) || [];
  const existingItem = cartItemsForCheckout.find((item) => item.id === productId);
  console.log(existingItem);

  if (existingItem) {
    existingItem.quantity += quantityChange;
  } else {
    cartItemsForCheckout.push({
      id: productId,
      quantity: quantityChange,
    });
  }

  localStorage.setItem("cartForCheckout", JSON.stringify(cartItemsForCheckout));
}






