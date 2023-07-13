//document.getElementById("licz").innerText = 9;
let wasTheDotUsed = false;
let isOperationSelected = false;
let isEqDone = false;
const currentScreen = document.querySelector("#screen");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const buttons = document.querySelectorAll(".button");
const del = document.querySelector("#del");
const clear = document.querySelector("#clear");
const equal = document.querySelector("#equal");
const calculator = document.querySelector(".calculator");

del.addEventListener("click", () => {
  let currentLine = currentScreen.textContent.toString();
  if (currentLine.length === 0) return;
  if (currentLine.slice(-1) === " ") return;
  if (currentLine.slice(-1) === ".") {
    wasTheDotUsed = false;
  }
  currentScreen.textContent = currentLine.slice(0, -1);
});

function clearScreen() {
  wasTheDotUsed = false;
  isOperationSelected = false;
  currentScreen.textContent = "";
}

function appendNumber(num) {
  let curentNum = currentScreen.textContent.toString();

  if (
    num === "." &&
    (wasTheDotUsed === true ||
      curentNum.slice(-1) === "." ||
      curentNum.length === 0 ||
      curentNum.slice(-1) === " ")
  ) {
    return;
  }
  if (num === ".") wasTheDotUsed = true;
  let appendedNum = curentNum + num;
  currentScreen.textContent = appendedNum;
}

function sum() {
  let currentEq = currentScreen.textContent.toString();
  if (currentEq.split(" ").length < 3) {
    return;
  }
  let answer = eval(currentEq);
  wasTheDotUsed = false;
  isOperationSelected = false;

  return answer;
}

numbers.forEach((num) => {
  num.addEventListener("click", () => {
    appendNumber(num.textContent.toString());
  });
});

clear.addEventListener("click", () => {
  clearScreen();
});

equal.addEventListener("click", () => {
  let answer = sum();
  if (answer === undefined) {
    return;
  }
  let visibleAnswer = `= ${answer}`;
  currentScreen.textContent = visibleAnswer;
  setTimeout(() => {
    calculator.addEventListener(
      "click",
      () => {
        clearScreen();
      },
      { once: true }
    );
  }, 0);
});

operators.forEach((operator) => {
  operator.addEventListener("click", () => {
    let currentLine = currentScreen.textContent.toString();
    if (currentLine.split(" ").length === 3) {
      currentLine = sum();
    }
    if (currentLine === "" || isOperationSelected === true) {
      return;
    }
    let updatedLine = `${currentLine} ${operator.textContent} `;
    isOperationSelected = true;
    wasTheDotUsed = false;
    currentScreen.textContent = updatedLine;
  });
});
