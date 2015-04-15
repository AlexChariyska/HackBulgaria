window.onload = function () {
    'use strict';
    var button = document.getElementById("add-task-button");
    var listWrapper = document.createElement("ul");

    button.onclick = function (event) {
        var input = document.getElementById("task-input");
        var item = document.createElement('LI');
        item.style.listStyle = "none";
        var checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        var text = document.createTextNode(input.value);
        checkbox.onclick = function () {
            if (this.checked == 1) {
                this.parentElement.style.textDecoration = "line-through";
            } else {
                this.parentElement.style.textDecoration = "none";
            }
        };

        item.appendChild(checkbox);
        item.appendChild(text);
        listWrapper.appendChild(item);
        input.value = "";
    };

    document.body.appendChild(listWrapper)
};

