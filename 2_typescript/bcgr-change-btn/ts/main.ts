setInterval(function () {
  (firstNum = Math.floor(Math.random() * 256)),
    (secondNum = Math.floor(Math.random() * 256)),
    (thirdNum = Math.floor(Math.random() * 256));
}, 300);

let firstNum: number, secondNum: number, thirdNum: number;
let wrapper = document.getElementById("wrapper") as HTMLElement;
let currentColor = document.getElementById("currColor") as HTMLElement;

function dataOutput() {
  (wrapper.style.backgroundColor = `rgb(${firstNum}, ${secondNum}, ${thirdNum})`),
    (currentColor.textContent = `rgb (${firstNum}, ${secondNum}, ${thirdNum})`);
}
