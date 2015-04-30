"use strict";
var express = require("express");
var fs = require("fs");
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// declare our app
var app = express();

//config
app.use(express.static('public'));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());
app.use(methodOverride());

var students = [
    {name: 'John Doe', email: 'john@doe.com'},
    {name: 'John P', email: 'p@doe.com'},
    {name: 'John P', email: 'p@doe.com'}
];

// collection endpoints
// get all users
app.get('/', function (req, res) {
    res.render('index');
});
app.get('/api/students', function (req, res) {
    res.jsonp(students);
});

// post new user to the collection
app.post('/api/students', function (req, res) {
    // req.body contains the incoming fields and values
    var id = req.body.id;
    var name = req.body.name;
    var email = req.body.email;

    students[id] = {
        name: name,
        email: email
    };

    res.jsonp({
        msg: 'user created',
        data: students[id]
    });
});


// document endpoints
// get info about user by id
// for eg: /users/john-doe
app.get('/api/students/:id', function (req, res) {
    // get the id from the params
    var id = req.params.id;
    res.jsonp(students[id]);
});


// put an updated version of a user by id
app.put('/api/students/:id', function (req, res) {
    // get the id from the params
    var id = req.params.id;
    // update the info from the body if passed or use the existing one
    students[id].name = req.body.name || students[id].name;
    students[id].email = req.body.email || students[id].email;

    res.jsonp({
        msg: 'user data updated',
        data: students[id]
    });
});

// delete an existing user by id
app.delete('/api/students/:id', function (req, res) {
    var id = req.params.id;
    if (students[id]) {
        delete(students[id]);
        res.jsonp('student ' + id + ' successfully deleted!');
    } else {
        res.jsonp('student ' + id + ' does not exist!');
    }
});

var server = app.listen(3000, function () {
    console.log('Listening on port %d', server.address().port);
});