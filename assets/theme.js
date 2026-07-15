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

document.addEventListener("DOMContentLoaded", function(){

const form = document.getElementById("tracking-form");

if(!form) return;

form.addEventListener("submit", function(e){

e.preventDefault();

const tracking = document.getElementById("tracking-number").value;

const result = document.getElementById("tracking-result");

result.style.display = "block";

result.innerHTML = `
<h3>Tracking Number</h3>
<p><strong>${tracking}</strong></p>

<br>

<p>✅ Your tracking request has been received.</p>

<p>You can connect this page later to a shipping service like AfterShip, Parcel Panel or your courier for live tracking updates.</p>
`;

});

});

let sticky = document.getElementById("stickyCart");

window.addEventListener("scroll", function(){
if(window.scrollY > 400){
sticky.style.display = "flex";
}else{
sticky.style.display = "none";
}
});

document.addEventListener("DOMContentLoaded", function(){

const searchInput = document.getElementById("search-input");
const resultsBox = document.getElementById("search-results");

if(!searchInput) return;


searchInput.addEventListener("input", function(){

let query = this.value.trim();


if(query.length < 1){
resultsBox.innerHTML = "";
return;
}


fetch(`/search/suggest.json?q=${query}&resources[type]=product&resources[limit]=6`)
.then(response => response.json())
.then(data => {


let products = data.resources.results.products;


resultsBox.innerHTML = "";


products.forEach(product => {


let card = document.createElement("a");

card.href = product.url;

card.className = "predictive-card";


card.innerHTML = `

<img src="${product.image}" alt="${product.title}">

<div class="predictive-info">

<h4>${product.title}</h4>

<p>${product.price}</p>

</div>

`;

resultsBox.appendChild(card);


});


});


});


});
