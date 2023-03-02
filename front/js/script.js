let products = document.querySelector('#items')

fetch("http://localhost:3000/api/products")
  .then((response) => response.json())
  .then((data) =>view(data));

  const view= (product)=>(
    
  products.insertAdjacentHTML("afterbegin",Object.values(product).map((e) =>
      
  ` <a href="./product.html?id=${e._id}">
 <article>
   <img src=${e.imageUrl} alt=${e.altTxt}>
   <h3 class="productName">${e.name}</h3>
   <p class="productDescription">${e.description}</p>
 </article>
</a>`
    ).join(""))
  
)
