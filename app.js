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
