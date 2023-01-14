var firstNum, secondNum, thirdNum;
var wrapper = document.getElementById("wrapper");
var currentColor = document.getElementById("currColor");
var btn = document.getElementById("btn");
btn.addEventListener("click", dataOutput);
function dataOutput() {
  (firstNum = Math.floor(Math.random() * 256)),
    (secondNum = Math.floor(Math.random() * 256)),
    (thirdNum = Math.floor(Math.random() * 256)),
    (wrapper.style.backgroundColor = "rgb("
      .concat(firstNum, ", ")
      .concat(secondNum, ", ")
      .concat(thirdNum, ")")),
    (currentColor.textContent = "rgb ("
      .concat(firstNum, ", ")
      .concat(secondNum, ", ")
      .concat(thirdNum, ")"));
}

//# sourceMappingURL=main.js.map
