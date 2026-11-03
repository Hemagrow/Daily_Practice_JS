const product_container = document.querySelector('.container')

async function getCountries() {
  try {
    const response = await fetch(
      "https://dummyjson.com/products"
    );

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();

    const products = data.products

    products.forEach(product => {
      console.log(product.title)
    product_container.innerHTML += `
     <div class="grid">
            <div class="cards">
                <div class="card">
                    <h1 class="product-heading">${product.title}</h1>
                    <img src="" alt="" class="product-img">
                    <p class="description"></p>
                    <p><b class="price"></b></p>
                    <p class="cat"> </p>
                    <p class="tags"></p>
                    <p class="brand"></p>
                </div>
            </div>
        </div>
    
    
    `

    });
  } catch (error) {
    console.log(error.message);
  }
}

getCountries();