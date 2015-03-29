"use strict"
var prompt = require('prompt');
var jf = require('jsonfile');
var util = require('util');
var chalk = require('chalk');
var file = './list.json';

//
// Start the prompt
//
var list = {};
prompt.start();
printMenu();

function printMenu() {
    console.log(chalk.red('Menu options:'));
    console.log(chalk.green('add'));
    console.log(chalk.green('list'));
    console.log(chalk.green('get'));
    console.log(chalk.green('remove'));
    console.log(chalk.green('update'));
    console.log(chalk.green('save'));
    console.log(chalk.green('load'));
    console.log(chalk.green('quit'));
    getCommand();
}

function getCommand() {
    prompt.get(['command'], function (err, result) {
        switch (result.command.trim()) {
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
            case "load":
                loadList();
                break;
            case "quit":
                quitProgram();
                break;
            default:
                printMenu();
        }
    });
}

function printList() {
    console.log("||id     ||name                ||email               ||");
    for (var key in list.persons) {
        var value = list.persons[key];
        var colId = "||"+addSpace(7)+"||";
        var colName = "                    ";
        var colEmail = "||"+addSpace(20)+"||";
        console.log(table(colId, value.id) + table(colName, value.name) + table(colEmail, value.email));
    }
    printMenu();
}

function addSpace(numberOfSpaces) {
    var spaces = '';
    for (var i = 0; i < numberOfSpaces; i++) {
        spaces += ' ';
    }
    return spaces;
}

function add() {
    prompt.get(['id', 'name', 'email'], function (err, result) {
            var data = {
                "id": result.id,
                "name": result.name,
                "email": result.email
            };
            list.persons.push(data);
            printMenu();

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
            printMenu();
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
                value.name = result.name.trim();
            if (result.email !== "") {
                value.email = result.email.trim();
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

function saveChanges() {
    jf.writeFile(file, list, function (err) {
        printMenu();
    })
}

function loadList() {
    jf.readFile(file, function (err, obj) {
        list = (obj);
        printMenu();
    });
}

function table(col, value) {
    var res = col.slice(3, value.length);
    col = col.replace(res, value);

    return col;
}

function quitProgram() {
    console.reset = function () {
        return process.stdout.write('\\033c');
    }
}