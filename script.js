let cart = JSON.parse(localStorage.getItem("cart")) || [];
let totalPrice = 0;

// 📌 Add to Cart Function
function addToCart(productName, price) {
    price = parseFloat(price);
    cart.push({ name: productName, price });
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartUI();
    showToast(`${productName} added to cart!`);
    animateCart();
}

// 📌 Update Cart UI
function updateCartUI() {
    const cartList = document.getElementById("cart-list");
    const totalPriceElement = document.getElementById("total-price");

    if (!cartList || !totalPriceElement) return;

    cartList.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        let li = document.createElement("li");
        li.textContent = `${item.name} - ₹${item.price}`;
        cartList.appendChild(li);
        total += item.price;
    });

    totalPriceElement.textContent = `Total: ₹${total}`;
}

// 📌 Clear Cart
function clearCart() {
    cart = [];
    localStorage.removeItem("cart");
    updateCartUI();
}

// 📌 Toggle Dark Mode
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    let darkMode = document.body.classList.contains("dark-mode") ? "enabled" : "disabled";
    localStorage.setItem("dark-mode", darkMode);
}

// 📌 Apply Dark Mode on Load
document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("dark-mode") === "enabled") {
        document.body.classList.add("dark-mode");
    }
    updateCartUI();
});

// 📌 Event Listener for Dark Mode Button
document.getElementById("dark-mode-toggle").addEventListener("click", toggleDarkMode);

// 📌 Initialize AOS for animations
AOS.init();

// 📌 Button Bounce Animation
document.querySelector('.button').addEventListener('click', function () {
    this.classList.add('bounce');
});

// 📌 Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// 📌 GSAP Animations
gsap.from(".element", { duration: 2, x: -100, opacity: 0 });
gsap.to(".button", { duration: 1, scale: 1.2, repeat: -1, yoyo: true });

// 📌 Toast Notification Function
function showToast(message) {
    const toast = document.getElementById('cart-toast');
    toast.textContent = message; // Update the toast message
    toast.style.display = 'block';
    setTimeout(() => { toast.style.display = 'none'; }, 3000); // Auto-hide after 3 seconds
}

// 📌 Cart Icon Animation
function animateCart() {
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.classList.add('bounce');
        setTimeout(() => cartIcon.classList.remove('bounce'), 500);
    }
}

// 📌 Product Image Animation (when adding to cart)
gsap.to('.product-image', {
    duration: 1,
    x: 300,
    y: -200,
    opacity: 0,
    onComplete: () => { console.log('Added to cart animation complete!'); }
});

// 📌 Show Mini Cart on Add to Cart Button Click
function showMiniCart() {
    const miniCart = document.getElementById('mini-cart');
    if (miniCart) {
        miniCart.style.display = 'block';
        setTimeout(() => { miniCart.style.display = 'none'; }, 3000); // Auto-hide after 3 seconds
    }
}

// Event Listener for Add to Cart Button
document.querySelector('.add-to-cart-button').addEventListener('click', () => {
    showMiniCart();
});

// 📌 Search Bar Functionality
const products = ["Smartwatch", "Headphones", "Laptop", "Camera", "Shoes", "Backpack"];
const searchBar = document.getElementById('search-bar');
const suggestions = document.getElementById('suggestions');

searchBar.addEventListener('input', () => {
    const input = searchBar.value.toLowerCase();
    const filtered = products.filter(product => product.toLowerCase().includes(input));
    suggestions.innerHTML = filtered.map(item => `<li>${item}</li>`).join('');
    suggestions.style.display = filtered.length ? 'block' : 'none';
});

// 📌 Handling Search Suggestions Click
suggestions.addEventListener('click', (e) => {
    searchBar.value = e.target.textContent;
    suggestions.style.display = 'none';
});
const darkModeButton = document.querySelector('.dark-mode-btn');
const body = document.body;

// Check if dark mode is saved in localStorage
if (localStorage.getItem('darkMode') === 'enabled') {
    body.classList.add('dark-mode');
}

darkModeButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    // Save the dark mode state
    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
    } else {
        localStorage.removeItem('darkMode');
    }
});
window.onscroll = function() {
    if (document.documentElement.scrollTop > 200) {
        document.getElementById("topBtn").style.display = "block";
    } else {
        document.getElementById("topBtn").style.display = "none";
    }
};
document.getElementById("topBtn").onclick = function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};
// Backend se data fetch karne ke liye Fetch API ka use kar raha hai
fetch("http://localhost:5000/")
    .then(response => response.text()) // Kyunki backend text response de raha hai
    .then(data => {
        document.getElementById("response").innerText = data;
    })
    .catch(error => console.error("Error fetching data:", error));
    fetch('http://localhost:5000')
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error("Error:", error));
