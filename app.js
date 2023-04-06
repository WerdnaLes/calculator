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

let isOperation = false;
let sum = [];
let lastNumber = 0;

const isOrangeBtn = /[÷×\-\+\=]/;
const isGreyBtn = /[%x²C]$/;

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
    if (isOrangeBtn.test(btn.textContent)) {
      btn.classList.add("orange-buttons");
    }
    if (isGreyBtn.test(btn.textContent)) {
      btn.classList.add("grey-buttons");
    }
    btn.addEventListener("click", addClicked);
    btn.addEventListener("transitionend", removeClocked);
  });
}

function addClicked(e) {
  this.classList.add("clicked");
  updateInput(e.target);
}

function removeClocked(e) {
  if (e.propertyName !== "transform") {
    return;
  }
  this.classList.remove("clicked");
}

function updateInput(e) {
  const buttonText = e.textContent;
  if (input.textContent === "0") input.textContent = "";
  if (buttonText.match(/[0-9]/)) {
    if (input.textContent === lastNumber) {
      input.textContent = "";
    }
    // operations.textContent = "";
    input.textContent += buttonText;
    isOperation = false;
  }

  if (buttonText.match(isOrangeBtn)) {
    if (!isOperation) {
      lastNumber = +input.textContent;
      sum.push(lastNumber);
      if (buttonText === "+") {
        input.textContent = add(sum);
        lastNumber = input.textContent;
      }
      if (buttonText === "-") {
      }
      isOperation = true;
    }
    operations.textContent = `${lastNumber} ${buttonText}`;
  }
}

function add(args) {
  let sum = 0;
  args.forEach((el) => (sum += el));
  return sum;
}

function subtract(args) {
  
}

window.onload = () => {
  initButtons();
};
