/// <reference path="node_modules/@types/node/index.d.ts" />

"use strict";

const express = require('express'),
    fs = require('fs'),
    app = express();

const webroot = 'wwwroot/';
const uri = 'mock-authors.json';

// GET: api/authors/
app.get('/api/authors', (req, res) => {
    fs.readFile(`${webroot}/${uri}`, 'utf-8', (err, data) => {
        res.writeHead(200, {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        });
        res.end(data);
    });
});

// GET: api/authors/name
app.get('/api/authors/:name', (req, res) => {
    fs.readFile(`${webroot}/${uri}`, 'utf-8', (err, data) => {
        var data = JSON.parse(data).data;
        var name = req.params.name;
        var results = { data: [] };

        // Collect matching items.
        for (var i = 0, len = data.length; i < len; i++) {
            if (data[i].name.toLowerCase().includes(name.toLowerCase())) {
                results.data.push(data[i]);
            }
        }

        res.writeHead(200, {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json'
        });
        res.end(JSON.stringify(results));
    });
});

var server = app.listen(8081, () => {
    console.log(`Server running at http://${server.address().address}:${server.address().port}/`);
}).on('error', (err) => {
    console.log(err);
});