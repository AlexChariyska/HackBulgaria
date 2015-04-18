"use strict";
var TodoApp = (function () {
    // private vars
    var tasks = [];
    var index = 0;

    // store the reference with the jQuery selectors here
    var refs = {
        addTask: "#btn-add",
        container: "#container"
    };

    var addTask = function (taskName) {
        var obj = {
            "id": index,
            "nameTask": taskName,
            "isFinished": false
        };
        index++;
        tasks.push(obj);
    };

    var finishTask = function (id) {
        for (var i = 0; i < tasks.length; i++) {
            var task = tasks[i];
            if (task.id == id) {
                task.isFinished = !task.isFinished;
            }
        }
    };

    var removeTask = function (id) {
        tasks.splice(tasks.indexOf(tasks[id]), 1);
    };


    var displayList = function (container) {
        var container = $(refs.container).empty();
        for (var i = 0; i < tasks.length; i++) {
            var task = tasks[i];

            var checkbox = $(document.createElement("input"));
            checkbox.attr('type', 'checkbox');
            checkbox.attr('value', task.nameTask);
            checkbox.attr('class', task.id);

            checkbox.click(function () {
                var id = $(this).attr('class');
                finishTask(id);
                displayList();
            });

            // Removing a task when clicked.
            var btnRemove = $(document.createElement("button"));
            btnRemove.attr("class", task.id);
            btnRemove.append("Remove");
            btnRemove.click(function () {
                var id = $(this).attr('class');
                removeTask(id);
                displayList();
            });

            //Task name
            var text = $(document.createElement("span"));
            text.text(task.nameTask);

            var listElement = $(document.createElement("li"));

            if (task.isFinished) {
                checkbox.attr("checked", true);
                listElement.css("text-decoration", "line-through");
            } else {
                listElement.css("text-decoration", "none");
            }

            listElement.attr('id', 'list' + task.id);
            listElement.append(checkbox);
            listElement.append(text);
            listElement.append(btnRemove);

            container.append(listElement);
        }
    };

    // public api
    return {
        addTask: addTask,
        finishTask: finishTask,
        displayList: displayList,
        removeTask: removeTask
    };
})
();
