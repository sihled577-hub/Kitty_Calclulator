const screen = document.getElementById("screen");
const buttons = document.querySelectorAll(".btn");

let currentInput = "0";

function updateScreen() {
  screen.value = currentInput;
}

function appendValue(value) {
  if (currentInput === "0" && value !== ".") {
    currentInput = value;
  } else {
    currentInput += value;
  }
}

function clearScreen() {
  currentInput = "0";
}

function deleteLast() {
  if (currentInput.length === 1) {
    currentInput = "0";
  } else {
    currentInput = currentInput.slice(0, -1);
  }
}

function calculate() {
  try {
    const expression = currentInput.replace(/%/g, "/100");
    const result = eval(expression);

    if (result === undefined || Number.isNaN(result)) {
      currentInput = "Error";
      return;
    }

    currentInput = String(result);
  } catch {
    currentInput = "Error";
  }
}

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    const value = button.dataset.value;
    const action = button.dataset.action;

    if (action === "clear") {
      clearScreen();
      updateScreen();
      return;
    }

    if (action === "delete") {
      deleteLast();
      updateScreen();
      return;
    }

    if (action === "equals") {
      calculate();
      updateScreen();
      return;
    }

    if (currentInput === "Error") {
      currentInput = "0";
    }

    appendValue(value);
    updateScreen();
  });
});

document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (!isNaN(key) || ["+", "-", "*", "/", "."].includes(key)) {
    if (currentInput === "Error") currentInput = "0";
    appendValue(key);
    updateScreen();
  }

  if (key === "Enter" || key === "=") {
    calculate();
    updateScreen();
  }

  if (key === "Backspace") {
    deleteLast();
    updateScreen();
  }

  if (key.toLowerCase() === "c") {
    clearScreen();
    updateScreen();
  }

  if (key === "%") {
    appendValue("%");
    updateScreen();
  }
});