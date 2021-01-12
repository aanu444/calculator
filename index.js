const calculator={
    displayValue:'0',
    firstOperand:null,
    waitingForSecondOperand: false,
    operator:null
};

function updateDisplay(){
    const display= document.getElementById("bttn0");
    display.value=calculator.displayValue;
}

updateDisplay();

const keys=document.querySelector('.calculator-keys');
console.log(keys);
keys.addEventListener('click', (event) =>{
    const {target}= event;
    //equivalent to const target = event.target;

if (!target.matches('input[type=button]')){
    return;
}

if (target.classList.contains('operator')){
   // console.log('operator', target.value);
   handleOperator(target.value);
   updateDisplay(); 
   return;
}

if(target.classList.contains('calc-clear')){
    //console.log('clear', target.value);
    resetCalculator();
    updateDisplay();
    return;
}
//console.log('digit', target.value);
inputDigit(target.value);
updateDisplay();
});


function inputDigit(digit){
    const{displayValue, waitingForSecondOperand} = calculator;

    if(waitingForSecondOperand === true){
        calculator.displayValue=digit;
        calculator.waitingForSecondOperand = false;
    } else{
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
    
    console.log(calculator);
}

function handleOperator(nextOperator){
    const {firstOperand, displayValue, operator} = calculator;
    const inputValue=parseFloat(displayValue);

    if(operator && calculator.waitingForSecondOperand) {
        calculator.operator= nextOperator;
        console.log(calculator);
        return;
    }

    if (firstOperand === null && !isNaN(inputValue)){
        calculator.firstOperand = inputValue;
    }else if (operator){
        const result= calculate(firstOperand,inputValue, operator);

        calculator.displayValue= String(result);
        calculator.firstOperand = result;
    }
    calculator.waitingForSecondOperand=true;
    calculator.operator = nextOperator;
    console.log(calculator);
}

function calculate(firstOperand,secondOperand, operator){
    if (operator === "+"){
        return firstOperand + secondOperand;
    }else if (operator === "-"){
        return firstOperand - secondOperand;
    }else if (operator === "*"){
        return firstOperand * secondOperand;
    }else if(operator === "/"){
        return firstOperand / secondOperand;
    }
    return secondOperand;
}

function resetCalculator(){
    calculator.displayValue='0';
    calculator.firstOperand=null;
    calculator.waitingForSecondOperand = false;
    calculator.operator=null;
    console.log(calculator);
}