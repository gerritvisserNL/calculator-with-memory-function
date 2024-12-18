let currentInput = ""; // input of the user
const display = document.getElementById("display");

// Update display with current input
const updateDisplay = () => {
  display.value = currentInput || "0";
};

// Save the current display value to localStorage
const saveToLocalStorage = () => {
  const displayValue = display.value;
  localStorage.setItem("calculatorDisplay", displayValue);
};

// Load the stored value from localStorage into the display
const loadFromLocalStorage = () => {
  const savedValue = localStorage.getItem("calculatorDisplay");
  currentInput = savedValue || ""; // Default to empty if nothing is stored
};

// Clear the value stored in localStorage
const clearLocalStorage = () => {
  localStorage.removeItem("calculatorDisplay");
  currentInput = "";
};

// Process the entered mathematical expression
const processInput = (value) => {
  switch (value) {
    case "C":
      currentInput = ""; // Clear the input
      break;

    case "MS":
      saveToLocalStorage(); // Save to memory
      break;

    case "MR":
      loadFromLocalStorage(); // Load from memory
      break;

    case "MC":
      clearLocalStorage(); // Clear memory
      break;

    case "=":
      try {
        // Replace unsafe characters and calculate the outcome
        const safeInput = currentInput
          .replace(/x/g, "*") // Replace 'x' with '*' for multiplication
          .replace(/÷/g, "/") // Replace '÷' with '/' for division
          .replace(/[^0-9+\-*/().]/g, ""); // Remove invalid characters

        // Safe calculation using math.js
        currentInput = math.evaluate(safeInput).toString(); // Use math.js to evaluate the expression
      } catch (e) {
        currentInput = "error";
      }
      break;

    default:
      // Append the button value to the current input
      currentInput += value;
  }
  updateDisplay();
};

// Add event listeners to buttons
document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", () => {
    processInput(button.getAttribute("data-value"));
  });
});

// Update display on page load
updateDisplay();
