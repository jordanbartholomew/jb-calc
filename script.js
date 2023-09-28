document.addEventListener("DOMContentLoaded", function() {
    const display = document.getElementById('num-text'); 
    const buttons = document.querySelectorAll('[data-value]');
    let slots = 0; 
    let firstOperand = null;
    let operation = null;
    // Moved formatNumber function out of the button click
    function formatNumber(num, maxLength) {
        let str = num.toString();
            
        if (str.length > maxLength) {
            str = str.substring(0, maxLength);
        }
            
        // If the last character is a dot, remove it
        if (str.endsWith('.')) {
            str = str.substring(0, str.length - 1);
        }
        return str;
    }
    
    function setActiveOperator(button) {
        // Remove active-operator class from all operator buttons
        const operatorButtons = document.querySelectorAll('#btn-plus button, #btn-minus button, #btnX button, #btn-divide button');
        operatorButtons.forEach(btn => btn.classList.remove('active-operator'));
        
        // If a specific button is provided, add the class to it
        if (button) {
            button.classList.add('active-operator');
        }
    }
            buttons.forEach(button => {
                button.addEventListener('click', function() {
                    const value = button.getAttribute('data-value');
                    console.log("Button clicked:", value);

                    if (value === "C") {
                        display.innerText = "0";
                        slots = 0;
                        firstOperand = null; // clear first operand
                        operation = null; // clear operation
                        return;
                    }
            
                    if (["+", "-", "x", "/"].includes(value)) {
                        console.log("Operator button clicked. Adding active-operator class.");
                        firstOperand = parseFloat(display.innerText);
                        operation = value;
                        
                        // Set the clicked operator button as active
                        setActiveOperator(button);
                        
                        slots = 0; 
                        display.innerText = "0";
                        return;
            }

            if (value === "=") {
                console.log("Equals button pressed.");
                console.log("firstOperand:", firstOperand);
                console.log("operation:", operation);
                if (firstOperand !== null && operation) {
                    const secondOperand = parseFloat(display.innerText);
                    let result = null;
                    switch (operation) {
                        case "+":
                            result = firstOperand + secondOperand;
                            break;
                        case "-":
                            result = firstOperand - secondOperand;
                            break;
                        case "x":
                            result = firstOperand * secondOperand;
                            break;
                        case "/":
                            if (secondOperand !== 0) {
                                result = firstOperand / secondOperand;
                            } else {
                                result = "Error"; // handle divide by zero
                            }
                            break;

                    }
                    
                    result = formatNumber(result, 12);  // Apply formatting here
            
                    display.innerText = result.toString();
                    slots = parseFloat(display.innerText);
                    firstOperand = null; 
                    operation = null;
                    setActiveOperator(null);
                }
                return;
                
                
            }
            
            

            // If the display is "0", reset the slots count
            if (display.innerText == "0") {
                display.innerText = value;
                slots = 1;
            } else if (slots < 12) { 
                display.innerText += value;
                slots += 1;
            }



           
        });
    });
});