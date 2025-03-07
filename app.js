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

//CREATE a function to update the display
const updateDisplay = (calcProp, input) => {
    switch(calcProp){
        case "firstNum":
            calculator.firstNum += input;
            display.textContent = calculator.firstNum;
            break;
        case "operator":
            calculator.operator = input;
            display.textContent = calculator.firstNum + calculator.operator;
            break;
        case "secondNum":
            calculator.secondNum += input;
            display.textContent = calculator.firstNum + calculator.operator + calculator.secondNum;
            break;
    }
}
//CREATE number buttons
for (let i = 1; i < 10; i++){
    let numberBtn = createBtn(i, i, "number");
    //CREATE click functions
    numberBtn.onclick = () => {
        if (!calculator.operator){
            updateDisplay("firstNum", numberBtn.id)
        } else {
            updateDisplay("secondNum", numberBtn.id)
        }
    }

    document.addEventListener("keydown", (e) => {
        if (numberBtn.id == e.key) numberBtn.click();
    })
}

const zero = createBtn(0, 0, "number")
zero.onclick = () => {
    if (!calculator.operator && calculator.firstNum){
        updateDisplay("firstNum", zero.id);
    } else if (calculator.operator && calculator.secondNum) {
        updateDisplay("secondNum", zero.id)
    }
}

//CREATE operator buttons
const operators = ["+", "-", "*", "÷"];
operators.forEach(operator => {
    let operatorBtn = createBtn(operator, operator, "operator");
    //CREATE click functions
    operatorBtn.onclick = () => {
        if (calculator.firstNum && !calculator.secondNum){
            updateDisplay("operator", operatorBtn.id)
        } else if (calculator.result && !calculator.secondNum){
            calculator.firstNum = calculator.result;
            updateDisplay("operator", operatorBtn.id);
            calculator.result = "";
        }
    }

    document.addEventListener("keydown", (e) => {
        if (e.key == operatorBtn.id) operatorBtn.click();
        if (e.key == "/") document.querySelector("#÷").click();
    })
})

//ADD an equal sign button

const result = createBtn("result", "=")
result.onclick = () => {
    if (display.textContent == "" || !calculator.secondNum || !calculator.operator) return;

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
            updateDisplay("firstNum", "0.");
        } else if (!calculator.firstNum.includes(".")){
            updateDisplay("firstNum", ".");
        }
    } else {
        if (!calculator.secondNum){
            updateDisplay("secondNum", "0.");
        } else if (!calculator.secondNum.includes(".")) {
            updateDisplay("secondNum", ".");
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

/**************KEYBOARD SUPPORT *************/
document.addEventListener("keydown", (e) => {
    switch(e.key){
        case "Enter":
            result.click();
            break;
        case "Backspace":
            erase.click();
            break;
        case ".":
            decimal.click();
            break;
        case 0:
            zero.click();
            break;
        default:
            break;
    }
})
