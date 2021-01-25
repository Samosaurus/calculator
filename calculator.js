/*
    - Listen for button presses - Should this be a seperate javascript file?
    - Push each selection into a tempArray
        - could use shift() Method
            - The shift() method removes the first element from an array and returns that removed element. 
               This method changes the length of the array.
    - When Equals is entered
        - If numbers - concat tempArray numbers, broken by operators, and push into variableArray
        - if Operator - push into operatorArray
    - Throw errors if: 
        - Divide by 0
        - Two operators pushed
        - equals clicked without 2 variable and an operator, or ends in an operator
        - 
    - Loop (forEach?) through variableArray and operatorArray
        - Take 1st 2 variables and 1st operator -> compute(var1,var2,o1)
        - Store result in tempVar
        - tempVar, 3rd variable, and 2nd Operator -> compute(tempVar,Var3,o2)
        - Store result in tempVar
        - Loop through until all variables and operators have been computed
        - output final tempVar as resultVar
*/        
const inputsObj = {
    "clear" : "clear",
    "sqrt" : "sqrt",
    "percent" : "%",
    "divide" : '/',
    "seven" : 7,
    "eight" : 8,
    "nine" : 9,
    "four" : 4,
    "five" : 5,
    "six" : 6,
    "one" : 1, 
    "two" : 2,
    "three" : 3,
    "zero" : 0,
    "decimel" : ".",
    "equals" : "equals",
    "plus" : '+',
    "subtract" : '-',
    "multiply" : '*',
};

let inputArray = []; //array of all user entries from listeners
let variableArray = []; //ordered array of variables to operate on, concated from user entries
let operatorArray = []; //ordered array of user selected operators
let var1;
let var2;
let tempVar; //temporary variable that stores running total from previous calculations

//display setup
const total = document.querySelector('#total');
const totalContent = document.createElement('div');
totalContent.classList.add('totalContent');
totalContent.textContent = "0";
total.appendChild(totalContent);

const tally = document.querySelector('#tally');
const tallyContent = document.createElement('div');
tallyContent.classList.add('tallyContent')
tallyContent.textContent = "0";
tally.appendChild(tallyContent);


//listener setup

const buttons = document.querySelectorAll('.button');

buttons.forEach((button) => {

    // and for each one we add a 'click' listener
    button.addEventListener('click', () => {
      
      if(button.id === "equals") {

        totalContent.textContent = operate(inputArray);
        total.appendChild(totalContent);
        inputArray = [];

      } else if (button.id === "clear") {

        inputArray = [];
        variableArray = [];
        operatorArray = [];
        totalContent.textContent = "0";
        total.appendChild(totalContent);
        tallyContent.textContent = "0";
        tally.appendChild(tallyContent);

      } else {

        inputArray.push(inputsObj[`${button.id}`]);
        tallyContent.textContent = inputArray.join('');
        tally.appendChild(tallyContent);

        };        
        
    });
});


function compute(x,y,o) {

    switch(o) {
        case '+' : return x+y;
        case '-' : return x-y;
        case '*' : return x*y;
        case '/' : return x/y;
    };
}

function createArrays(inputArray) {

    let tempArray = [];

    //iterates through inputArray and looks at each value. 
    //If the value is a number, it gets pushed to the tempArray.
    //If the value is an operator
        //the operator gets pushed into the operatorArray
        //the tempArray gets joined and pushed into the variableArray
    //When the last inputArray value is evaluated, it gets pushed into the variableArray and the tempArray is reset

    while( (i = inputArray.shift()) !== undefined ) {
        
        if(inputArray.length === 0 ){ 

            tempArray.push(i);
            variableArray.push(Number(tempArray.join('')));
            tempArray = [];

        } else if(typeof i === 'number' || i === '.') {

            tempArray.push(i);

        } else if ( i === '+' || '-' || '*' || '/') { // could change this to just a generic catch, assuming input limited

            operatorArray.push(i);
            variableArray.push(Number(tempArray.join('')));
            tempArray = [];

        };
        
    }; //end while loop
}; 

function operate(inputArray) {

    variableArray = []; //clears variable Array for next calculation

    createArrays(inputArray);

    while( variableArray.length > 0 ) {

        return  variableArray.reduce(function(acc, currVal) {

            let op = operatorArray.shift();
            return acc = compute(acc,currVal,op);
    
        }, );
    };
    
};
