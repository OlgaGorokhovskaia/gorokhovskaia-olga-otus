// first way to solve

function promiseReduce(asyncFunctions, reduce, initialValue) { 
    return new Promise((resolve) => {
        return asyncFunctions[0]()
            .then((res) => reduce(initialValue, res))
            .then((res) => {
                if (asyncFunctions.length <= 1) return res;
                return promiseReduce(asyncFunctions.slice(1), reduce, res);
            })
            .then(resolve);
    });
};


// second way to solve

function promiseReduce(asyncFunctions, reduce, initialValue) {
    return asyncFunctions.reduce((acc, fn) => (
        acc.then((acc) => 
            fn().then((res) => 
                reduce(acc, res)
            )
        )
    ), Promise.resolve(initialValue));
};