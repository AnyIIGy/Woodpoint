document.addEventListener("DOMContentLoaded", function () {
  let productsPerPage = 6; // Number of products per page
  let currentPage = 1; // Current page number
  let productData = []; // Variable to store product data from JSON
  let filteredProducts = []; //  filteredProducts 

  // Function to fetch data from JSON file
  async function fetchData() {
    try {
      const response = await fetch("products.json")
      productData = await response.json();
      displayProducts();

    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // an event listener to the search input
  document.getElementById("searchInput").addEventListener("input", function (event) {

    let input = event.target;
    input.value = input.value.replace(/[^a-zA-Z]/g, '');

    displayProducts();

  });

  document.getElementById("search-btn").addEventListener("click", function (e) {
    displayProducts();
  });

  function displayProducts() {

    // search
    let searchQuery = document.getElementById("searchInput").value.toLowerCase();
    let startIndex = (currentPage - 1) * productsPerPage;
    let endIndex = startIndex + productsPerPage;
    let productContainer = document.getElementById("productContainer");
    productContainer.innerHTML = "";

    for (let i = startIndex; i < Math.min(endIndex, productData.length); i++) {
      let product = productData[i];

      // Check if the search query matches the product name (case-insensitive)
      if (product.productName.toLowerCase().includes(searchQuery)) {

        let productCard = document.createElement("div");
        productCard.classList.add("item");
        productCard.setAttribute("data-id", product.id);
        productCard.innerHTML = `
            <img src="${product.img}">
            <h2 data-name="productName">${product.productName}</h2>
            <div class="price">${product.price}$</div>
            <button class="addToCart" data-cart>Add To Cart</button>
          `;
        productContainer.appendChild(productCard);
      }
    }

    createPagination();
  }



  //aside filter
  let submitBtn = document.querySelector("#submitBtn");
  submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let category = document.querySelector("#category").value;
    let color = document.querySelector("#color").value;
    let minPrice = parseFloat(document.getElementById("price").value);
    console.log(minPrice);

    // Check if any of the form fields have values
    let hasFilters = category !== "all" || color !== "all" || !isNaN(minPrice);

    if (hasFilters) {
      // Filter the products based on the selected criteria
      filteredProducts = productData.filter((product) => {
        return (
          product.category === category ||
          product.color === color ||
          parseFloat(product.price) <= minPrice
        );
      });
      // Clear the container before displaying the filtered products
      let productContainer = document.getElementById("productContainer");
      productContainer.innerHTML = "";

      // Display the filtered products based on the pagination
      let startIndex = (currentPage - 1) * productsPerPage;
      let endIndex = startIndex + productsPerPage;

      for (let i = startIndex; i < Math.min(endIndex, filteredProducts.length); i++) {

        let product = filteredProducts[i];

        let productCard = document.createElement("div");
        productCard.classList.add("item");
        productCard.innerHTML = `
        <div class="product-box" data-id="${product.id}">
            <img src="${product.img}">
            <h2>${product.productName}</h2>
            <div class="price">${product.price}$</div>
        </div>
        `;
        productContainer.appendChild(productCard);
        console.log(productCard);

        // Reset the form fields after submitting
        document.querySelector(".filter").reset();
      }
    } else {
      console.log("No filters applied");
    }
    // Update the pagination based on the filtered products
    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    updatePagination(totalPages);

    updatePaginationStyles();
  });

  // Function to update the pagination based on total pages
  function updatePagination(totalPages) {
    const paginationContainer = document.getElementById("paginationContainer");
    paginationContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
      const paginationLink = document.createElement("span");
      paginationLink.classList.add("pagination-item");
      paginationLink.textContent = i;

      paginationLink.addEventListener("click", function () {
        currentPage = i;
        displayProducts();
        updatePaginationStyles();
      });

      paginationContainer.appendChild(paginationLink);
    }
  }

  // Function to create pagination links
  function createPagination() {
    const totalPages = Math.ceil(productData.length / productsPerPage);
    const paginationContainer = document.getElementById("paginationContainer");
    paginationContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
      const paginationLink = document.createElement("span");
      paginationLink.classList.add("pagination-item");
      paginationLink.textContent = i;

      paginationLink.addEventListener("click", function () {
        currentPage = i;
        displayProducts();
        updatePaginationStyles();
      });

      paginationContainer.appendChild(paginationLink);
    }

    updatePaginationStyles();
  }

  // Function to update the styles of the active pagination link
  function updatePaginationStyles() {
    const paginationLinks = document.querySelectorAll(".pagination-item");
    paginationLinks.forEach((link, index) => {
      if (index + 1 === currentPage) {
        link.classList.add("pagination-item-active");
      } else {
        link.classList.remove("pagination-item-active");
      }
    });
  }

  // Call fetchData to fetch JSON data and display products
  fetchData();

});


