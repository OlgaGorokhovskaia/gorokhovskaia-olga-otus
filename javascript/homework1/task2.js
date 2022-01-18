"use strict";

// Задание 2.

const sum = (arg) => {
    if (typeof arg === 'number') {
        this.result = (this.result || 0) + arg;
        return sum; 
    }

    const res = this.result;
    this.result = 0;
    return res; 
};
