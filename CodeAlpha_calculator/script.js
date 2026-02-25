const screen = document.getElementById("screen");


function appendValue(value) {
  if (screen.value === "Error") {
    screen.value = "";
  }

  const operators = ["+", "-", "*", "/", "%"];

  const lastChar = screen.value.slice(-1);

  
  if (operators.includes(value) && operators.includes(lastChar)) {
    return;
  }

  
  if (screen.value === "" && operators.includes(value) && value !== "-") {
    return;
  }

  screen.value += value;
}

function clearScreen() {
  screen.value = "";
}


function deleteLast() {
  if (screen.value === "Error") {
    screen.value = "";
    return;
  }

  screen.value = screen.value.slice(0, -1);
}

function calculate() {
  try {
    if (screen.value.trim() === "") return;

    
    const result = eval(screen.value);
    screen.value = Number.isFinite(result) ? result : "Error";
  } catch {
    screen.value = "Error";
  }
}


document.addEventListener("keydown", function (e) {
  const key = e.key;

  if (!isNaN(key) || ["+", "-", "*", "/", "%", "."].includes(key)) {
    appendValue(key);
  }

  if (key === "Enter") {
    e.preventDefault();
    calculate();
  }

  if (key === "Backspace") {
    deleteLast();
  }

  if (key === "Escape") {
    clearScreen();
  }
});