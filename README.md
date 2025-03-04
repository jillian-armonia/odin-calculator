# Calculator Project for The Odin Project
The project is to create a simple JS calculator.

## Use Cases
1. Create basic arithmetic operations and test them on the console.
    - add
    - subtract
    - multiply
    - divide
2. Each operation will be a number, an operator, and another number. Create three variables for each part of the operation.
3. Create a new function `operate` that takes an operator and two number and uses the corresponding function on it.
4. Create a basic HTML calculator with buttons for each digit and operator including (`=`).
    - There should be a display for the calculator so you can see the numbers you input.
    - Add a `clear` button.
5. Create functions that populate the display when you click the digit buttons. You should store the content of the display (the number) in a variable.
6. Make the calculator work! Store the first and second numbers input by the user then `operate()` on them when the user presses the `=` button.
    - Update the display with the result of the operation
7. Watch out for bugs!
    - Your calculator should not evaluate more than a single pair of numbers at a time. If you press a second operator button, it should calculate the first operation first and use the result as the first number of the second operation
    - Round answers with long decimals so that they don't overflow the display
    - Pressing `=` before entering all of the numbers or an operator could cause problems!
    - Pressing `clear` should wipe out any existing data. The user is really starting fresh after pressing `clear`.
    - Display a snarky error message if the user tries to divide by 0... and don't let it crash your calculator!
    - You cannot have to operators one after the other. It should only take the last operator entered to be used for the next operation.
    - When a result is displayed, pressing a new digit should clear the result and start a new calculation instead of appending the digit to the existing result.

### Extra Credit
- Add a `.` but to let user input decimals. Make sure to not let them put more than one decimal. Disable it when the decimal separator is already in the number.
- Add a `backspace` buttons so that user can undo their last input if they click the wrong number.
- Add keyboard support!
