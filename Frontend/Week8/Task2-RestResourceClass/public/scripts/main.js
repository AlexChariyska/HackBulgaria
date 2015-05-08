'use strict';

$(document).ready(function () {

    var test = {"name": "Test", "email": "test@test.com"};

    var students = new Resource("http://192.168.0.66:3000/api/students");
    students.update("554cd6b955a223e0dd8e8ca8",test)
        .then(function(res){console.log(res)})
        .then(students.query)
        .then(function(res){console.log(res)})
        .then(students.remove('554ce93ac23b62f14096f057'))
        .then(function(res){console.log(res)});

});