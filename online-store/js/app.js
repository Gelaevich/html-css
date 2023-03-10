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

rangeInput.addEventListener('input', function() {
  output.textContent = `Value : $${rangeInput.value}`
})

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

// Display products based on filter criteria
async function displayProducts() {
  const products = await getProducts();
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
        <img src="${product['img-url']}" class="product-img img" alt="${product.name}" />

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
}

// Event listeners for filter criteria
searchInput.addEventListener('input', displayProducts);

companyBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    companyBtns.forEach(otherBtn => otherBtn.classList.remove('active'));
    btn.classList.add('active');
    displayProducts();
  });
});

priceFilter.addEventListener('input', () => {
  priceValue.textContent = `Value: $${priceFilter.value}`;
  displayProducts();
});

// Initial display of products
displayProducts();

// ------------------

const cartItems = document.querySelector('.cart-items');
const cartTotal = document.querySelector('.cart-total');
const cartCheckoutBtn = document.querySelector('.cart-checkout');
const cartItemCount = document.querySelector('.cart-item-count');
let cart = [];

// Add product to cart
function addToCart(product) {
  // Check if product already exists in cart
  const existingItem = cart.find(item => item.id === product.id);

  if (existingItem) {
    // If the product already exists, increase the quantity
    existingItem.quantity++;
    console.log(1)
  } else {
    // If it's a new product, add it to the cart
    cart.push({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    });
    console.log(2)
  }
  
  // Update cart content and total
  updateCart();
  cartItemCount.textContent = cart.length;
  console.log(3)
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

  // Update total price
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);
  cartTotal.textContent = 'Total: $' + totalPrice.toFixed(2);
}

// Listen for click events on add to cart buttons

productsContainer.addEventListener('click', event => {
  console.log('Product button clicked')
  if (event.target.classList.contains('product-cart-btn')) {
    console.log('Add to cart button clicked')
    const productItem = event.target.closest('.product');
    const productId = productItem.dataset.id;
    const product = getProducts().find(product => product.id === productId);
    addToCart(product);
  }
});
