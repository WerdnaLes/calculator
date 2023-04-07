const buttonsContainer = document.querySelector(".buttons-container");
const input = document.querySelector("#input");
const operations = document.querySelector("#operations");
const numbers = [
  "%",
  "x²",
  "C",
  "÷",
  "7",
  "8",
  "9",
  "×",
  "4",
  "5",
  "6",
  "-",
  "1",
  "2",
  "3",
  "+",
  "±",
  "0",
  ".",
  "=",
];

let shouldResetScreen = false;
let currentOperation = null;
let firstOperand = "";
let secondOperand = "";

const isOrangeBtn = /[÷×\-\+\=]/;
const isGreyBtn = /[%x²C]$/;
const isNumberBtn = /[0-9]/;
const isOperationButton = /[÷×\-\+\=%x²C]$/;

function initButtons() {
  for (let i = 0; i < numbers.length; i++) {
    const newBtn = document.createElement("button");
    if (numbers[i].match(/[÷×\-\+\=%x²C]$/)) {
      newBtn.classList.add("operator-button");
    } else if (numbers[i].match(/[0-9]$/)) {
      newBtn.classList.add("number-button");
    }
    newBtn.innerHTML = `<span class="dim">${numbers[i]}</span>`;
    buttonsContainer.appendChild(newBtn);
  }
  addButtonsListeners();
}

function addButtonsListeners() {
  const button = document.querySelectorAll("button");
  button.forEach((btn) => {
    if (isOrangeBtn.test(btn.textContent)) {
      btn.classList.add("orange-buttons");
    }
    if (isGreyBtn.test(btn.textContent)) {
      btn.classList.add("grey-buttons");
    }
    btn.addEventListener("click", addClicked);
    btn.addEventListener("transitionend", removeClicked);
  });
}

function addClicked(e) {
  this.classList.add("clicked");
  updateInput(e.target);
}

function removeClicked(e) {
  if (e.propertyName !== "transform") {
    return;
  }
  this.classList.remove("clicked");
}

function updateInput(e) {
  const buttonText = e.textContent;
  if (buttonText.match(isNumberBtn)) {
    if (input.textContent === "0" || shouldResetScreen) {
      resetScreen();
    }
    // operations.textContent = "";
    if (input.textContent.length < 14) {
      input.textContent += buttonText;
    }
  }

  if (buttonText.match(isOperationButton)) {
    if (currentOperation !== null) evaluate();
    firstOperand = input.textContent;
    currentOperation = buttonText;
    operations.textContent = `${firstOperand} ${currentOperation}`;
    shouldResetScreen = true;
  }
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function resetScreen() {
  input.textContent = "";
  shouldResetScreen = false;
}

function evaluate() {
  if (currentOperation === null || shouldResetScreen) return;
  if (currentOperation === "÷" && input.textContent === "0") {
    alert("you can't divide by 0!");
    return;
  }
  secondOperand = input.textContent;
  input.textContent = roundResult(
    operate(currentOperation, firstOperand, secondOperand)
  );
  operations.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
  currentOperation = null;
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    default:
      return null;
  }
}

window.onload = () => {
  initButtons();
};
