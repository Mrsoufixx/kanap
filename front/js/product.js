let params = new URLSearchParams(document.location.search);
let id = params.get("id");
let qte = 0;

fetch(`http://localhost:3000/api/products/${id}`)
  .then((response) => response.json())
  .then((data) => products(data))
  .then((data) => store(data));

//function for affichage de l description du produit avec prix et quantité et color quand veut
const products = (data) => {
  const imgProduct = document.querySelector(".imgProduct");
  imgProduct.setAttribute("src", data.imageUrl);
  imgProduct.setAttribute("alt", data.altTxt);

  document.querySelector("#title").innerHTML = data.name;
  document.querySelector("#price").innerHTML = data.price;
  document.querySelector("#description").innerHTML = data.description;

  //create option for colors exist in table colors
  const colors = document.querySelector("#colors");
  data.colors.map((e) => {
    let color = document.createElement("option");
    color.innerHTML = e;
    colors.insertAdjacentElement("beforeend", color);
  });
  //inserer le valeur d'input in variable qte pour le stocker dans local storage
  let quantity = document.getElementById("quantity");
};

//fonction store pour local storage
const store = (data) => {
  //button add to cart (local storage)
  let addCart = document.querySelector("#addToCart");
  console
  addCart.addEventListener("click", () => {
    //set attribute concat id with
    addCart.setAttribute("data-unique", `${id}-${colors.value}`);
    //declaration des vaiable
    let unique = addCart.dataset.unique;
    let prix = Number(price.innerHTML);
    let qte = Number(quantity.value);

    //create array object for local storage
    let product = {
      id: unique,
      color: colors.value,
      quantity: qte,
      price: prix,
    };

    //get item (array ) from local storage
    const items = JSON.parse(localStorage.getItem("items")) || [];
    let existIndex = items.findIndex((i) => i.id === unique);
    //inserer les objets (produts) dans array items

    if (existIndex > -1) {
      items[existIndex].quantity += qte;
      alert("item already exist we add quantity")
      if (items[existIndex].qte <= 0) {
        items.splice(existIndex, 1);
        alert("you cant add 0 item")
      }
    } else {
      items.push(product);
      alert("item added")
    }

    localStorage.setItem("items", JSON.stringify(items));
  });
};

