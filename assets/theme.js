document.addEventListener("DOMContentLoaded", function () {

const searchInput = document.querySelector("#search");

if (!searchInput) return;

searchInput.addEventListener("input", function () {

const value = this.value.toLowerCase();

const products = document.querySelectorAll(".product-card");

products.forEach(p => {

const text = p.innerText.toLowerCase();

p.style.display = text.includes(value) ? "block" : "none";

});

});

});

function addToWishlist(id){

let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

if(!wishlist.includes(id)){
wishlist.push(id);
localStorage.setItem("wishlist", JSON.stringify(wishlist));
alert("Saved to wishlist ❤️");
}else{
alert("Already saved!");
}

}

function updateShippingBar(){

// 🔥 Set free shipping threshold
const FREE_SHIPPING = 50;

// Shopify cart API
fetch('/cart.js')
.then(res => res.json())
.then(cart => {

let total = cart.total_price / 100;
let remaining = FREE_SHIPPING - total;

let text = document.querySelector(".shipping-text");
let bar = document.querySelector(".shipping-fill");

if(remaining > 0){

text.innerText = `You're $${remaining.toFixed(2)} away from FREE shipping 🚚`;

let percent = (total / FREE_SHIPPING) * 100;
bar.style.width = percent + "%";

}else{

text.innerText = "You unlocked FREE shipping 🎉";
bar.style.width = "100%";

}

});

}

// run on load
updateShippingBar();

// update when cart changes
document.addEventListener("cart:updated", updateShippingBar);
