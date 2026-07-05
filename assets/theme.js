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
