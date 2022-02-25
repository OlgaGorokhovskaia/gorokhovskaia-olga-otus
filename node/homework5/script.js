const fs = require('fs');
const { createFile , writeFile, writeNewFile } = require('./data');

const { FILE_NAME, NEW_FILE_NAME } = require('./consts');

const foo = function(fileName, newFileName) {
    fs.readFile(fileName, async function(err, data) {
        if (err) {
            await createFile(fileName, newFileName);
        } else if (!data.toString().length) {
            await writeFile(fileName, newFileName);
        } else {
            await writeNewFile(fileName, newFileName);
        }
    });
};

foo(FILE_NAME, NEW_FILE_NAME);