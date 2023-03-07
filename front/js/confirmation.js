// Récupération de l'id de commande depuis l'URL
let param = new URLSearchParams(window.location.search)
let orderId=param.get("id");
// Affichage du numéro de commande dans la page
document.querySelector("#orderId").textContent = orderId;