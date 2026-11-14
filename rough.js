
const url = "https://dummyjson.com/products";

const product_container = document.querySelector(".productcards");
const form = document.querySelector("form");
const titleInput = document.querySelector("#title");
const descriptionInput = document.querySelector("#description");
const submitBtn = document.querySelector("#submitBtn");

// Show product cards
function showproduct(product) {
  product_container.innerHTML += `
    <div class="card" data-id="${product.id}">
      <h1>${product.title}</h1>
      <p>${product.description}</p>

      <div class="group">
        <button type="button" onclick="product_delete(${product.id})">
          Delete
        </button>

        <button type="button" onclick="editProduct(${product.id})">
          Edit
        </button>
      </div>
    </div>
  `;
}

// GET products
async function getProduct() {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Something went wrong");
    }

    const data = await response.json();

    data.products.forEach((product) => {
      showproduct(product);
    });

  } catch (error) {
    console.log(error);
  }
}

getProduct();


// EDIT: Fill existing HTML form
async function editProduct(id) {
  try {
    const response = await fetch(`${url}/${id}`);
    const product = await response.json();

    // Put existing product data inside form
    titleInput.value = product.title;
    descriptionInput.value = product.description;

    // Store product ID for updating
    form.dataset.editId = id;

    // Change button text
    submitBtn.textContent = "Update Product";

    // Scroll to form
    form.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

  } catch (error) {
    console.log(error);
  }
}


// ADD OR UPDATE PRODUCT
form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const product = {
    title: titleInput.value,
    description: descriptionInput.value,
  };

  const editId = form.dataset.editId;

  try {
    let response;

    if (editId) {
      // PATCH existing product
      response = await fetch(`${url}/${editId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });

    } else {
      // POST new product
      response = await fetch(`${url}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
    }

    if (!response.ok) {
      throw new Error("Request failed");
    }

    const data = await response.json();

    if (editId) {
      // Update existing card
      const card = document.querySelector(
        `.card[data-id="${editId}"]`
      );

      card.querySelector("h1").textContent = data.title;
      card.querySelector("p").textContent = data.description;

      // Clear edit mode
      delete form.dataset.editId;

      submitBtn.textContent = "Add Product";

      console.log("Product updated", data);

    } else {
      // Display newly added product
      showproduct(data);

      console.log("Product added", data);
    }

    form.reset();

  } catch (error) {
    console.log(error);
  }
});


// DELETE product
async function product_delete(id) {
  try {
    const response = await fetch(`${url}/${id}`, {
      method: "DELETE",
    });

    const data = await response.json();

    const productgrid = document.querySelector(
      `.card[data-id="${id}"]`
    );

    if (productgrid) {
      productgrid.remove();
    }

    console.log("Product deleted", data);

  } catch (error) {
    console.log(error);
  }
}
