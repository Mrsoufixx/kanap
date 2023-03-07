/*********************************  Cart (quantity and Price)  **************************************/
//declaration de variable
const items = JSON.parse(localStorage.getItem("items"));
const cartItems = document.getElementById("cart__items");
const totalPrice = document.getElementById("totalPrice");
let total = 0;
const totalQuantity = document.querySelector("#totalQuantity");

//loop for {array} items present in localstorage
items.forEach((elt) => {
  let id = String(elt.id.split("-").slice(0, 1));

  //import data from api
  fetch(`http://localhost:3000/api/products/${id}`)
    .then((response) => response.json())
    .then((data) => carts(data, elt));
});

//@param {object} data
//@param {object} element

const carts = (data, element) => {
  //all element of item in cart
  let cart = `<article class="cart__item" data-unique=${element.id}>
<div class="cart__item__img">
  <img src=${data.imageUrl} alt="Photographie d'un canapé">
</div>
<div class="cart__item__content">
  <div class="cart__item__content__description">
    <h2>${data.name}</h2>
    <p>Color : ${element.color}</p>
    <p>Price : ${data.price} €</p>
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
  totalPrice.innerHTML = getTotal(element, data).toLocaleString();
  cartItems.insertAdjacentHTML("beforebegin", cart);
  totalQuantity.innerHTML = items.length;

  //eclaration vaiable element exist in product
  const itemQuantity = document.querySelector(".itemQuantity");
  const deleteItem = document.querySelector(".deleteItem");

  //update quantity and total price
  itemQuantity.addEventListener("change", () => {
    let qte = Number(itemQuantity.value);
    element.quantity = qte;
    totalPrice.innerHTML = updateTotal(data).toLocaleString();
  });

  //delete item and update total price
  deleteItem.addEventListener("click", () => {
    const cartItem = deleteItem.closest(".cart__item");
    let Unique = cartItem.dataset.unique;
    if (confirm("Are you sure you want to delete this item?")) {
      cartItem.remove();
      // Remove the item from localStorage as well
      const id = items.findIndex((item) => item.id === Unique);
      if (id > -1) {
        items.splice(id, 1);
        localStorage.setItem("items", JSON.stringify(items));
      }
    }
    // Update the total price and quantity
    totalQuantity.innerHTML = items.length;
    totalPrice.innerHTML = updateTotal(data).toLocaleString();
  });
};

//function for calculate Total price
//@param {object} element
const getTotal = (element, data) => (total += data.price * element.quantity);

//function for update Total price
const updateTotal = (data) =>
  items.reduce((acc, val) => (acc += val.quantity * data.price), 0);

/*********************************  Cart(Order)  **************************************/

//decalaration variable
const order = document.querySelector("#order");

const inputs = document.querySelectorAll("input[type='text']");

order.addEventListener("click", (e) => {

e.preventDefault()

  const firstname = document.querySelector("#firstName").value;
  const lastname = document.querySelector("#lastName").value;
  const address = document.querySelector("#address").value;
  const city = document.querySelector("#city").value;
  const email = document.querySelector("#email").value;

  // validate input fields
  inputs.forEach((input) => {
    const error = document.querySelector(`#${input.id}ErrorMsg`);
    input.value.trim() === ""
      ? (error.innerHTML = `Please enter your ${input.id.toLowerCase()}`)
      : (error.innerHTML = "");
  });

  // email validation using regex
  // const emailRegex = /^[a-zA-Z0-9._-]{3,}@[a-zA-Z0-9.-]{3,}\.[a-zA-Z]{2,}$/;
  const emailRegex =/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (!emailRegex.test(email)) {
    emailErrorMsg.innerHTML = "please enter the valid email";
    return;
  }

  //object of person order
  let contact = {
    firstName: firstname,
    lastName: lastname,
    address: address,
    city: city,
    email: email,
  };
  let products = items.map(item => (item.id.split("-").slice(0,1).join("")))
  console.log(products)
  const orders = {
    contact: contact,
    products: products
  };


  // POST request to API
fetch("http://localhost:3000/api/products/order", {
    method: "POST",
			
			headers: {
        // 'Accept': 'application/json',
				"Content-type": "application/json",
			},
      body: JSON.stringify(orders),
  })
    .then((response) => {
      response.json()
      .then(function(result) {
        window.location.href = `confirmation.html?id=${result.orderId}`;
    });
    })
    .catch(error => console.log(error));

     alert("command send it ");
});


