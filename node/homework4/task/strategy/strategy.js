const fs = require('fs/promises');

const findTree = async function(path, dirs = [], files = []) {
    try {
        const isCorrectPath = path[path.length - 1] === '/';
        const correctedPath = isCorrectPath ? path : path.concat('/');
        const newPath = isCorrectPath ? path.slice(0, -1) : path;

        const dir = await fs.opendir(correctedPath);
        dirs.push(newPath);

        for await (const dirent of dir) {
            const dirPath = `${correctedPath}${dirent.name}`;
            
            if (dirent.isFile()) {
                files.push(dirPath);
            } else if (dirent.isDirectory()){
                const preparedDirPath = dirPath.concat('/');
                await findTree(preparedDirPath, dirs, files);
            }
        };

        return { dirs, files };
    } catch (e) {
        const textError = path ? `This path isn't correct or you don't have access: ${path}` : 'This path is empty!';
        const err = new Error(textError);
        console.error(err.message); 
    }
};

const myListener = async function(path) {
    const res = await findTree(path);
    if (res) console.log(res);
};

module.exports = { findTree, myListener };