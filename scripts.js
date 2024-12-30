
const textarea = document.getElementById('display');

textarea.addEventListener('input', () => {
    textarea.value = textarea.value.replace(/[a-zA-Z]/g, '');
});


let result = "";
let display = document.getElementById('display');
let history = document.getElementById('history');
let historyList = [];
let isResultDisplayed = false;
let isDegreeMode = true; 
let isScientificMode = false; 
let memory = 0;

// appendFunction
function appendFunction(value) {
    if (result === "") {
        display.value += value;
    } else {
        display.value = value;
        result = "";
    }
}
//clear
function clearDisplay() {
    display.value = '';
}

//backspace
function backspace() {
    display.value = display.value.slice(0, -1);
}

//DEG
function toggleDegreeMode() {
    isDegreeMode = !isDegreeMode;
    alert(isDegreeMode ? 'Degree mode activated' : 'Radian mode activated');
}

//F-E
function toggleScientificMode() {
    isScientificMode = !isScientificMode;
    alert(isScientificMode ? 'Scientific notation activated' : 'Fixed-point notation activated');
}

function updateHistory() {
    history.innerHTML = ''; 
    historyList.slice(0, 5).forEach((record, index) => {
        let historyItem = document.createElement('li');
        historyItem.textContent = `${index + 1}: ${record}`;
        history.appendChild(historyItem);
    });
}


function calculate() {
    try {
        result = math.evaluate(display.value);
        
        historyList.unshift(display.value + ' = ' + result);
        if (historyList.length > 5) {
            historyList.pop(); 
        }
        history.value = historyList.join('\n');
        display.value = result; 
    } catch (error) {
        display.value = 'Invalid';
    }
}

document.addEventListener('keydown', function (e) {
    if (e.key === "=" || e.key === "Enter") {
        e.preventDefault(); 
        console.log(e);
        calculate();
    }
});

// Memory functions
function memoryClear() {
    memory = 0;
    alert('Memory cleared');
}

function memoryRecall() {
    display.value = memory;
    isResultDisplayed = true;
}

function memoryAdd() {
    let currentValue = parseFloat(display.value) || 0;
    memory += currentValue; 
    alert(`Added to memory: ${currentValue}`);
}

function memorySubtract() {
    let currentValue = parseFloat(display.value) || 0;
    memory -= currentValue; 
    alert(`Subtracted from memory: ${currentValue}`);
}

function memoryStore() {
    memory = parseFloat(display.value) || 0; 
    alert(`Memory stored: ${memory}`);
}

// Event listener for keypress
document.addEventListener('keydown', function (e) {
    if (e.key === "=" || e.key === "Enter") { 
        calculate();
    } else if (e.key === "m" || e.key === "M") { //  recall on 'M' key
        memoryRecall();
    } else if (e.key === "s" || e.key === "S") { //  store on 'S' key
        memoryStore();
    } else if (e.key === "a" || e.key === "A") { //  add on 'A' key
        memoryAdd();
    } else if (e.key === "d" || e.key === "D") { //  subtract on 'D' key
        memorySubtract();
    }
});

