import { getProducts, getProduct } from './products.js';
import { addToCart, updateCart } from './cart.js';


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

export { burgerBtn, menu, burgerCloseBtn, cartBtn, cartOverlay, cartClose };
