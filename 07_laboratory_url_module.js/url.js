const url = require('url');

const myURL = 'https://www.example.com:8080/pathname?name=JohnDoe#fragment';
const parsedURL = url.parse(myURL,true);

console.log(parsedURL);
console.log('Parsed URL Object:', parsedURL.query.name);