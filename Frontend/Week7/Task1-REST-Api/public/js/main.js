"use strict";
var StudentsApi = (function () {
    var container = $("#container__body");
    var studentsResult;
    displayResults();

    function displayResults() {
        container.empty();
        $.ajax({
            "method": "get",
            "url": "http://localhost:3000/api/students",
            "dataType": "json"
        }).done(function (result) {
            studentsResult = result;
            for (var student in studentsResult) {
                if (studentsResult[student] != null) {
                    container.append("<tr><td>" + studentsResult[student].name +
                    "</td><td>" + studentsResult[student].email +
                    "</td><td><a data-id='" + student + "' id='btn_edit_" + student + "' href='#'>Edit</a><a data-id='" + student + "' id='btn_delete_" + student + "' href='#'>Delete</a></td></tr>");
                    var actions = $('.btn_actions_' + student);
                    $('#btn_edit_' + student).click(function (event) {
                        var name = $("#name").val();
                        var email = $("#email").val();
                        var id = event.target.getAttribute('data-id');
                        update(id, name, email);

                    });

                    $('#btn_delete_' + student).click(function (target) {
                        var id = event.target.getAttribute('data-id');
                        deleteStudent(id);
                    });
                }
            }
        })
    }

    $("#btn-add").click(function () {
        var name = $("#name").val();
        var email = $("#email").val();
        if (name != "" && email != "") {
            create(name, email);
        }
    });

    function deleteStudent(id) {
        $.ajax({
            "method": "delete",
            "url": "http://localhost:3000/api/students/" + id,
            "dataType": "json"
        }).done(function (result) {
            displayResults();
        })
    }

    function update(id, name, email) {
        $.ajax({
            "method": "put",
            "url": "http://localhost:3000/api/students/" + id,
            "data": {
                "name": name,
                "email": email
            },
            "dataType": "json"
        }).done(function (result) {
            displayResults();
        })
    }

    function create(name, email) {
        $.ajax({
            "method": "post",
            "url": "http://localhost:3000/api/students",
            "data": {
                "id": studentsResult.length,
                "name": name,
                "email": email
            },
            "dataType": "json"
        }).done(function (result) {
            displayResults();
            $("#name").val("");
            $("#email").val("");
        })
    }
});
