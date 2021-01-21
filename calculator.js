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


let inputArray = [5,'+',1,0,'*',1,5,'+',2]; //array of all user entries from listeners
let variableArray = []; //ordered array of variables to operate on, concated from user entries
let operatorArray = []; //ordered array of user selected operators
let var1;
let var2;
let tempVar; //temporary variable that stores running total from previous calculations


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

    while( (i = inputArray.shift()) !== undefined ) {
        
        if(inputArray.length === 0 ){ 

            tempArray.push(i);
            variableArray.push(Number(tempArray.join('')));
            tempArray = [];

        } else if(typeof i === 'number') {

            tempArray.push(i);

        } else if ( i === '+' || '-' || '*' || '/') { // could change this to just a generic catch, assuming input limited

            operatorArray.push(i);
            variableArray.push(Number(tempArray.join('')));
            tempArray = [];

        };
        
        console.log("i: " + i + " - inputArray.length: " + inputArray.length + " - tempArray: " + tempArray + " - operatorArray: " + operatorArray + " - variableArray: " + variableArray);

    }; //end while loop
}; 

function operate(inputArray) {

    createArrays(inputArray);

    console.log('variable array: ' + variableArray + ' - operator array: ' + operatorArray + ' - inputArray: ' + inputArray)

    let finalValue = variableArray.reduce(function(acc, currVal,) {

        let op = operatorArray.shift();

        console.log("accum: " + acc + " - currVal: " + currVal )

        return acc = compute(acc,currVal,op);

    },);

    return finalValue;
    
};

console.log('operate(inputArray): ' + operate(inputArray));