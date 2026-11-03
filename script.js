const product_container = document.querySelector('.container');

async function getCountries() {
  try {
    const response = await fetch("https://dummyjson.com/products");

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();

    const products = data.products;

    products.forEach(product => {

      product_container.innerHTML += `
        <div class="product-card">
          <h1 class="product-heading">${product.title}</h1>

          <img class="product-img" src="${product.thumbnail}">

          <p class="description">${product.description}</p>

          <h3 class="price">$${product.price}</h3>

          <p class="cat">${product.category}</p>

          <p class="tags">${product.tags.join(", ")}</p>

          <p class="brand">${product.brand || "No Brand"}</p>
        </div>
      `;

    });

  } catch (error) {
    console.log(error.message);
  }
}

getCountries();