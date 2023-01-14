let firstNum: number, secondNum: number, thirdNum: number;
let wrapper = document.getElementById("wrapper") as HTMLElement;
let currentColor = document.getElementById("currColor") as HTMLElement;
let btn = document.getElementById("btn") as HTMLElement;
btn.addEventListener("click", dataOutput);

function dataOutput(): void {
  (firstNum = Math.floor(Math.random() * 256)),
    (secondNum = Math.floor(Math.random() * 256)),
    (thirdNum = Math.floor(Math.random() * 256)),
    (wrapper.style.backgroundColor = `rgb(${firstNum}, ${secondNum}, ${thirdNum})`),
    (currentColor.textContent = `rgb (${firstNum}, ${secondNum}, ${thirdNum})`);
}
