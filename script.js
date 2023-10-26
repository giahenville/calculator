const display = document.getElementById("display");
const numBtns = document.querySelectorAll(".numBtn");
const operators = document.querySelectorAll(".operator")
const equals = document.getElementById("equals");
const percentBtn = document.getElementById("percentBtn");
const allClear = document.getElementById("allClear");
const posNeg = document.getElementById("posNeg");


let firstNum = "";
let operator = "";
let secondNum = ""; 
let accumulatedValue = "";
let isResult = false; //checks state to see if to clear screen


numBtns.forEach(button => {
    button.addEventListener("click", () =>{
        const value = button.value;
        if(operator === ""){
            //resets firstNum if no operator is pressed after a calculation has been run
            if (isResult === true) {
                // wipe the firstNum
                firstNum = "";
            }
            firstNum += value;
            accumulatedValue = firstNum;
        }else{
            secondNum += value;
            accumulatedValue = secondNum;
        }
        isResult = false;
        updateDisplay(accumulatedValue);
    });
});

operators.forEach(operatorBtn => {
    operatorBtn.addEventListener("click", () =>{
        if(firstNum && secondNum){
            isResult = true;
            const result = operate(operator, firstNum, secondNum);
            firstNum = parseFloat(result);
            accumulatedValue = parseFloat(result);
            secondNum = "";
            operator = "";

        }
        
        operator = operatorBtn.value;

        if(isResult){
            firstNum = parseFloat(accumulatedValue);
            secondNum = "";
        }
    });
});

equals.addEventListener("click", () => {
    const result = operate(operator, firstNum, secondNum);
    isResult = true;
    updateDisplay(result);
    firstNum = parseFloat(result);
    accumulatedValue = parseFloat(result);
    secondNum = "";
    operator = "";
});

percentBtn.addEventListener("click", () => {
    const answer = percent(firstNum);
    firstNum = answer;
    updateDisplay(firstNum);
});

allClear.addEventListener("click", ()=>{
    display.innerText = "0";
    firstNum = "";
    secondNum = "";
    accumulatedValue = "";
    operator = "";
    isResult = false;
});

posNeg.addEventListener("click", () => {
    if (secondNum) {
        secondNum = (secondNum >= 0) ? -secondNum : Math.abs(secondNum);
        updateDisplay(secondNum);
    } else if (firstNum) {
        firstNum = (firstNum >= 0) ? -firstNum : Math.abs(firstNum);
        updateDisplay(firstNum);
    }
});

function updateDisplay(value){
    if(isNumeric(value) || value === "Not a Number" || value === "."){
        //updates screen if value is a number only
        display.innerText = value;
    }
};

function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
};

function add(a, b){
    return (parseFloat(a) + parseFloat(b)).toString();
};

function subtract(a, b){
    return (parseFloat(a) - parseFloat(b)).toString();
};

function multiply(a, b){
    return (parseFloat(a) * parseFloat(b)).toString();
};

function divide(a, b){
    return (parseFloat(a) / parseFloat(b)).toString();
};

function percent(a){
    return (parseFloat(a) / 100).toString();
};

function operate(operator, firstNum, secondNum) {
    if (isNaN(firstNum) || isNaN(secondNum)) {
        return "Not a Number";
    }
    switch (operator) {
        case "+":
            return add(firstNum, secondNum);
        case "-":
            return subtract(firstNum, secondNum);
        case "*":
            return multiply(firstNum, secondNum);
        case "/":
            if (secondNum === 0) {
                return "Not a Number";
            } else {
                return divide(firstNum, secondNum);
            }
        default:
            return "ERROR";
    }
}