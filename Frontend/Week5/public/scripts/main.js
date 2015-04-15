$(document).ready(function () {
    var container = $('#container').append('<ul></ul>');
    var ulList = $('ul');
    var count = 0;
    var container = [];
    $('#btn-add').click(setToTaskList);

    function setToTaskList() {
        var inputValue = $('#input').val();
        if (inputValue !== '') {
            var checkbox = createNeededElements(inputValue);
            $('#input').val('');
            $(checkbox).click(finishTask);
            count++;
        }
    }

    function finishTask() {
        if ($(this).prop('checked')) {
            $(this).parent().addClass("done")
        } else {
            $(this).parent().removeClass("done")
        }
    }

    function createNeededElements(inputValue) {
        var checkbox = $(document.createElement("input"));
        checkbox.attr('type', 'checkbox');
        checkbox.attr('value', inputValue);
        checkbox.attr('id', 'box' + count);

        var text = $(document.createElement("span"));
        text.attr('id', 'span' + count);
        text.text(inputValue);

        var listElement = $(document.createElement("li"));
        listElement.attr('id', 'list' + count);
        listElement.append(checkbox);
        listElement.append(text);
        ulList.append(listElement);
        $('#input').val('');
        return checkbox;
    }
});


