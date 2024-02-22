document.addEventListener('DOMContentLoaded', function() {
    let displayValue = document.getElementById('displayValue');
    let currentInput = ""; 
    let calculationDone = false; //to not have an opportunity for user to add numbers to a number after calculation
    let escapeDuplication = ""; // to store last input char (avoiding multi using operators at once)
    let dotCount = 0;



    let numberButtons = document.getElementsByClassName('number'); //to get all elements from class
    for (let i = 0; i < numberButtons.length; i++) {
        numberButtons[i].addEventListener('click', function() {
            if (calculationDone) {
                currentInput = this.textContent;
                calculationDone = false;
            } else {
                currentInput += this.textContent;
            }
            displayValue.textContent = currentInput;
        });
    }

    let operatorButtons = document.getElementsByClassName('operator');
    for (let i = 0; i < operatorButtons.length; i++) {
        operatorButtons[i].addEventListener('click', function() {
        if (currentInput !== "") {

                    if (escapeDuplication.match(/[+\-*/]/)) {
                        return;  // avoiding multi using operators at once 
                    }

                let operator = this.textContent === 'x' ? '*' : this.textContent; //for "x" to be "*" 
                currentInput += " " + operator + " "; 
                displayValue.textContent = currentInput; //update display after operators    
                calculationDone = false;
                escapeDuplication = operator; // saving last char
            }
        });
    }

    function calculation(expression) {
        return Function('"use strict";return (' + expression + ')')();
    }


    let equalButton = document.getElementsByClassName('equal')[0];

equalButton.addEventListener('click', function() {
    try {
        let result = calculation(currentInput);
        let precision = 3; // to have 3 numbers after .
        currentInput = parseFloat(result.toFixed(precision)); //convertation the result to a number with a specific numbers after "."
        displayValue.textContent = currentInput;
        calculationDone = true; 
        escapeDuplication = ""; // to clear the last char after =
    } catch (error) {
        displayValue.textContent = "Error";
    }
});

    let clearButton = document.getElementsByClassName('number')[10]; // [10] bc of "C"
    clearButton.addEventListener('click', function() {
        currentInput = "";
        displayValue.textContent = "0"; //update display after C
        calculationDone = false;
        escapeDuplication = ""; //to clear the last char after C
        dotCount = 0;
    });
    let dotButton = document.getElementsByClassName('dot')[0];
    dotButton.addEventListener('click', function() {
        if (!currentInput.includes('.') && dotCount < 1) { 
            currentInput += this.textContent;
            displayValue.textContent = currentInput;
            dotCount++; 
        }
    });

    
});
