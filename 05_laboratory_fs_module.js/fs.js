const fs = require('fs');

const data = "sample.txt"

fs.readFile('sample.txt', 'utf8', (err, data) => {
    if (err) throw err;
    console.log("File content: ", data);
  });
  
console.log("Done reading the file")

