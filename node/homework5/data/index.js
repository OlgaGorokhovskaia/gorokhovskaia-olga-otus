const fs = require('fs');
const { MAX_SIZE } = require('../consts');

const getMinOfArray = (numArray) => Math.min.apply(null, numArray);

const writeNewFile = async function(fileName, newFileName) {
    await fs.appendFile(newFileName, '', function(err) {
        if (err) { 
            console.log(err);
         } else {
            const readerStream = fs.createReadStream(fileName);
            const writerStream = fs.createWriteStream(newFileName);
        
            readerStream
                .on('data', (chunk) => {
                    const str = String(chunk);
                    const arr = str.split(' ');
                    const minNumber = getMinOfArray(arr.map(Number));
        
                    writerStream.write(`${minNumber} `);
                })
                .on('end', () => {
                    writerStream.end();
        
                    console.log('Writing is competed.');
                });
        };
    });  
};

const writeStream = async function(stream, fileName, newFileName) {
    if (await fs.statSync(fileName).size < MAX_SIZE) {
        const rnd = Math.random() * 10000;
        const rando = Math.ceil(rnd);
        const data = `${rando} `;

        await stream.write(data, async function() {
            await writeStream(stream, fileName, newFileName);
        });
    } else {
        await stream.end();
        await writeNewFile(fileName, newFileName);
    }
}

const writeFile = async function(fileName, newFileName) {
    const stream = await fs.createWriteStream(fileName);
    await writeStream(stream, fileName, newFileName);
};

const createFile = async function(fileName, newFileName) {
    await fs.appendFile(fileName, '', async function(err) { 
        if (err) { 
            console.log(err);
        }
    });
    await writeFile(fileName, newFileName);
};


module.exports = { createFile, writeFile, writeNewFile };