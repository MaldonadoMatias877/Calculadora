let total = 0;
let buffer = "0";
let operadorPrevio = null;

const screenOperators = document.querySelector('.screen.operators');
const screenResults = document.querySelector('.screen.results');

function buttonClick(value) {
    if (isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    updateDisplay();
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            buffer = '0';
            total = 0;
            operadorPrevio = null;
            screenOperators.innerText = '';
            break;
        case '=':
            if (operadorPrevio === null) return;

            flushOperation(parseFloat(buffer));
            operadorPrevio = null;
            buffer = total.toString();
            screenOperators.innerText = '';
            total = 0;
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0';
            } else {
                buffer = buffer.slice(0, -1);
            }
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break;
    }
}

function handleMath(symbol) {
    if (buffer === '0') return;

    const intBuffer = parseFloat(buffer);

    if (total === 0 && operadorPrevio === null) {
        total = intBuffer;
    } else {
        flushOperation(intBuffer);
    }

    operadorPrevio = symbol;

    screenOperators.innerText = `${total} ${operadorPrevio}`;

    buffer = '0';
}

function flushOperation(intBuffer) {
    switch (operadorPrevio) {
        case '+':
            total += intBuffer;
            break;
        case '−':
            total -= intBuffer;
            break;
        case '×':
            total *= intBuffer;
            break;
        case '÷':
            if (intBuffer === 0) {
                alert("No se puede dividir entre cero");
                total = 0;
            } else {
                total /= intBuffer;
            }
            break;
    }
}

function handleNumber(numberString) {
    if (buffer === '0') {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function updateDisplay() {
    screenResults.innerText = buffer;
}

function init() {
    document.querySelector('.calc-buttons')
        .addEventListener('click', function (event) {
            const target = event.target;
            if (!target.matches('button')) return;
            buttonClick(target.innerText);
        });
}

init();
