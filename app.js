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
}

const operate = () => {
    switch(calculator.operator){
        case "+":
            add(calculator.firstNum, calculator.secondNum);
            break;
        case "-":
            subtract(calculator.firstNum, calculator.secondNum);
            break;
        case "*":
            multiply(calculator.firstNum, calculator.secondNum);
            break;
        case "/":
            divide(calculator.firstNum, calculator.secondNum);
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
        //IF the operator is still null
            //ADD to the firstNum variable
            //SET the firstNum variable as the display content
        //ELSE
            //ADD to the secondNum variable
            //SET the display content as a combined string of the firstNum, operator, and the secondNum
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
const operators = ["+", "-", "*", "/"];
operators.forEach(operator => {
    let operatorBtn = createBtn(operator, operator, "operator");
    //CREATE click functions
    operatorBtn.onclick = () => {
        if (calculator.firstNum && !calculator.secondNum){
            calculator.operator = operatorBtn.id;
            display.textContent = calculator.firstNum + calculator.operator;
        }
    }
        //IF the firstNum has a value, and the secondNum doesn't...
            //SET the value of the operator to the button id
            //SET the display with combined string of the firstNum and the operator
})

//ADD an equal sign button
const result = createBtn("result", "=")

//ADD a clear button
const clear = createBtn("clear", "CLEAR")
