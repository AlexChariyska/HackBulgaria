"use strict"
var prompt = require('prompt');
var file = './list.json';
var jf = require('jsonfile');
var util = require('util');

//
// Start the prompt
//
var list={};
jf.readFile(file, function (err, obj) {
     list = (obj);
});
prompt.start();
printMenu();

function printMenu() {
    console.log('Menu options:');
    console.log('add');
    console.log('list');
    console.log('get');
    console.log('remove');
    console.log('update');
    console.log('save');
    console.log('quit');
    getCommand();
}

//
// Get two properties from the user: username and email
//
function getCommand() {
    prompt.get(['command'], function (err, result) {
        switch (result.command) {
            case "add":
                add();
                break;
            case "list":
                printList();
                break;
            case "get":
                getPerson();
                break;
            case "remove":
                removePerson();
                break;
            case "update":
                updatePerson();
                break;
            case "search":
                search();
                break;
            case "save":
                saveChanges();
                break;
            default:
                printMenu();
        }
    });
}

function printList() {
        console.log("||   id    ||   name    ||   email   ||");
        for (var key in list.persons) {
            var key = list.persons[key];
            console.log("||    " + key.id + "    ||   " + key.name + "    ||    " + key.email + "    ||");
        }
        printMenu();
}

function add() {
    prompt.get(['id', 'name', 'email'], function (err, result) {
            var data = {
                "id": result.id,
                "name": result.name,
                "email": result.email
            };
            list.persons.push(data);
            jf.writeFile(file, list, function (err) {
                printMenu();
            })
        }
    )
}

function getPerson() {
    prompt.get(['id'], function (err, result) {
            var id = result.id;
            for (var i = 0; i < list.persons.length; i++) {
                var lookedUpId = list.persons[i];
                if (lookedUpId.id === id) {
                    console.log(list.persons[i])
                }
            }

            printMenu();
        }
    )
}
function removePerson() {
    prompt.get(['id'], function (err, result) {
            var id = result.id;
            for (var i = 0; i < list.persons.length; i++) {
                var lookedUpId = list.persons[i];
                if (lookedUpId.id === id) {
                    list.persons.splice(i, 1);
                }
            }

            jf.writeFile(file, list, function (err) {
                printMenu();
            });
        }
    )
}

function updatePerson() {
    prompt.get(['id'], function (err, result) {
            var id = result.id;
            for (var i = 0; i < list.persons.length; i++) {
                var lookedUpId = list.persons[i];
                if (lookedUpId.id === id) {
                    var value = list.persons[i];
                    askForInfo(value);
                }
            }
        }
    );
}
function askForInfo(value) {
    prompt.get(['name', 'email'], function (err, result) {
            if (result.name !== "")
                value.name = result.name;
            if (result.email !== "") {
                value.email = result.email;
            }
            console.log("Your changes: " + value);
            printMenu();
        }
    );
}

function search() {
    prompt.get(['keywords'], function (err, result) {
            var keywordsArr = result.keywords.split(" ");
            iterate(list);
            printMenu();

            function iterate(obj) {
                for (var property in obj) {
                    if (obj.hasOwnProperty(property)) {
                        if (typeof obj[property] == "object")
                            iterate(obj[property]);
                        else {
                            for (var i = 0; i < keywordsArr.length; i++) {
                                var looked = keywordsArr[i];

                                if (obj[property].indexOf(looked) != -1) {
                                    console.log(obj)
                                }
                            }
                        }
                    }
                }
            }
        }
    );
}

function saveChanges(){
    jf.writeFile(file, list, function(err) {
        printMenu();
    })
}