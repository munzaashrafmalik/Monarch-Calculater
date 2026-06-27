const display = document.getElementById('display');
const historyDisplay = document.getElementById('history');
const historyList = document.getElementById('history-list');
const historyPanel = document.getElementById('history-panel');

function toggleTheme() {
    document.body.dataset.theme = document.body.dataset.theme === 'light' ? 'dark' : 'light';
}

function toggleHistory() {
    historyPanel.style.display = historyPanel.style.display === 'block' ? 'none' : 'block';
}

function clearHistory() {
    historyList.innerHTML = "";
}

function appendToDisplay(input) {
    display.value += input;
}

function clearDisplay() {
    display.value = "";
    historyDisplay.innerText = "";
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    try {
        const expression = display.value;
        // Basic safety check: check if expression is valid math
        if (!expression) return;
        
        // Evaluate safely
        const result = eval(expression);
        
        if (result === undefined || result === null || !isFinite(result)) {
            throw new Error("Invalid");
        }
        
        display.value = result;
    } catch (error) {
        display.value = "Error";
        setTimeout(() => { display.value = ""; }, 1500);
    }
}

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (/[0-9+\-*/.]/.test(key)) appendToDisplay(key);
    else if (key === 'Enter') calculate();
    else if (key === 'Backspace') deleteLast();
    else if (key === 'Escape') clearDisplay();
});
