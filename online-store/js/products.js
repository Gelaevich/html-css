import { addToCart, updateCart } from './cart.js';

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


export { getProducts, getProduct, displayProducts, productsContainer };