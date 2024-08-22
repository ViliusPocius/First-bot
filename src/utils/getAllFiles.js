const fs = require('fs');
const path = require('path');

module.exports = (directory, foldersOnly = false) => {
    let fileNames = [];

    const files = fs.readdirSync(directory, {writeFileTypes: true});

    for(const file of files){
 
        const filePath = directory + '\\' + file;

            fileNames.push(filePath);
            
    }
    return fileNames;
}