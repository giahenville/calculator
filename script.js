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

let firstNum;
let operator;
let secondNum;

function operate(operator, firstNum, secondNum){
    if(operator == "+"){
        return add(firstNum, secondNum);
    }else if(operator == "-"){
        return subtract(firstNum, secondNum);
    }else if(operator == "*"){
        return multiply(firstNum, secondNum);
    }else{
        return divide(firstNum, secondNum);
    }
}
console.log(operate('-', 1, 3));