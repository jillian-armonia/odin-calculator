const add = (a, b) => {
    return a + b;
};

const subtract = (a, b) => {
    return a - b;
}

const multiply = (a, b) => {
    return a * b;
}

const divide = (a, b) => {
    if (b == 0) return "do better dude";
    return a / b;
}

const calculator = {
    operator: null,
    firstNum: "",
    secondNum: "",
    result: "",
}

const operate = () => {
    //ENSURE that both numbers are NOT strings
    calculator.firstNum = Number(calculator.firstNum);
    calculator.secondNum = Number(calculator.secondNum);

    switch(calculator.operator){
        case "+":
            return add(calculator.firstNum, calculator.secondNum);
        case "-":
            return subtract(calculator.firstNum, calculator.secondNum);
        case "*":
            return multiply(calculator.firstNum, calculator.secondNum);
        case "÷":
            return divide(calculator.firstNum, calculator.secondNum);
    }
}

/****************************GENERATE HTML DOM ELEMENTS***************************/
const display = document.querySelector("#display");
const btnsContainer = document.querySelector("#buttons");
const createBtn = (id, content, className) => {
    let newBtn = document.createElement("button");
    newBtn.id = id;
    newBtn.textContent = content;
    newBtn.classList.add(className);
    btnsContainer.appendChild(newBtn);
    return newBtn;
}

//CREATE number buttons
for (let i = 1; i < 10; i++){
    let numberBtn = createBtn(i, i, "number");
    //CREATE click functions
    numberBtn.onclick = () => {
        if (!calculator.operator){
            calculator.firstNum += numberBtn.id;
            display.textContent = calculator.firstNum;
        } else {
            calculator.secondNum += numberBtn.id;
            display.textContent = calculator.firstNum + calculator.operator + calculator.secondNum;
        }
    }
}

const zero = createBtn(0, 0, "number")
zero.onclick = () => {
    if (!calculator.operator && calculator.firstNum){
        calculator.firstNum += zero.id;
        display.textContent = calculator.firstNum;
    } else if (calculator.operator && calculator.secondNum) {
        calculator.secondNum += zero.id;
        display.textContent = calculator.firstNum + calculator.operator + calculator.secondNum;
    }
}

//CREATE operator buttons
const operators = ["+", "-", "*", "÷"];
operators.forEach(operator => {
    let operatorBtn = createBtn(operator, operator, "operator");
    //CREATE click functions
    operatorBtn.onclick = () => {
        if (calculator.firstNum && !calculator.secondNum){
            calculator.operator = operatorBtn.id;
            display.textContent = calculator.firstNum + calculator.operator;
        } else if (calculator.result && !calculator.secondNum){
            calculator.operator = operatorBtn.id;
            calculator.firstNum = calculator.result;
            display.textContent = calculator.result + calculator.operator;
            calculator.result = "";
        }
    }
})

//ADD an equal sign button

const result = createBtn("result", "=")
result.onclick = () => {
    if (display.textContent == 0 || !calculator.secondNum) return;

    calculator.result = operate();
    if (!Number.isInteger(calculator.result)) calculator.result = +calculator.result.toFixed(2);

    display.textContent = calculator.result;
    calculator.firstNum = "";
    calculator.operator = null;
    calculator.secondNum = "";
}

//ADD a clear button
const clear = createBtn("clear", "CLEAR")
clear.onclick = () => {
    display.textContent = "";
    calculator.firstNum = "";
    calculator.result = "";
    calculator.secondNum ="";
    calculator.operator = null;
}

//ADD a decimal separator button
const decimal = createBtn("decimal", ".");
decimal.onclick = () => {
    if (!calculator.operator){
        if (!calculator.firstNum){
            calculator.firstNum += "0.";
            display.textContent = calculator.firstNum;
        } else if (!calculator.firstNum.includes(".")){
            calculator.firstNum += ".";
            display.textContent = calculator.firstNum;
        }
    } else {
        if (!calculator.secondNum){
            calculator.secondNum += "0.";
            display.textContent = calculator.firstNum + calculator.operator + calculator.secondNum;
        } else if (!calculator.secondNum.includes(".")) {
            calculator.secondNum += ".";
            display.textContent = calculator.firstNum + calculator.operator + calculator.secondNum;
        }
    }
}

//ADD a backspace button
const erase = createBtn("erase", "c");
erase.onclick = () => {
    if (!calculator.operator){
        let end = calculator.firstNum.length - 1
        calculator.firstNum = calculator.firstNum.slice(0, end);
        display.textContent = calculator.firstNum;
    } else if (!calculator.secondNum){
        let end = display.textContent.length - 1;
        calculator.operator = null;
        display.textContent = display.textContent.slice(0, end);
    } else {
        let end = calculator.secondNum.length - 1;
        calculator.secondNum = calculator.secondNum.slice(0, end);
        display.textContent = calculator.firstNum + calculator.operator + calculator.secondNum;
    }
}
