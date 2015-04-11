window.onload = function () {
    'use strict';
    var button = document.getElementById("add-task-button");
    var listWrapper = document.createElement("ul");

    button.onclick = function (event) {
        var input = document.getElementById("task-input");
        var item = document.createElement('LI');
        var text = document.createTextNode(input.value);

        item.appendChild(text);
        listWrapper.appendChild(item);
        input.value = "";
    };
    
    document.body.appendChild(listWrapper)
};

