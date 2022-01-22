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