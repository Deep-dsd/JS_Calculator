const displayEl = document.querySelector("h1");
const inputBtnsEl = document.querySelectorAll("button");
const clearBtnEl = document.querySelector("#clear-btn");

let displayValue = 0;
let firstValue = 0;
let secondValue = 0;
let operatorValue = "";
let operatorDisplayValue = "";
let awaitingNextValue = false;
let calculating = false;

const calculate = {
  "/": (firstNumber, secondNumber) => firstNumber / secondNumber,
  "*": (firstNumber, secondNumber) => firstNumber * secondNumber,
  "+": (firstNumber, secondNumber) => firstNumber + secondNumber,
  "-": (firstNumber, secondNumber) => firstNumber - secondNumber,
  "=": (firstNumber, secondNumber) => secondNumber,
};

const sendNumberValue = (number) => {
  if (operatorValue === "*") {
    operatorDisplayValue = "×";
  } else if (operatorValue === "/") {
    operatorDisplayValue = "÷";
  } else if (operatorValue === "+") {
    operatorDisplayValue = "+";
  } else if (operatorValue === "+") {
    operatorDisplayValue = "+";
  } else if (operatorValue === "-") {
    operatorDisplayValue = "-";
  }
  if (awaitingNextValue) {
    secondValue = number;
    console.log("secondValue:", secondValue);
    displayEl.textContent = firstValue + operatorDisplayValue + secondValue;
    awaitingNextValue = false;
    calculating = true;
  } else {
    if (secondValue) {
      secondValue += number;
      displayEl.textContent = firstValue + operatorDisplayValue + secondValue;
      console.log("secondValue:", secondValue);
      return;
    }
    displayEl.textContent === "0"
      ? (displayEl.textContent = number)
      : (displayEl.textContent += number);
  }
};

const sendTheOperator = (operator) => {
  const currentValue = Number(displayEl.textContent);

  if (operatorValue && awaitingNextValue) {
    operatorValue = operator;
    return;
  }

  if (!firstValue) {
    firstValue = currentValue;
  }
  awaitingNextValue = true;
  operatorValue = operator;
};

const decimalHandler = () => {
  if (awaitingNextValue) {
    return;
  }
  if (secondValue) {
    secondValue += ".";
  }
  if (!displayEl.textContent.includes(".")) {
    displayEl.textContent += ".";
    return;
  }

  console.log(secondValue);
};

const calculationHandler = () => {
  if (calculating) {
    const calculation = calculate[operatorValue](
      firstValue,
      Number(secondValue)
    );
    displayEl.textContent = calculation;
    firstValue = calculation;
    console.log("secondValue:", secondValue, "firstValue:", firstValue);
    calculating = false;
  }
};

//Event Listners
inputBtnsEl.forEach((inputBtn) => {
  if (inputBtn.classList.contains("operator")) {
    inputBtn.addEventListener("click", () => sendTheOperator(inputBtn.value));
  } else if (inputBtn.classList.length === 0) {
    inputBtn.addEventListener("click", () => sendNumberValue(inputBtn.value));
  } else if (inputBtn.classList.contains("decimal")) {
    inputBtn.addEventListener("click", () => decimalHandler());
  } else if (inputBtn.classList.contains("equal-sign")) {
    inputBtn.addEventListener("click", () => calculationHandler());
  }
});

clearBtnEl.addEventListener("click", () => {
  displayEl.textContent = 0;
  firstValue = 0;
  secondValue = 0;
  operatorValue = "";
  awaitingNextValue = false;
});

//On Load
displayEl.textContent = displayValue;
