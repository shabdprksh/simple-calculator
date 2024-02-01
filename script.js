// Get reference to display element
const display = document.getElementById('display');
let cursorPosition = 0;
let operatorClicked = false;

// Function to handle button click for numbers
function addToDisplay(value) {
  // Limit number input to 7 digits
  if (display.textContent.length < 7) {
    // Insert the value at the current cursor position
    const beforeCursor = display.textContent.slice(0, cursorPosition);
    const afterCursor = display.textContent.slice(cursorPosition);
    display.textContent = beforeCursor + value + afterCursor;
    cursorPosition++; // Move the cursor position forward
  }
}

// Function to handle operator button click
function addOperator(operator) {
  // Replace the previous operator if one is already clicked
  if (operatorClicked) {
    const currentDisplay = display.textContent;
    display.textContent = currentDisplay.substring(0, currentDisplay.length - 1) + operator;
  } else {
    display.textContent += operator;
    operatorClicked = true; // Set the flag to true
    cursorPosition++; // Move the cursor position forward
  }
}

// Function to handle backspace operation
function backspace() {
  // Remove the character before the cursor position
  if (cursorPosition > 0) {
    const beforeCursor = display.textContent.slice(0, cursorPosition - 1);
    const afterCursor = display.textContent.slice(cursorPosition);
    display.textContent = beforeCursor + afterCursor;
    cursorPosition--; // Move the cursor position backward
  }
  operatorClicked = false; // Reset the flag when backspacing
}

// Function to calculate and show result when the equal button is clicked
function calculate() {
  try {
    // Evaluate the expression in the display
    const result = eval(display.textContent);
    // Display the result
    display.textContent = result;
    operatorClicked = false; // Reset the flag after calculation
  } catch (error) {
    // Handle errors, such as division by zero
    display.textContent = 'Error';
  }
}

// Function to clear the display
function clearDisplay() {
  display.textContent = '';
  cursorPosition = 0; // Reset the cursor position when clearing the display
  operatorClicked = false; // Reset the flag when clearing the display
}

// Get reference to all buttons
const buttons = document.querySelectorAll('.buttons');

// Loop through each button and add event listener
buttons.forEach(button => {
  button.addEventListener('click', () => {
    // Check if button is a number button
    if (!isNaN(button.textContent)) {
      addToDisplay(button.textContent);
    } else if (button.textContent === '=') {
      calculate();
    } else if (button.textContent === 'AC') {
      clearDisplay();
    } else if (button.textContent === 'X') {
      backspace();
    } else {
      // If the button is an operator, call addOperator function
      addOperator(button.textContent);
    }
  });
});

// Add event listener for clicks on the display to set the cursor position
display.addEventListener('click', (event) => {
  // Calculate cursor position based on click event
  const clickPosition = event.clientX;
  const displayPosition = display.getBoundingClientRect().left;
  const characterWidth = display.offsetWidth / display.textContent.length;
  cursorPosition = Math.floor((clickPosition - displayPosition) / characterWidth);
});
