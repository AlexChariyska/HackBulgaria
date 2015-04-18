'use strict';

$(document).ready(function () {
    $("#btn-add").click(function () {
        var value = $("#input").val();
        TodoApp.addTask(value);
        TodoApp.displayList();
    });

    $("#btn-remove").click(function () {
        var value = $("#input").val();
        TodoApp.removeTask(value);
        TodoApp.displayList();
    })
});