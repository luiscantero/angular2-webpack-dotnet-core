/// <reference path="node_modules/@types/node/index.d.ts" />

"use strict";

const express = require('express'),
    fs = require('fs'),
    app = express(),
    cors = require('cors'),
    faker = require('faker'); // https://www.npmjs.com/package/faker

const port = process.env.PORT || 8081;

app.use(cors());
app.use(express.json());

// Read authors from file.
// const webroot = 'wwwroot';
// const uri = 'mock-authors.json';

// Return fake authors.
const AUTHORS = 10;
var fakeAuthors = new Array(AUTHORS);

loadAuthors();

// GET: api/authors/
app.get('/api/authors', async (req, res) => {
    var authors = await getAllAuthors();

    res.send(JSON.stringify(authors));
});

// POST: api/authors/
app.post('/api/authors', async (req, res) => {
    console.log('post: ' + JSON.stringify(req.body));
    var author = req.body;

    // Insert.
    if (author) {
        fakeAuthors.push(author);
        res.writeHead(201);
    }

    res.end(JSON.stringify(author));
});

// PUT: api/authors/
app.put('/api/authors/:name', async (req, res) => {
    console.log('put: ' + JSON.stringify(req.body));
    var name = req.params.name;
    var author = req.body;

    if (author && author.name === name) {
        let index = fakeAuthors.findIndex(a => a.name === name); // Find author index.

        if (index > -1 && index < fakeAuthors.length) { // Index within bounds.
            // Update.
            fakeAuthors[index] = author;
            res.writeHead(204);
        }
    }

    res.end(JSON.stringify(author));
});

// GET: api/authors/name
app.get('/api/authors/:name', async (req, res) => {
    var authors = await getAllAuthors();

    var data = authors.data;
    var name = req.params.name;
    var results = { data: [] };

    // Find filtered results
    results = data.filter(a => a.name.toLowerCase().includes(name.toLowerCase()));

    res.send(JSON.stringify(results));
});

// GET: api/headers/
app.get('/api/headers', async (req, res) => {
    res.send(JSON.stringify(req.headers));
});

var server = app.listen(port, () => {
    console.log(`Server running at http://${server.address().address}:${server.address().port}/`);
}).on('error', (err) => {
    console.log(err);
});

async function getAllAuthors() {
    return new Promise(resolve => {
        // Read from file.
        // fs.readFile(`${webroot}/${uri}`, 'utf-8', (err, data) => {
        //     resolve(JSON.parse(data));
        // });

        // Return fake data.
        resolve({ data: fakeAuthors });
    });
}

function loadAuthors() {
    for (let i = 0; i < AUTHORS; i++) {
        fakeAuthors[i] = { name: faker.name.findName(), age: faker.random.number({ min: 18, max: 99 }) };
    }
}