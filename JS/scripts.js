

let result = '';
let expression = '';
let history = [];
let memory = 0;
let degreeMode = true;
let scientificMode = false;

function appendFunction(value) {
    expression += value;
    document.getElementById('display').value = expression;
}

function calculate() {
    try {
        result = calculateExpression(expression);
        document.getElementById('display').value = result;
        history.unshift(expression + ' = ' + result);
        if (history.length > 5) {
            history.pop();
        }
        document.getElementById('history').value = history.join('\n');
        expression = result.toString();
    } catch (e) {
        document.getElementById('display').value = 'Error';
        expression = '';
    }
}

// expressions
function calculateExpression(expr) {

    //trigonometric functions 
    expr = expr.replace(/asin\(([^)]+)\)/g, (_, val) => degreeMode ? radToDeg(Math.asin(parseFloat(val))) : Math.asin(parseFloat(val)));
    expr = expr.replace(/acos\(([^)]+)\)/g, (_, val) => degreeMode ? radToDeg(Math.acos(parseFloat(val))) : Math.acos(parseFloat(val)));
    expr = expr.replace(/atan\(([^)]+)\)/g, (_, val) => degreeMode ? radToDeg(Math.atan(parseFloat(val))) : Math.atan(parseFloat(val)));

    expr = expr.replace(/sin\(([^)]+)\)/g, (_, val) => degreeMode ? Math.sin(degToRad(val)) : Math.sin(val));
    expr = expr.replace(/cos\(([^)]+)\)/g, (_, val) => degreeMode ? Math.cos(degToRad(val)) : Math.cos(val));
    expr = expr.replace(/tan\(([^)]+)\)/g, (_, val) => degreeMode ? Math.tan(degToRad(val)) : Math.tan(val));

    //Additional expressions 
    expr = expr.replace(/ceil\(([^)]+)\)/g, (_, val) => Math.ceil(parseFloat(val)));
    expr = expr.replace(/exp\(([^)]+)\)/g, (_, val) => Math.exp(parseFloat(val)));
    expr = expr.replace(/pi/g, Math.PI);
    expr = expr.replace(/e/g, Math.E);

    expr = expr.replace(/abs\(([^)]+)\)/g, (_, val) => Math.abs(parseFloat(val)));
    expr = expr.replace(/sqrt\(([^)]+)\)/g, (_, val) => Math.sqrt(parseFloat(val)));
    expr = expr.replace(/log10\(([^)]+)\)/g, (_, val) => Math.log10(parseFloat(val)));
    expr = expr.replace(/log\(([^)]+)\)/g, (_, val) => Math.log(parseFloat(val)));
    expr = expr.replace(/floor\(([^)]+)\)/g, (_, val) => Math.floor(parseFloat(val)));

    expr = expr.replace(/pow\(([^,]+),([^)]+)\)/g, 'Math.pow($1,$2)');
    expr = expr.replace(/\^2/g, '**2');
    expr = expr.replace(/\^/g, '**');
    expr = expr.replace(/factorial\(([^)]+)\)/g, (_, val) => factorial(parseInt(val)));

    console.log(expr);

    return Function('return ' + expr)();
}

//radian to degree
function radToDeg(rad) {
    return rad * (180 / Math.PI);
}

//degree to radian
function degToRad(deg) {
    return deg * (Math.PI / 180);
}

//factorial
function factorial(n) {
    if (n === 0) return 1;
    let result = 1;
    for (let i = 1; i <= n; i++) {
        result *= i;
    }
    return result;
}

//C
function clearEntry() {
    expression = '';
    document.getElementById('display').value = '';
}

//backspace
function backspace() {
    if (expression.length > 0) {
        expression = expression.slice(0, -1);
    }
    document.getElementById('display').value = expression;
}

//memory functions 
function memoryAdd() {
    let currentValue = parseFloat(document.getElementById('display').value) || 0;
    memory += currentValue;
    alert(`Added to memory: ${currentValue}`);
}

function memorySubtract() {
    let currentValue = parseFloat(document.getElementById('display').value) || 0;
    memory -= currentValue;
    alert(`Subtracted from memory: ${currentValue}`);
}

function memoryClear() {
    memory = 0;
    alert('Memory cleared');
}

function memoryRecall() {
    document.getElementById('display').value = memory;
}

function memoryStore() {
    memory = parseFloat(document.getElementById('display').value);
    alert(`Memory stored: ${memory}`);
}

//changing mode
function toggleDegreeMode() {
    degreeMode = !degreeMode;
    document.getElementById('display').value = degreeMode ? 'Degree Mode' : 'Radian Mode';
}

function toggleScientificMode() {
    scientificMode = !scientificMode;
    document.getElementById('display').value = scientificMode ? 'Scientific Mode' : 'Standard Mode';
}

//key press events
document.addEventListener('keydown', function (e) {
    if (e.key === "=" || e.key === "Enter") {
        e.preventDefault();
        calculate();
    } else if (e.key === "m" || e.key === "M") { // recall on 'M' key
        memoryRecall();
    } else if (e.key === "s" || e.key === "S") { // store on 'S' key
        memoryStore();
    } else if (e.key === "a" || e.key === "A") { // add on 'A' key
        memoryAdd();
    } else if (e.key === "d" || e.key === "D") { // subtract on 'D' key
        memorySubtract();
    } else if (e.key === "Backspace") {
        e.preventDefault();
        if (expression.length > 0) {
            backspace();
        }
    } else if (e.key.length === 1) {
        e.preventDefault();
        appendFunction(e.key);
    }

    document.getElementById('display').value = expression;
});

//clear history model
const historyIcon = document.getElementById('history-icon');
const popup = document.getElementById('popup');
const clearHistoryBtn = document.getElementById('clear-history-btn');
const historyTextarea = document.getElementById('history');
const confirmationModal = document.getElementById('confirmation-modal');
const cancelBtn = document.getElementById('cancel-btn');
const confirmBtn = document.getElementById('confirm-btn');
const closeModalBtn = document.getElementById('close-modal-btn');


historyIcon.addEventListener('click', () => {
    popup.classList.toggle('hidden');
});

document.addEventListener('click', (event) => {
    if (!historyIcon.contains(event.target) && !popup.contains(event.target)) {
        popup.classList.add('hidden');
    }
});

clearHistoryBtn.addEventListener('click', () => {
    confirmationModal.classList.remove('hidden');
});

cancelBtn.addEventListener('click', () => {
    confirmationModal.classList.add('hidden');
});

closeModalBtn.addEventListener('click', () => {
    confirmationModal.classList.add('hidden');
});


confirmBtn.addEventListener('click', () => {

    history = [];
    historyTextarea.value = '';
    confirmationModal.classList.add('hidden');
});
