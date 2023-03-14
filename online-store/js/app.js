const burgerBtn = document.querySelector('.toggle-nav')
const menu = document.querySelector('.sidebar-overlay')
const burgerCloseBtn = document.querySelector('.sidebar-close')

burgerBtn.addEventListener('click', () => {
  menu.classList.toggle('show')
})

burgerCloseBtn.addEventListener('click', () => {
  menu.classList.toggle('show')
})

// ----------

const cartBtn = document.querySelector('.toggle-container')
const cartOverlay = document.querySelector('.cart-overlay')
const cartClose = document.querySelector('.cart-close')

cartBtn.addEventListener('click', () => {
  cartOverlay.classList.toggle('show')
})

cartClose.addEventListener('click', () => {
  cartOverlay.classList.toggle('show')
})

// ----------

const rangeInput = document.querySelector('.price-filter')
const output = document.querySelector('.price-value')

const currentPage = window.location.pathname;
if (currentPage === '/online-store/products.html') {
  rangeInput.addEventListener('input', function() {
    output.textContent = `Value : $${rangeInput.value}`
  })
} 



// ----------

const productsContainer = document.querySelector('.products-container');
const searchInput = document.querySelector('.search-input');
const companyBtns = document.querySelectorAll('.company-btn');
const priceFilter = document.querySelector('.price-filter');
const priceValue = document.querySelector('.price-value');

// Fetch products data
async function getProducts() {
  const response = await fetch('data.json');
  const data = await response.json();
  return data;
}

async function getProduct(productId) {
  const products = await getProducts();
  const product = products.find(product => product.id === productId);
  return product;
}

// Display products based on filter criteria
async function displayProducts() {
  const products = await getProducts();
  if (currentPage === '/online-store/products.html') {
    const filteredProducts = products.filter(product => {
      const searchMatch = product.name.toLowerCase().includes(searchInput.value.toLowerCase());
      const activeBtn = Array.from(companyBtns).find(btn => btn.classList.contains('active'));
      const companyMatch =  !activeBtn || activeBtn.textContent.toLowerCase() === 'all' || activeBtn.textContent.toLowerCase() === product.category.toLowerCase();
  
      const priceMatch = product.price <= parseInt(priceFilter.value);
      return searchMatch && companyMatch && priceMatch;
    });
    const productsHTML = filteredProducts.map(product => `
      <article class="product product-grid">
        <div class="product-container">
          <img src="${product['imgUrl']}" class="product-img img" alt="${product.name}" />

          <div class="product-icons">
            <a href="product.html?id=${product.id}" class="product-icon">
              <i class="fas fa-search"></i>
            </a>
            <button class="product-cart-btn product-icon" data-id="${product.id}">
              <i class="fas fa-shopping-cart"></i>
           </button>
          </div>
        </div>
        <footer>
          <p class="product-name">${product.name}</p>
          <h4 class="product-price">$${product.price.toFixed(2)}</h4>
        </footer>
      </article>
    `).join('');
    productsContainer.innerHTML = productsHTML;
    if (filteredProducts.length === 0) {
      productsContainer.innerHTML = `<p>Sorry, No Products Matched Your Search</p>`;
    }
  } 
  
  
}

if (currentPage === '/online-store/products.html') {
  // Event listeners for filter criteria
  searchInput.addEventListener('input', displayProducts);
} 

companyBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    companyBtns.forEach(otherBtn => otherBtn.classList.remove('active'));
    btn.classList.add('active');
    displayProducts();
  });
});

if (currentPage === '/online-store/products.html') {
  priceFilter.addEventListener('input', () => {
    priceValue.textContent = `Value: $${priceFilter.value}`;
    displayProducts();
  });
} 



// Initial display of products
displayProducts();

// ------------------

const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartCheckoutBtn = document.querySelector('.cart-checkout');
const cartItemCount = document.querySelector('.cart-item-count');
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add product to cart
function addToCart(product) {
  // Check if product already exists in cart
  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    // If the product already exists, increase the quantity
    existingItem.quantity++;
  } else {
    // If it's a new product, add it to the cart
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.imgUrl
    });
  }

  // Update cart content and total
  updateCart();
  cartItemCount.textContent = cart.length;

  // Save cart to localStorage
  saveCart();
}

// Update cart content and total
function updateCart() {
  // Clear existing cart items from display
  cartItems.innerHTML = '';

  // Loop through cart and display items
  cart.forEach(item => {
    const cartItem = document.createElement('article');
    cartItem.classList.add('cart-item');
    cartItem.setAttribute('data-id', item.id);
    cartItem.innerHTML = `
      <img src="${item.image}" class="cart-item-img" alt="${item.name}">
      <div>
        <h4 class="cart-item-name">${item.name}</h4>
        <p class="cart-item-price">$${item.price.toFixed(2)}</p>
        <button class="cart-item-remove-btn" data-id="${item.id}">remove</button>
      </div>
      <div>
        <button class="cart-item-increase-btn" data-id="${item.id}">
          <i class="fas fa-chevron-up"></i>
        </button>
        <p class="cart-item-amount" data-id="${item.id}">${item.quantity}</p>
        <button class="cart-item-decrease-btn" data-id="${item.id}">
          <i class="fas fa-chevron-down"></i>
        </button>
      </div>
    `;
    cartItems.appendChild(cartItem);
  });

  // Display cart total
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  cartTotal.textContent = `$${total.toFixed(2)}`;
}

// Load cart from localStorage on page load
const savedCart = localStorage.getItem('cart');
if (savedCart) {
  cart = JSON.parse(savedCart);
  updateCart();
}

if (currentPage === '/online-store/products.html') {
  // Listen for click events on add to cart buttons
  productsContainer.addEventListener('click', async event => {
  if ( event.target.classList.contains('product-cart-btn')||event.target.classList.contains('fas')) {
    const productItem = event.target.closest('.product-cart-btn');
    const productId = productItem.dataset.id;
    const product = await getProduct(parseInt(productId));
    addToCart(product);
  }
});
} 



//--------

// Increase quantity of product in cart
function increaseQuantity(productId) {
  const cartItem = cart.find(item => item.id === productId);
  if (cartItem) {
    cartItem.quantity++;
    saveCart();
    updateCart();
  }
}

// Decrease quantity of product in cart
function decreaseQuantity(productId) {
  const cartItem = cart.find(item => item.id === productId);
  if (cartItem) {
    if (cartItem.quantity > 1) {
      cartItem.quantity--;
      saveCart();
      updateCart();
    } else {
      // updateCart();
    }
  }
}

// Remove product from cart
function removeProduct(productId) {
  const cartItemIndex = cart.findIndex(item => item.id === productId);
  if (cartItemIndex !== -1) {
    cart.splice(cartItemIndex, 1);
    saveCart();
    updateCart();
    cartItemCount.textContent = cart.length;
  }
}

// Event listener for increase/decrease button clicks
cartItems.addEventListener('click', e => {
  if (e.target.matches('.fa-chevron-up')) {
    const productId = e.target.closest('.cart-item').dataset.id;
    increaseQuantity(parseInt(productId));
  }
  if (e.target.matches('.fa-chevron-down')) {
    const productId = e.target.closest('.cart-item').dataset.id;
    decreaseQuantity(parseInt(productId));
  }
  if (e.target.matches('.cart-item-remove-btn')) {
    const productId = e.target.closest('.cart-item').dataset.id;
    removeProduct(parseInt(productId));
  }
});

cartItemCount.textContent = cart.length;

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
  const currentPage = window.location.pathname;
  if (currentPage === '/online-store/index.html' || currentPage === '/') {
    // загружаем данные корзины на главной странице
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCart();
    cartItemCount.textContent = cart.length;
  } else if (currentPage === '/online-store/products.html') {
    // загружаем данные корзины на странице продуктов
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    updateCart();
    cartItemCount.textContent = cart.length;
    displayProducts();
  } else if (currentPage === '/online-store/about.html') {
    // загружаем данные корзины на странице "О нас"
    cartItemCount.textContent = JSON.parse(localStorage.getItem('cart'))?.length || 0;
  }
}

loadCart();
