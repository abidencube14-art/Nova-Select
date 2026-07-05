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
