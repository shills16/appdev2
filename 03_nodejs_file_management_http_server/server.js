const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');
const EventEmitter = require('events');
const emitter = new EventEmitter();

const port = 3000;
const hostname = 'localhost';

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.writeHead('Content-Type', 'text/plain');
    res.end('Hello, Node.js!');
});

// Create a File
fs.writeFile('example.txt', 'This is a sample file.', (err) => {
    if (err) {
        console.error('Error creating file:', err);
    } else {
        console.log('File created successfully.');
    }

    emitter.on('event', () => {
        console.log('A file has been created.');
    });

    emitter.emit('event');
});

// Read a File
fs.readFile('example.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
    } else {
        console.log('File content:', data);
    }

    emitter.on('event', () => {
        console.log('A file has been read.');
    });

    emitter.emit('event');
});

// Update a File
fs.appendFile('example.txt', '\nThis is an updated content.', (err) => {
    if (err) {
        console.error('Error updating file:', err);
    } else {
        console.log('File updated successfully.');
    }

    emitter.on('event', () => {
        console.log('A file has been updated.');
    });

    emitter.emit('event');
});

// Delete a File
fs.unlink('example.txt', (err) => {
    if (err) {
        console.error('Error deleting file:', err);
    } else {
        console.log('File deleted successfully.');
    }

    emitter.on('event', () => {
        console.log('A file has been deleted.');
    });

    emitter.emit('event');
});

// Path Module
const fullPath = path.join(__dirname, 'example.txt');
console.log('Full Path:', fullPath);

const ext = path.extname(fullPath);
console.log('File Extension:', ext);

// URL Module
const sampleUrl = 'http://localhost:3000/delete?filename=example.txt';
const parsedUrl = url.parse(sampleUrl, true);
console.log('Parsed URL:', parsedUrl);
console.log('Query Name:', parsedUrl.query.name);

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});