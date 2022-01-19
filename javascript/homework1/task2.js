"use strict";

// Задание 2.

let result = 0;

const sum = (arg) => {
    if (typeof arg === 'number') {
        result = result + arg;
        
        return sum; 
    }

    const res = result;
    result = 0;

    return res; 
};
