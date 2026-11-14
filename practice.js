
const url = "https://dummyjson.com/products";

const productContainer = document.querySelector(".productcards");

const form = document.querySelector("#productForm");
const imageFile = document.querySelector("#img")
// console.log(imageFile)
console.dir(URL.createObjectURL)


// 1. COMMON FUNCTION TO SHOW PRODUCTS
function showProduct(product, isNew = false) {

  const imageUrl = product.images?.[0] || product.img;

  
  productContainer.innerHTML += `
    <div class="card" data-id="${product.id}" data-new="${isNew}">

      <img src="${imageUrl || ''}" alt="product">

      <h2>${product.title}</h2>
      <p>${product.description}</p>
      <p><b>Price: $${product.price}</b></p>
      <p>${product.category}</p>

      <button class="delete"
        onclick="deleteProduct(${product.id})">
        Delete
      </button>

    </div>
  `;
}


// 2. GET ALL PRODUCTS

async function getProduct() {

  try {

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();
// console.log(data)
    data.products.forEach(product => {

      showProduct(product);

    });

  } catch (error) {

    console.log(error.message);

  }

}

getProduct();


// 3. CREATE NEW PRODUCT (POST)
    let newProductId = 196;

form.addEventListener("submit", async function(e) {

  e.preventDefault();

const imageFile = document.querySelector("#img").files[0];
const product = {
    title: document.querySelector("#title").value,
    price: Number(document.querySelector("#price").value),
    img: imageFile ? URL.createObjectURL(imageFile) : "",
    category: document.querySelector("#category").value,
    description: document.querySelector("#description").value
};

  try {

    const response = await fetch(`${url}/add`, {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify(product)

    });

    if (!response.ok) {
      throw new Error("Product creation failed");
    }
    const data = await response.json();
    data.img = product.img;
data.id = newProductId++;


    console.log("Product created:", data);

    // Show new product immediately
    showProduct(data, true);

    alert("Product added successfully!");

    form.reset();

  } catch (error) {

    console.log(error.message);

  }

});


// 4. DELETE PRODUCT

async function deleteProduct(id) {

  const confirmDelete = confirm("Are you sure you want to delete?");

  if (!confirmDelete) return;

  // Find product card
  const productCard = document.querySelector(
    `.card[data-id="${id}"]`
  );

  if (!productCard) return;

  // Check if product is new
  const isNew = productCard.dataset.new === "true";

  try {

    // If new product, delete from webpage only
    if (isNew) {

      productCard.remove();

      alert("New product deleted successfully!");

      return;
    }

    // If original product, call DELETE API
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE"
    });

    if (!response.ok) {
      throw new Error("Delete failed");
    }

    const data = await response.json();

    console.log("Product deleted:", data);

    productCard.remove();

    alert("Product deleted successfully!");

  } catch (error) {

    console.log(error.message);

  }
}
