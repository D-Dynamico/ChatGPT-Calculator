const display = document.getElementById('display');

function clearDisplay() {
    display.textContent = '0';
}

function appendNumber(number) {
    const current = display.textContent;
    const lastChar = current.slice(-1);

    // Prevent adding multiple decimals in the current number
    const lastNumber = current.split(/[\+\-\*\/]/).pop();
    if (number === '.' && lastNumber.includes('.')) return;

    // If the display is "0", replace it unless the input is "."
    if (current === '0' && number !== '.') {
        display.textContent = number;
    } else {
        display.textContent += number;
    }
}

function appendOperator(operator) {
    const current = display.textContent;
    const lastChar = current.slice(-1);

    // Prevent multiple consecutive operators
    if (!['+', '-', '*', '/'].includes(lastChar)) {
        display.textContent += operator;
    }
}

function calculateResult() {
    try {
        // Sanitize the input expression and evaluate it
        const sanitizedExpression = display.textContent.replace(/[^0-9\+\-\*\/\.]/g, '');
        const result = eval(sanitizedExpression);

        // Format result to avoid floating-point issues
        display.textContent = Number(result.toFixed(10)).toString();
    } catch (e) {
        display.textContent = 'Error';
    }
}

function deleteLast() {
    const current = display.textContent;
    display.textContent = current.length > 1 ? current.slice(0, -1) : '0';
}

function toggleSign() {
    const current = display.textContent;

    // Find the last number in the expression
    const numbers = current.split(/([\+\-\*\/])/);
    const lastNumber = numbers.pop();

    // Toggle the sign of the last number
    const toggledNumber = lastNumber.startsWith('-')
        ? lastNumber.slice(1)
        : '-' + lastNumber;

    // Rebuild the expression with the toggled number
    display.textContent = numbers.join('') + toggledNumber;
}

function percent() {
    const current = display.textContent;

    // Find the last number in the expression
    const numbers = current.split(/([\+\-\*\/])/);
    const lastNumber = numbers.pop();

    // Convert the last number to a percentage
    const result = parseFloat(lastNumber) / 100;

    // Rebuild the expression with the percentage result
    display.textContent = numbers.join('') + Number(result.toFixed(10)).toString();
}

// Add keyboard functionality
document.addEventListener('keydown', (event) => {
    const key = event.key;

    if (!isNaN(key)) {
        // Append number (0-9)
        appendNumber(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        // Append operator
        appendOperator(key);
    } else if (key === 'Enter') {
        // Calculate result
        event.preventDefault(); // Prevent the default Enter key behavior
        calculateResult();
    } else if (key === 'Backspace') {
        // Delete last character
        deleteLast();
    } else if (key === 'Escape') {
        // Clear display
        clearDisplay();
    } else if (key === '%') {
        // Percent functionality
        percent();
    } else if (key === '.') {
        // Append decimal point
        appendNumber('.');
    }
});
