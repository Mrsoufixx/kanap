//declaration de variable
const items = JSON.parse(localStorage.getItem("items"));
const cartItems = document.getElementById("cart__items");
let totalPrice = document.getElementById("totalPrice");
let total = 0;
let totalQuantity = document.querySelector("#totalQuantity");

items.forEach((elt) => {
  let id = String(elt.id.split("-").slice(0, 1));
  fetch(`http://localhost:3000/api/products/${id}`)
    .then((response) => response.json())
    .then((data) => carts(data, elt));
});

const carts = (data, element) => {
  let cart = `<article class="cart__item" data-unique=${element.id}>
<div class="cart__item__img">
  <img src=${data.imageUrl} alt="Photographie d'un canapé">
</div>
<div class="cart__item__content">
  <div class="cart__item__content__description">
    <h2>${data.name}</h2>
    <p>Color : ${element.color}</p>
    <p>Price : ${element.price} €</p>
  </div>
  <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
      <p>Qté : </p>
      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" id=${element.id} value=${element.quantity}>
    </div>
    <div class="cart__item__content__settings__delete">
      <p class="deleteItem">Supprimer</p>
    </div>
  </div>
</div>
</article> `;
  //add product and total price with number of article
  totalPrice.innerHTML = getTotal(element).toLocaleString();
  cartItems.insertAdjacentHTML("afterbegin", cart);
  totalQuantity.innerHTML = items.length;

  //eclaration vaiable element exist in product
  const itemQuantity = document.querySelector(".itemQuantity");
  const deleteItem = document.querySelector(".deleteItem");

  //update quantity and total price
  itemQuantity.addEventListener("change", () => {
    let qte = Number(itemQuantity.value);
    element.quantity = qte;
    totalPrice.innerHTML = updateTotal().toLocaleString();
  });

  //delete item and update total price
  deleteItem.addEventListener("click", () => {
    const cartItem = deleteItem.closest(".cart__item");
    let Unique = cartItem.dataset.unique
    confirm("wesh mn nytek!!")?cartItem.remove():"You canceled!"
    // Remove the item from localStorage as well
    const id = items.findIndex((item) => item.id === Unique);
    if (id > -1) {
      items.splice(id, 1);
      localStorage.setItem("items", JSON.stringify(items));
    }
    // Update the total price and quantity
    totalQuantity.innerHTML = items.length;
    totalPrice.innerHTML = updateTotal().toLocaleString();
  });
};

//other function for calculate Total price
let getTotal = (element) => {
  return (total += element.price * element.quantity);
};

let updateTotal = () =>
  items.reduce((acc, val) => (acc += val.quantity * val.price), 0);
