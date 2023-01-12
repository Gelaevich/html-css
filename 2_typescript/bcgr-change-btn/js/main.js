"use strict";
setInterval(function () {
    (firstNum = Math.floor(Math.random() * 256)),
        (secondNum = Math.floor(Math.random() * 256)),
        (thirdNum = Math.floor(Math.random() * 256));
}, 300);
let firstNum, secondNum, thirdNum;
let wrapper = document.getElementById("wrapper");
let currentColor = document.getElementById("currColor");
function dataOutput() {
    (wrapper.style.backgroundColor = `rgb(${firstNum}, ${secondNum}, ${thirdNum})`),
        (currentColor.textContent = `rgb (${firstNum}, ${secondNum}, ${thirdNum})`);
}
//# sourceMappingURL=main.js.map