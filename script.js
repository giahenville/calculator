// this 

const display = document.getElementById("display");
const buttons = document.querySelectorAll(".button");

let firstNum = "";
let operator = "";
let secondNum = ""; 
let accumulatedValue = "";
let isResult = false; //checks state to see if too clear screen

//displays numbers and answer on screen
buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.value;
        
        if(isNumeric(value)){

            if(operator === ""){
                if(isResult){ //clears screen
                    firstNum = "";
                    isResult = false;
                }
                firstNum += value; 
                accumulatedValue = firstNum;
            }else{
                secondNum += value;
                accumulatedValue = secondNum;
            }  
        }else if(value === "="){
            isResult = true;
            if(firstNum !== "" && operator !== "" && secondNum !== ""){
                const answer = operate(operator, parseFloat(firstNum), parseFloat(secondNum));
                accumulatedValue = answer;
                if(!isNumeric(value)){
                    firstNum = answer;
                }else{
                    firstNum = "";
                }
                operator = "";
                secondNum = "";
            }
        }else{
            operator = value;
            accumulatedValue = operator;
        }
        updateDisplay(accumulatedValue);    
    });
});

//updates screen if value is a number only
function updateDisplay(value){
    if(isNumeric(value) || value === "Not a Number"){
        display.innerText = value;
    }
};

function isNumeric(value) {
    return !isNaN(parseFloat(value)) && isFinite(value);
};

function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

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