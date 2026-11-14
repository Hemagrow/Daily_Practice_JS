const ele = document.querySelector('.productcards')
function showproduct(product){
 ele.innerHTML += `<h1> Hello Hema ${product[0].name}</a>` 
}

function getProduct(){
  const productObj = [{name: "Apple", price : 22}]
  showproduct(productObj)
}
getProduct()