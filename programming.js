// Hoisting - Behaviour of var and func where declerations
// are moved to top of their containing scope
// either global scope or function scope during compilation.
// Why - when var is defined it is attached to Global env
// but when let or const are defined they attach to Script env.
// Var - Hoisting Happens - undefined.
// Let & Const - Hoisting Happens - Temporal Dead Zone (ref error).
function Hoisting() {

    console.log(a); // undefined - means absence of value
    var a = 10;

    // console.log(b); // reference error
    // let b = 10

    hello(); // works
    function hello() {
        console.log("Hello");
    }

    // bye(); // cannot access
    const bye = () => {
        console.log("Bye", a);
        var a = "A";
    }
    bye();

    function func1() {
        console.log(a); // undefined
        var a = "A";
    }
    func1();

}
// Hoisting();

// Lexical Scope - Whenever Execution context is created 
// the Scope of a variable is upto its Local Env
// and Lexical Env of its parent.
function LexicalScope() {

    let variable = 20;
    func1();
    function func1() {
        var a = 10;
        func2();
        function func2() {
            console.log(a);
            console.log(variable);
            var b = 10;
        }
        // console.log(b); // ref error
    }
    // console.log(a); // ref error

}
// LexicalScope();

// Window object - let & const cannot be accessed with window object
// var can be access with window object or this keyword.
// 'this' keyword - this keyword always refers to the window object.
function windowObject() {
    var a = 10;
    console.log(this.a); // undefined
    // window.a; // Gives a value in browser

    let b = 20;
    console.log(this.b);
}
// windowObject();

// BlockScope - Group multiple statements into one block
// var - created globally can be access outside
// let & const - context in script cannot access outside.
function BlockScope() {
    {
        let a = 10;
        const b = 20;
        var c = 30;
    }
    // console.log(a); // not defined
    // console.log(b); // not defined
    console.log(c); // works
}
// BlockScope();

// Shadowing - variable having same name in block scope and outside scope is modified
// when declared with var keyword (same inside function and arrow function)
function Shadowing() {
    let a = 10;
    {
        let a = 100;
        console.log(a);
    }
    console.log(a); // not shadowed (modified).

    var b = 20;
    {
        var b = 200;
        console.log(b);
    }
    console.log(b); // shadowed (modified).
}
// Shadowing();

// (Functions in JavaScript)
function Functions() {
    // Anonymous functions - function without a name.
    // function () {
    //     // only use to return a function from a function   
    // }

    // Function Statement or Decleration - Normal Function with name & function keyowrd.
    function func1() {
        console.log("I am a Function");
    }
    func1();

    // Function Expression - Function which acts like a value, hoisting not valid.
    // Difference is hoisting between Function Statement and Expression.
    const a = function () {
        return 1;
    }
    let value = a();
    console.log(value);

    // Named Function Expression - Function which used to return a val & name assigned to it.
    const b = function func2() {
        return 'Hi';
    }
    let value1 = b(); // not valid
    // let value1 = func2(); // not valid
    console.log(value1);

    // First Class Functions - A Function which return another function or passed as an argument.
    const c = function () {
        return function () {
            return "Fawzaan";
        }
    }
    let returnedFunction = c();
    let returnedValue = returnedFunction();
    console.log(returnedValue);

    // Callback Fucntion - A function which is passed as an argument to other function.
    function y() {
        console.log('y');
    }
    function x(y) {
        console.log('x');
        y();
    }
    x(y); // Passing y() as an argument.
    x(function () {
        console.log('y');
    }); // Using Anonymous Method.

    // Arrow Functions - A concise way to write a Function Expression.
    const func3 = () => {
        console.log('Arrow Function');
        return 0;
    }
    console.log(func3());

    const func4 = () => 1;
    console.log(func4());

    const func5 = (a = 1, b = 2) => a + b;
    console.log(func5());
}
// Functions();

// Closures - its a property of a function to access variables from its outer scope
// even after that function has returned Or
// combination of functions bundled together with refrence to their surroundings. 
// Advantage - Reusablity, Iterators.
// Closure is Created only when function is not immediately called when returned
// thats the main concept because after return without calling it remembers its outer scope.
function Closures() {

    function x() {
        let a = 'Closure';
        function y() {
            console.log(a);
        }
        return y(); // Don't call immediately otherwise no reuse become undefined.
    }
    let call = x();
    console.log(call); // undefined
    // console.log(call()); // error because not a function.

    function counter() {
        let count = 0;
        function inside() {
            count++;
            return count;
        } // increase count on every call.
        return inside; // due to this closure is created.
    }
    let count = counter();
    console.log(count());
    console.log(count());
    console.log(count());
    // count(); // this is inside().
    // count();
    // count();
    // count();
    // count();
}
// Closures();

// setTimeout - a callback fucntion which is used asynchronously to perform a task
// after a certain time.
function SetTimeouts() {

    setTimeout(() => {
        console.log('Hi')
    }, 1000); // does after 1 sec.

    for (var i = 1; i <= 3; i++) {
        setTimeout(() => {
            console.log(i);
        }, 1000);
    } // stays same because var refers to i (not its value).

    for (let i = 1; i <= 3; i++) {
        setTimeout(() => {
            console.log(i);
        }, 1000);
    } // increase because of block scope

    const id = setInterval(() => {
        console.log('Go to Hell');
    }, 5000); // does every 5 sec.

    setTimeout(() => {
        clearInterval(id);
    }, 25000); // clear setInterval after 25 secs.
}
// SetTimeouts();

//(Arrays in Javascript)
function Arrays() {
    // Can contain elements of diff data types.
    const a = [0, true, 'a'];
    console.log(a);

    // Both holds same reference.
    const arr1 = [123, 123, 123];
    const arr2 = arr1;
    arr2.push(123);
    console.log(arr1);
    arr1.pop(123);
    console.log(arr2);

    // Length can dynamically changed
    const arr3 = [1, 2, 3, 4, 5, 6, 10];
    console.log(arr3.length);
    arr3.length = 100;
    console.log(arr3);
    arr3[arr3.length-50] = 50;
    console.log(arr3);

    // Simple Methods
    const arr4 = [1, 2, 3, 5];
    console.log(arr4.indexOf(4));// -1
    console.log(arr4.indexOf(5));// 3
    console.log(arr4.at(1));// 2
    console.log(arr4.includes(3));// true

    // Arrays Changing Methods
    const arr5 = [1, 2, 3, 4, 5];
    let len = arr5.unshift(0);// insert at first & returns new length
    console.log(len);
    let elem = arr5.shift();// removes first & returns it
    console.log(elem, arr5);
    let newArr = arr5.concat([6, 7]); // combines new array & returns it
    console.log(newArr);
    
    // Traversing the Array
    const arr6 = [1, 2, 3, 4, 5];
    for(let elem of arr6) { // Traverse through elements in array
        console.log(elem);
    }
    for(let indx in arr6) { // Traverse through indexes in array
        console.log(indx, arr6[indx]);
    }
    
    // More Methods
    const arr7 = [1, 2, 3, 4, 5, 6];
    // Filter - use to filter array based on condition & returns new Array.
    const evens = arr7.filter((elem) => elem%2 == 0);
    const odds = arr7.filter((elem) => {
        return elem%2!=0;
    });
    console.log(evens, odds);
    
    // Determines true or false even if only some elem satisfy the condition. 
    const some = arr7.some((elem) => elem===1);
    console.log(some);

    // Determines true or false only if every elem satisfy the condition.
    const every = arr7.every((elem) => elem===1);
    console.log(every);

    // forEach - used for traversal
    // arr7.forEach((elem) => console.log(elem));

    // Map() - Map each element with new value.
    const squares = arr7.map((elem, index) => {
        return elem*2;
    });
    console.log(squares);

    // Reduce(accumulator, element) - Reduce the array into single value.
    const reduce = arr7.reduce((res, element) => {
        return res+element
    }, res = 21); // here res ie. accumulator is the initial value.
    console.log(arr7, 'Sum =', reduce);
}
Arrays();