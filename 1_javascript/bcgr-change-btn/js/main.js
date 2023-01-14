let firstNum, secondNum, thirdNum;
let wrapper = document.getElementById("wrapper");
let currentColor = document.getElementById("currColor");
let btn = document.getElementById("btn");

btn.addEventListener("click", dataOutput);

function dataOutput() {
  (firstNum = Math.floor(Math.random() * 256)),
    (secondNum = Math.floor(Math.random() * 256)),
    (thirdNum = Math.floor(Math.random() * 256)),
    (wrapper.style.backgroundColor = `rgb(${firstNum}, ${secondNum}, ${thirdNum})`),
    (currentColor.textContent = `rgb (${firstNum}, ${secondNum}, ${thirdNum})`);
}
