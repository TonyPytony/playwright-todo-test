// Finding the minimum and maximum values in an array of numbers and sorting the array


// Using Math.min and Math.max with spread operator
const array: number[] = [34, 47, 23, 89, 2, 5, 67, 1, 99, 4];

const minValue = Math.min(...array);
const maxValue = Math.max(...array);

console.log(`Minimum value: ${minValue}`);
console.log(`Maximum value: ${maxValue}`);


// Using for loop
let minValue2 = array[0];
let maxValue2 = array[0];
for (let i = 1; i < array.length; i++) {
    if (array[i] < minValue2) {
        minValue2 = array[i];
    }
    if (array[i] > maxValue2) {
        maxValue2 = array[i];
    }
}
console.log("Current minimum:", minValue2);
console.log("Current maximum:", maxValue2);


// Using reduce method
const minValue3 = array.reduce((main, current)=>
current < main ? current : main);
const maxValue3 = array.reduce((main, current)=>
current > main ? current : main);

console.log("Minimum using reduce:", minValue3);
console.log("Maximum using reduce:", maxValue3);


// Using sort method from min to max
const sorted1 = [...array].sort((a,b)=>a-b);
console.log("Sorted from min to max:", sorted1);

// Using sort method from max to min
const sorted2 = [...array].sort((a,b)=>b-a);
console.log("Sorted from max to min:", sorted2);


// Sum function
function sum (a: number, b: number): number {
    return a + b;
}
console.log("Sum function:", sum(5, 10));

//calculator
function calculator (a: number, b: number, operation: string): number | string {
    switch (operation) {
        case "add":
            return a + b;
        case "subtract":
            return a - b;
        case "multiply":
            return a * b;
        case "divide":
            return b !== 0 ? a / b : "Error: Division by zero";
        default:
            return "Error: Unknown operation";
    }
}
console.log("Calculator add:", calculator(10, 5, "add"));
console.log("Calculator subtract:", calculator(10, 5, "subtract"));
console.log("Calculator multiply:", calculator(10, 5, "multiply"));
console.log("Calculator divide:", calculator(10, 5, "divide"));
console.log("Calculator divide by zero:", calculator(10, 0, "divide"));
console.log("Calculator unknown operation:", calculator(10, 5, "modulus"));

//json-server --watch db.json --port 3000 щоб запустити сервер