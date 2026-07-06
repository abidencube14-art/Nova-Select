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

document.addEventListener("DOMContentLoaded", function () {

const popup = document.getElementById("sales-popup");

if(!popup) return;

const notifications = [

{
title:"Popular Product",
message:"Our Smart LED Lamp is trending today."
},

{
title:"Trending Now",
message:"Wireless Chargers are among this week's best sellers."
},

{
title:"Customer Favorite",
message:"Beauty & Personal Care products are selling fast."
},

{
title:"Hot Category",
message:"Home Improvement products are getting lots of attention."
}

];

function showPopup(){

const item = notifications[Math.floor(Math.random()*notifications.length)];

document.getElementById("popup-title").textContent = item.title;

document.getElementById("popup-message").textContent = item.message;

popup.classList.remove("hidden");

setTimeout(function(){

popup.classList.add("hidden");

},5000);

}

setTimeout(showPopup,4000);

setInterval(showPopup,25000);

});
