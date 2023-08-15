// cart
let cartWrapper = document.querySelector(".cart");
let totalQuantity = 0;
let cartIcon = document.getElementById("cart-btn");
let totalQuantityElement = document.querySelector(".totalQuanity");
totalQuantityElement.textContent = totalQuantity;

// abdate price im cart
function updateProductCardPrice(productCard, newPrice) {
  const priceElement = productCard.querySelector(".price");
  priceElement.textContent = `${newPrice}$`;
}

window.addEventListener("click", (e) => {

  if (e.target.hasAttribute("data-cart")) {
    let card = e.target.closest(".item");
    let productInfo = {
      id: card.dataset.id,
      name: card.querySelector("h2").innerText,
      imgSrc: card.querySelector("img").getAttribute("src"),
      price: parseFloat(card.querySelector(".price").innerText),
    };

    let cartItems = cartWrapper.querySelectorAll(".listCart .item");
    let itemInCart = Array.from(cartItems).find(
      (item) => item.dataset.name === productInfo.name
    );

    if (itemInCart) {
      let quantityElement = itemInCart.querySelector(".quantity span");
      let quantity = parseInt(quantityElement.textContent);
      quantityElement.textContent = quantity + 1;

      updateCartItemPrice(itemInCart, quantity + 1);

    } else {
      addToCartList(productInfo);
    }

    ++totalQuantity;
    totalQuantityElement.textContent = totalQuantity;
  }
});

function addToCartList(productInfo) {
  let cartList = cartWrapper.querySelector(".listCart");
  let cartListHTML = `
            <div class="item" data-name="${productInfo.name}" data-price="${productInfo.price}"></div>
          `;
  cartList.insertAdjacentHTML("beforeend", cartListHTML);

  ++totalQuantity;
  totalQuantityElement.textContent = totalQuantity;
}

// Add event listener to the "CLOSE" button within the cart
let closeButton = document.querySelector(".close");

closeButton.addEventListener("click", () => {
  cartWrapper.style.right = "-100%";

});

cartWrapper.addEventListener("click", (e) => {

  if (e.target.classList.contains("increment")) {
    let quantityElement = e.target.parentElement.querySelector("span");
    let quantity = parseInt(quantityElement.textContent);
    quantityElement.textContent = quantity + 1;
    ++totalQuantity;
    totalQuantityElement.textContent = totalQuantity;

    updateCartItemPrice(e.target.closest(".item"), quantity + 1);

  } else if (e.target.classList.contains("decrement")) {
    let quantityElement = e.target.parentElement.querySelector("span");
    let quantity = parseInt(quantityElement.textContent);
    if (quantity > 1) {
      quantityElement.textContent = quantity - 1;
      --totalQuantity;
      totalQuantityElement.textContent = totalQuantity;

      updateCartItemPrice(e.target.closest(".item"), quantity - 1);

    } else {
      let item = e.target.closest(".item");
      item.remove();
      --totalQuantity;
      totalQuantityElement.textContent = totalQuantity;
    }
  }

});

function addToCartList(productInfo) {
  let cartListHTML = `
        <div class="item" data-name="${productInfo.name}" data-price="${parseFloat(productInfo.price)}">
          <img src="${productInfo.imgSrc}">
          <div class="content">
            <div class="name">
              ${productInfo.name}
            </div>
            <div class="price">
              ${parseFloat(productInfo.price)}$
            </div>
          </div>
          <div class="quantity">
            <button class="decrement">-</button>
            <span>1</span>
            <button class="increment">+</button>
          </div>
        </div>
      `;
  cartWrapper.querySelector(".listCart").insertAdjacentHTML("beforeend", cartListHTML);
}

function updateCartItemPrice(item, quantity) {
  let priceElement = item.querySelector(".price");
  let pricePerUnit = parseFloat(item.dataset.price);
  let totalPrice = pricePerUnit * quantity;
  priceElement.textContent = `${totalPrice}$`;
}
// Add event listener for Add To Cart button
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("addToCart")) {
    const productCard = e.target.closest(".item");
    const productInfo = {
      id: productCard.dataset.id,
      name: productCard.querySelector("h2").innerText,
      imgSrc: productCard.querySelector("img").getAttribute("src"),
      price: productCard.querySelector(".price").innerText,
    };

    addToCart(productInfo);

    // Update the price on the product card
    updateProductCardPrice(productCard, parseFloat(productInfo.price));
  }
});

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
}

// cartlist open close
let cartBtn = document.querySelector("#cart-btn");
let cart = document.querySelector(".cart");

cartBtn.addEventListener("click", (e) => {
  if (cart.style.right === "-100%") {
    cart.style.right = 0;
  } else {
    cart.style.right = "-100%";
  }
  if (e.target.classList.contains("close")) {
    cart.style.right === "-100%"
  }
});