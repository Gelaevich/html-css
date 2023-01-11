function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let firstNum = getRandomInRange(0, 255);
let secondNum = getRandomInRange(0, 255);
let thirdNum = getRandomInRange(0, 255);

let wrapper = document.getElementById("wrapper");
let button = document.getElementById("btn");
let currentColor = document.getElementById("currColor");

setInterval(function () {
  firstNum = getRandomInRange(0, 255);
}, 300);

setInterval(function () {
  secondNum = getRandomInRange(0, 255);
}, 300);

setInterval(function () {
  thirdNum = getRandomInRange(0, 255);
}, 300);

function funcX() {
  (wrapper.style.backgroundColor = `rgb(${firstNum}, ${secondNum}, ${thirdNum})`),
    (currentColor.textContent = `rgb (${firstNum}, ${secondNum}, ${thirdNum})`);
}
