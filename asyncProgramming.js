// Promise - object which eventually gives success or failure.
function promise1() {
    const getData = new Promise((resolve, reject) => {
        let a = 1;
        (a) ? resolve("Data is Correct") : reject("Data is Not Correct");
    });

    console.log(getData); //contains a Promise object which has (prototype, state, result).

    getData.then((result) => { //handles resolve resolutions.
        console.log(result);
    }).catch((error) => { //handles error & reject resolutions.
        console.log(error);
    }).finally(() => { //execute regardless of anything.
        console.log("Over");
    });
}
// promise1();

// Using Promise Chaning.
function promise2() {
    function getUserData() {
        return new Promise((resolve, reject) => {
            let a = 1;
            (a) ? resolve(true) : reject(false);
        });
    }

    const result = getUserData();
    console.log(result); //Contains Promise.

    result.then((result) => { //handles resolve resolutions.
        console.log(result);
        return 1;
    }).then((result) => { //result contains val returned from previous then.
        console.log(result);
        return 1;
    }).then((result) => { //result contains val returned from previous then.
        console.log(result);
        return 0;
    }).then((result) => { //result contains val returned from previous then.
        console.log(result);
    }).catch((error) => { //handles error & reject resolution.
        console.log(error);
    }).finally(() => { //execute regardless of anything.
        console.log("Finished");
    });
}
// promise2();

// Practice Promise Chaining.
function promise3() {
    const data = new Promise((resolve, reject) => {
        let a = 1;
        a ? resolve(true) : reject(false);
    });
    data.then((result) => {
        console.log(result);
        return () => 1;
    }).then((result) => {
        console.log(result);
        return () => 0;
    }).then((result) => {
        const val = result();
        console.log(val);
        return () => 1;
    }).then((result) => {
        console.log(result());
        return null;
    }).catch((error) => {
        console.log(error);
    }).finally((result = "Finished") => {
        console.log(result);
    });
}
// promise3();

// Async-Await in JavaScript.
function asyncAwait() {
    //async - keyword which returns a promise used with await in async js.
    let func1 = async () => 1;
    console.log(func1()); // returns a promise with result - 1.

    //Promise Chaning using async-await.
    const funct = (a) => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(a);
            }, 1000);
        });
    }
    async function funct1() {
        let data = await funct(1);
        console.log(data); //holds value at resolve in promise.
        data = await funct(2);
        console.log(data); //holds value at resolve in promise.
        data = await funct(3);
        console.log(data); //holds value at resolve in promise.
    }
    funct1();

    //await - pause the execution of surroundings async function until promise is settled.
    console.log('Hi');
    let func2 = async (value) => {
        await new Promise((resolve) => {
            setTimeout(() => {
                console.log(value);
                resolve();
            }, 1000);
        });
    }
    console.log('Bye');
    // func2('Good Boy');

    //Way more explained - await pauses if previous promise is never settled.
    const num = (n) => new Promise((resolve) => { //return new Promise().
        setTimeout(() => {
            // let num = Math.floor(Math.random() * 10);
            console.log(n);
            resolve("Hello"); //Compulsion (other wise previous promise will never be settled).
        }, 1000); //delay 1s.
    });
    //Once the promise is settled then only it calls other otherwise will stuck forever.
    async function counter() {
        let result = await num(1);  //waits 1s, then logs 1.
        console.log(result); //holds whats inside resolve.
        result = await num(2);  //waits 1s, then logs 2.
        console.log(result); //holds whats inside resolve.
        result = await num(3);  //waits 1s, then logs 3.
        console.log(result); //holds whats inside resolve.
    }
    // counter();

    //Promise.all() - takes many promises, runs them in parallel and returns single promise when all are settled.
    const processNumbers = (num) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log(num);
                resolve(num * 2); //returns values into that promise array.
            }, 2000);
        });
    }
    //Returns Single Promise - after waiting if all are settled. 
    async function runAll() {
        try {
            const array = await Promise.all([
                processNumbers(1),
                processNumbers(2),
                processNumbers(3),
            ]); //resolve does this.
            console.log(array); //[1, 4, 9].
        } catch (error) {
            console.log(error);
        }
    }
    // runAll();
}
asyncAwait();