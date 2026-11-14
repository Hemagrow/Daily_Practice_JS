const url = 'https://dummyjson.com/products'

async function dataapi() {
    const response = await fetch(url)
    const data = await response.json()
 return data
}
dataapi().then((result)=>{
dataapi().then((result) => {
// console.log(result)
console.log(result.products)
//     result.products.forEach(product => {
//         console.log(product.id);
//         console.log(product.title);
//         // console.log(product.tags);
//         product.tags.forEach((tag)=>{
// console.log(tag)
//         })
//     });

});
   
})


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
      console.log(product)
    product_container.innerHTML += `
     <div class="grid">
            <div class="cards">
                <div class="card">
                    <h1 class="product-heading">${product.title}</h1>
                    <img src="${product.images[0]}" alt="" class="product-img">
                    <p class="description">${product.description}</p>
                    <p><b class="price"></b>${product.price}</p>
                    <p class="cat">${product.category} </p>
                    <p class="tags">${product.tags}</p>
                    <p class="brand">${product.brand}</p>
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