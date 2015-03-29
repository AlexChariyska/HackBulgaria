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

//Prints the menu options and asks for a command to be inserted
function printMenu() {
    console.log();
    console.log(chalk.red('Menu options:'));
    console.log(chalk.green('load'));
    console.log(chalk.green('list'));
    console.log(chalk.green('add'));
    console.log(chalk.green('sort'));
    console.log(chalk.green('get'));
    console.log(chalk.green('update'));
    console.log(chalk.green('remove'));
    console.log(chalk.green('save'));
    console.log(chalk.green('quit'));

    getCommand();
}

function getCommand() {
    prompt.get(['command'], function (err, result) {
        switch (result.command.trim()) {
            case "add":
                addPerson();
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
            case "sort":
                chooseSort();
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
    //Printing the headings of the columns in the table
    console.log();
    console.log(chalk.bgMagenta(addSpace(7, "Id") + addSpace(20, "Name") + addSpace(20, "Email")));

    //Printing the values in the columns
    for (var key in list.persons) {
        var value = list.persons[key];
        var idColumn = addSpace(7, value.id);
        var nameColumn = addSpace(20, value.name);
        var emailColumn = addSpace(20, value.email);
        console.log(chalk.bgMagenta(idColumn + nameColumn + emailColumn));
    }
    printMenu();
}

//Adds the given passed value in an array and fills the other values from
//the array with white space in order to have the same size columns in the table
function addSpace(numberOfSpaces, value) {
    var result = [];
    value = "||" + value;
    for (var i = 0; i < numberOfSpaces; i++) {
        if (i < value.length) {
            result[i] = value[i];
        } else {
            result[i] = " ";
        }
    }
    return result.join("");
}

function addPerson() {
    prompt.get(['id', 'name', 'email'], function (err, result) {
            var data = {
                "id": result.id,
                "name": result.name,
                "email": result.email
            };

            list.persons.push(data);
            printList();
        }
    )
}

function getPerson() {
    prompt.get(['id'], function (err, result) {
            var id = result.id;
            for (var i = 0; i < list.persons.length; i++) {
                var lookedUpId = list.persons[i];
                if (lookedUpId.id === id) {
                    console.log(list.persons[i]);
                }
            }
            printMenu();
        }
    )
}

function removePerson() {
    prompt.get(['id'], function (err, result) {
            var id = result.id;
            var hasId = false;
            for (var i = 0; i < list.persons.length; i++) {
                var lookedUpId = list.persons[i];
                if (lookedUpId.id === id) {
                    list.persons.splice(i, 1);
                    hasId = true;
                }
            }

            if (hasId === false) {
                console.log(chalk.red("Couldn't find ID. Try again:"));
                removePerson();
            }
            console.log(chalk.blue("Successfully removed person!"));
            printList();
        }
    )
}

function updatePerson() {
    prompt.get(['id'], function (err, result) {
            var id = result.id;
            var hasId = false;
            for (var i = 0; i < list.persons.length; i++) {
                var lookedUpId = list.persons[i];
                if (lookedUpId.id === id) {
                    var value = list.persons[i];
                    hasId = true;
                    askForPersonParams(value);
                }
            }
            if (hasId === false) {
                console.log(chalk.red("Couldn't find ID. Try again:"));
                updatePerson();
            }
        }
    );
}

function askForPersonParams(value) {
    prompt.get(['id', 'name', 'email'], function (err, result) {
            if (result.id !== "") {
                value.id = result.id.trim();
            }
            if (result.name !== "") {
                value.name = result.name.trim();
            }
            if (result.email !== "") {
                value.email = result.email.trim();
            }

            printList();
        }
    );
}


//Iterates in every property of the JSON file end searches for every keyword case insensitive.
function search() {
    prompt.get(['keywords'], function (err, result) {
            var keywordsArr = result.keywords.split(" ");
            iterateObj(list);
            printMenu();

            function iterateObj(obj) {
                for (var property in obj) {
                    if (obj.hasOwnProperty(property)) {
                        if (typeof obj[property] == "object")
                            iterateObj(obj[property]);
                        else {
                            for (var i = 0; i < keywordsArr.length; i++) {
                                var looked = keywordsArr[i].toLowerCase();

                                if (obj[property].toLowerCase().indexOf(looked) != -1) {
                                    console.log(obj);
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

function quitProgram() {
    console.reset = function () {
        return process.stdout.write('\\033c');
    }
}

function chooseSort() {
    prompt.get(['sortBy'], function (err, result) {
        switch (result.sortBy.trim()) {
            case "id":
                list.persons.sort(SortByID);
                printList();
                break;
            case "name":
                list.persons.sort(SortByName);
                printList();
                break;
            case "email":
                list.persons.sort(SortByEmail);
                printList();
                break;
            case "return to menu":
                printMenu();
                break;
            case "quit":
                quitProgram();
                break;
            default:
                chooseSort();
        }
    });
}


function SortByID(x, y) {
    return x.id - y.id;
}

function SortByName(x,y) {
    return ((x.name == y.name) ? 0 : ((x.name > y.name) ? 1 : -1 ));
}

function SortByEmail(x,y) {
    return ((x.email == y.email) ? 0 : ((x.email > y.email) ? 1 : -1 ));
}