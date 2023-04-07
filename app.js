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
const buttonsContainer = document.querySelector(".buttons-container");
const input = document.querySelector("#input");
const operations = document.querySelector("#operations");
const clearBtn = document.querySelector("#clear");
const removeBtn = document.querySelector("#delete");

let shouldResetScreen = false;
let currentOperation = null;
let firstOperand = "";
let secondOperand = "";
let resetOperations = false;
let wasEqual = false;

const isOrangeBtn = /[÷×\-\+\=]/;
const isGreyBtn = /[%x²C]$/;
const isNumberBtn = /[0-9]$/;
const isOperationButton = /[÷×\-\+\%]$/;

function initButtons() {
  for (let i = 0; i < numbers.length; i++) {
    const newBtn = document.createElement("button");
    if (numbers[i].match(isOperationButton)) {
      newBtn.classList.add("operator-button");
    } else if (numbers[i].match(isNumberBtn)) {
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

  clearBtn.addEventListener("click", clear);
  removeBtn.addEventListener("click", removeNumber);
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
    if (input.textContent === "0" || shouldResetScreen || wasEqual) {
      resetScreen();
    }
    if (input.textContent.length < 14) {
      input.textContent += buttonText;
    }
  }

  if (buttonText.match(isOperationButton)) {
    wasEqual = false;
    if (currentOperation !== null) evaluate(buttonText);
    firstOperand = input.textContent;
    currentOperation = buttonText;
    operations.textContent = `${firstOperand} ${currentOperation}`;
    shouldResetScreen = true;
  }

  // Special buttons:
  if (buttonText === "x²") {
    square(input.textContent);
  }

  if (buttonText === "=") {
    evaluate(buttonText);
  }

  if (buttonText === "C") {
    input.textContent = "0";
  }

  if (buttonText === "±") {
    if (input.textContent !== "0") {
      input.textContent = -input.textContent;
    }
  }

  if (buttonText === ".") {
    input.textContent += ".";
  }
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function square(a) {
  operations.textContent = `${a}² =`;
  input.textContent = roundResult(a * a);
}

function remainder(a, b) {
  return a % b;
}

function resetScreen() {
  input.textContent = "";
  shouldResetScreen = false;
  if (wasEqual) {
    operations.textContent = "";
    wasEqual = false;
  }
}

function evaluate(button) {
  if (currentOperation === null || shouldResetScreen) return;
  if (currentOperation === "÷" && input.textContent === "0") {
    alert("you can't divide by 0!");
    return;
  }
  secondOperand = input.textContent;
  input.textContent = roundResult(
    operate(currentOperation, firstOperand, secondOperand)
  );
  if (button === "=") {
    wasEqual = true;
    operations.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
  }
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
    case "×":
      return multiply(a, b);
    case "÷":
      return divide(a, b);
    case "%":
      return remainder(a, b);
    default:
      return null;
  }
}

function removeNumber() {
  const main = input.textContent;
  if (main.length > 1 && main !== "0") {
    input.textContent = main.substring(0, main.length - 1);
  } else {
    input.textContent = "0";
  }
}

function clear() {
  input.textContent = "0";
  operations.textContent = "";
  currentOperation = null;
  firstOperand = "";
  secondOperand = "";
  wasEqual = false;
}

window.onload = () => {
  initButtons();
};
