const buttonsContainer = document.querySelector(".buttons-container");
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

const regex = /[÷×\-\+\=]/;
const grey = /[%x²C]$/;

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
    if (regex.test(btn.textContent)) {
      btn.classList.add("orange-buttons");
    }
    if (grey.test(btn.textContent)) {
      btn.classList.add("grey-buttons");
    }
    btn.addEventListener("click", clickBtn);
    btn.addEventListener("transitionend", remove);
  });
}

function clickBtn(e) {
  this.classList.add("clicked");
}

function remove(e) {
  if (e.propertyName !== "transform") {
    return;
  }
  this.classList.remove("clicked");
}

window.onload = () => {
  initButtons();
};
