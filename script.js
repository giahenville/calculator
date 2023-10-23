const display = document.getElementById("display");
const buttons = document.querySelectorAll(".button");


let firstNum = "";
let operator = "";
let secondNum = ""; 
let accumulatedValue = "";

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const value = button.value;
        if(isNumeric(value)){
            if(operator === ""){
                firstNum += value;
            }else{
                secondNum += value;
            }  
            accumulatedValue += value;
        }else if(value === "="){
            if(firstNum !== "" && operator !== "" && secondNum !== ""){
                const answer = operate(operator, parseFloat(firstNum), parseFloat(secondNum));
                accumulatedValue = answer;
                firstNum = answer;
                operator = "";
                secondNum = "";
            }
        }else{
            operator = value;
            accumulatedValue += value;
        }
        updateDisplay(accumulatedValue);
       
        
    });
});

function updateDisplay(value){
    display.innerText = value;
    console.log(display);
};
//    console.log(display);

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
    if(operator === "+"){
        return add(firstNum, secondNum);
    }else if(operator === "-"){
        return subtract(firstNum, secondNum);
    }else if(operator === "*"){
        return multiply(firstNum, secondNum);
    }else if(operator === "/"){
        return divide(firstNum, secondNum);
    }else{
        return "ERROR";
    }
}
// console.log(operate('-', 1, 3));