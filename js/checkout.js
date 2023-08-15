document.addEventListener("DOMContentLoaded", function () {
  // Get the cart items from local storage
  const cartItemsForCheckout = JSON.parse(localStorage.getItem("cart")) || [];


  // Select the container to display cart items and totals
  const listCheckout = document.querySelector(".listCheckout");
  const totalQuantityElement = document.querySelector(".totalQuantity");
  const totalPriceElement = document.querySelector(".totalPrice");
  const rowTotalQuantity = document.querySelector(".RowtotalQantity")

  // Initialize total quantity and total price
  let totalQuantity = 0;
  let totalPrice = 0;
  let rowTotalQuantitys = 0

  // Clear the listCheckout container before adding items
  listCheckout.innerHTML = "";

  // Iterate through cart items and calculate totals
  cartItemsForCheckout.forEach((item) => {
    const itemHTML = `
        <div class="item">
          <img src="${item.imgSrc}" alt="">
          <div class="info">
            <div class="name">${item.name}</div>
            <div class="price">${item.price}</div>
          </div>
          <div class="quantity">${item.quantity}</div>
          <div class="returnPrice">${parseFloat(item.price) * item.quantity}$</div>
        </div>
      `;
    listCheckout.insertAdjacentHTML("beforeend", itemHTML);

    totalQuantity += item.quantity;
    totalPrice += parseFloat(item.price) * item.quantity;
    rowTotalQuantitys += item.quantity
  });

  // Update total quantity and total price
  if (totalQuantityElement) {
    totalQuantityElement.textContent = totalQuantity;
  }

  if (totalPriceElement) {
    totalPriceElement.textContent = `${totalPrice}դր`;
  }
  if (rowTotalQuantity) {
    rowTotalQuantity.textContent = `${totalQuantity}`;
  }

  // Add event listener to the Order button
  const orderButton = document.querySelector(".buttonCheckout");

  orderButton.addEventListener("click", function () {

    localStorage.removeItem("cart");

    const form = document.querySelector(".form");
    if (form) {
      const inputFields = form.querySelectorAll("input, select");
      inputFields.forEach((input) => {
        input.value = "";
      });
    }

    listCheckout.innerHTML = "";
    totalPriceElement.textContent = "0";
    rowTotalQuantity.textContent = "0";

    // Optional: Show a message or perform any other action after ordering
    alert("Thank you!");

    // Clear the checkout display

  });

});

