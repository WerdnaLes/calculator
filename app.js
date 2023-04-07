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
const operation = document.querySelector("#operations");
const clearBtn = document.querySelector("#clear");
const removeBtn = document.querySelector("#delete");

let shouldResetScreen = false;
let currentOperation = null;
let firstOperand = "";
let secondOperand = "";
let resetOperations = false;
let wasEqual = false;

const btnMakeOrangeReg = /[÷×\-\+\=]/;
const btnMakeGreyReg = /[%x²C]$/;
const isNumberBtn = /^[0-9]$/;
const isOperationButton = /[÷×\-\+\%]$/;
const keyOperationButtons = /^[%\/*\-\+\=]$/;

function initButtons() {
  for (let i = 0; i < numbers.length; i++) {
    const newBtn = document.createElement("button");
    newBtn.innerHTML = `<span class="dim">${numbers[i]}</span>`;
    buttonsContainer.appendChild(newBtn);
  }
  addButtonsListeners();
}

function addButtonsListeners() {
  const button = document.querySelectorAll("button");
  button.forEach((btn) => {
    if (btnMakeOrangeReg.test(btn.textContent)) {
      btn.classList.add("orange-buttons");
    }
    if (btnMakeGreyReg.test(btn.textContent)) {
      btn.classList.add("grey-buttons");
    }
    btn.addEventListener("click", addClicked);
    btn.addEventListener("transitionend", removeClicked);
  });

  clearBtn.addEventListener("click", clearAll);
  removeBtn.addEventListener("click", removeNumber);

  window.addEventListener("keydown", handleKeyListener);
}

// Add scaling animation when clicked:
function addClicked(e) {
  this.classList.add("clicked");
  updateInput(e.target);
}

// Remove scaling animation when clicked:
function removeClicked(e) {
  if (e.propertyName !== "transform") {
    return;
  }
  this.classList.remove("clicked");
}

function updateInput(e) {
  const buttonText = typeof e === "object" ? e.textContent : e;
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
    operation.textContent = `${firstOperand} ${currentOperation}`;
    shouldResetScreen = true;
  }

  // Special buttons:
  if (buttonText === "x²") square(input.textContent);
  if (buttonText === "=") evaluate(buttonText);
  if (buttonText === "C") resetInput();
  if (buttonText === "±") toggleNegative();
  if (buttonText === ".") appendPoint();
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
  operation.textContent = `${a}² =`;
  input.textContent = roundResult(a * a);
}

function remainder(a, b) {
  return a % b;
}

function resetScreen() {
  input.textContent = "";
  shouldResetScreen = false;
  if (wasEqual) {
    // Reset input if click number after pressing 'equals'
    operation.textContent = "";
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
    wasEqual = true; // Reset input if click number after pressing 'equals'
    operation.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
  }
  currentOperation = null;
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}

// Make mathematical equasions when there are two operands:
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

// Remove a single number from input
function removeNumber() {
  const main = input.textContent;
  if (main.length > 1 && main !== "0") {
    input.textContent = main.substring(0, main.length - 1);
  } else {
    input.textContent = "0";
  }
}

function clearAll() {
  input.textContent = "0";
  operation.textContent = "";
  currentOperation = null;
  firstOperand = "";
  secondOperand = "";
  wasEqual = false;
}

// Handle keyboard input:
function handleKeyListener(element) {
  element.preventDefault(); // Remove 'Enter' bug, when it 'clicks' the last clicked button
  const keyPressed = element.key;
  if (keyPressed === "s") {
    updateInput("x²");
  }
  if (keyPressed.match(isNumberBtn)) {
    updateInput(keyPressed);
  }
  if (keyPressed.match(keyOperationButtons)) {
    updateInput(convertOperator(keyPressed));
  }
  if (keyPressed === "Enter") {
    updateInput("=");
  }
  if (keyPressed === "Backspace") removeNumber();
  if (keyPressed === "Escape") clearAll();
  if (keyPressed === "c") resetInput();
  if (keyPressed === "n") toggleNegative();
  if (keyPressed === ".") appendPoint();
}

function convertOperator(keyboardOperator) {
  if (keyboardOperator === "/") return "÷";
  if (keyboardOperator === "*") return "×";
  if (keyboardOperator === "-") return "-";
  return keyboardOperator;
}

function resetInput() {
  input.textContent = "0";
}

// Toggle negative or positive input number:
function toggleNegative() {
  if (input.textContent !== "0") {
    input.textContent = -input.textContent;
  }
}

function appendPoint() {
  if (input.textContent.indexOf(".") < 0) {
    input.textContent += ".";
  }
}

window.onload = () => {
  initButtons();
};
