const display = document.getElementById("display");
const numBtns = document.querySelectorAll(".numBtn");
const operators = document.querySelectorAll(".operator")
const equals = document.getElementById("equals");
const percentBtn = document.getElementById("percentBtn");
const allClear = document.getElementById("allClear");


let firstNum = "";
let operator = "";
let secondNum = ""; 
let accumulatedValue = "";
let isResult = false; //checks state to see if to clear screen

//displays numbers and answer on screen
// TODO: - write new logic -> treat all operators like an equal sign when secondNum is not-empty
//       - always store operated numbers into firstNum

// tmr 10/25/23: add Period, and posneg functions


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
    console.log(result);
});

percentBtn.addEventListener("click", () => {
    const answer = percent(firstNum);
    firstNum = answer;
    updateDisplay(firstNum);
});

allClear.addEventListener("click", ()=>{
    display.innerText = "";
    firstNum = "";
    secondNum = "";
    accumulatedValue = "";
    isResult = false;
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

// FIXME: convert this into a switch statement
function operate(operator, firstNum, secondNum){
    if(isNaN(firstNum) || isNaN(secondNum)){
        return "Not a Number";
    }else if(operator === "+"){
        return add(firstNum, secondNum);
    }else if(operator === "-"){
        return subtract(firstNum, secondNum);
    }else if(operator === "*"){
        return multiply(firstNum, secondNum);
    }else if(operator === "/"){
        if(secondNum === 0){
            return "Not a Number";
        }else{
            return divide(firstNum, secondNum);
        }
    }else{
        return "ERROR";
    }
}