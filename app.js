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
    firstNum: null,
    secondNum: null,
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
    createBtn(i, i, "number");
}
const zero = createBtn(0, 0, "number")

//CREATE operator buttons
const operators = ["+", "-", "*", "/"];
operators.forEach(operator => {
    createBtn(operator, operator, "operator");
})

//ADD an equal sign button
const result = createBtn("result", "=")

//ADD a clear button
const clear = createBtn("clear", "CLEAR")
