window.onload = function () {
    var fileInput = document.getElementById('fileInput');
    var fileDisplayArea = document.getElementById('fileDisplayArea');
    var queryDisplayArea = document.getElementById('queryDisplayArea');
    var btnClear = document.getElementById('clear-command');
    var dataForSearch;

    fileInput.addEventListener('change', function (e) {
        var file = fileInput.files[0];
        var reader = new FileReader();

        reader.onload = function (e) {
            try {
                dataForSearch = $.csv.toObjects(reader.result);
                fileDisplayArea.innerText = reader.result;
            } catch (error) {
                fileDisplayArea.innerText = "Invalid data. Please insert a new file."
            }
        };

        reader.readAsText(file);

    });

    document.getElementById('submit-command').addEventListener('click', function (ev) {
        var queryInput = document.getElementById("command-input").value;
        var queryCommandsSplit = queryInput.replace(",", " ").split(" ");

        // Checks if there are empty values and returns only non empty.
        queryCommandsSplit = queryCommandsSplit.filter(function (e) {
            return e;
        });

        var command = queryCommandsSplit[0].toLowerCase();

        btnClear.click();

        /**
         *Removes the first element which is the command and is unnecessary anymore.
         */
        queryCommandsSplit.shift();

        var dataObj = {};
        var values = [];

        switch (command) {
            case "select":
                var elements;
                var limitNumber = queryCommandsSplit[queryCommandsSplit.length - 1];
                var limitCommand = queryCommandsSplit[queryCommandsSplit.length - 2];
                var limitPassed;

                // Remove the last two elements if there is a limit command, so that only the arguments are left.
                if (limitCommand != undefined && limitCommand.toLowerCase() == 'limit') {
                    queryCommandsSplit.pop();
                    queryCommandsSplit.pop();
                    limitPassed = limitNumber;
                }

                for (elements = 0; elements < dataForSearch.length; elements++) {

                    var i;
                    for (i = 0; i < queryCommandsSplit.length; i++) {

                        var searchWord = queryCommandsSplit[i].replace(/,/gi, '');
                        var value = dataForSearch[elements][searchWord];

                        if (!dataObj[searchWord]) {
                            dataObj[searchWord] = [value];
                        } else {
                            dataObj[searchWord].push(value);
                        }
                    }
                }

                printResults(dataObj, limitPassed);
                break;
            case "show":
                var elements;
                for (elements = 0; elements < dataForSearch.length; elements++) {

                    var i;
                    for (i = 0; i < queryCommandsSplit.length; i++) {
                        var searchWord = queryCommandsSplit[i].replace(/,/gi, '');
                        var value = dataForSearch[elements][searchWord];
                        if (!dataObj[searchWord]) {
                            dataObj[searchWord] = [value];
                        } else {
                            dataObj[searchWord].push(value);
                        }
                    }
                }

                printResults(dataObj);
                break;
            case "sum":
                for (var el = 0; el < dataForSearch.length; el++) {

                    for (var i = 0; i < queryCommandsSplit.length; i++) {

                        var searchWord = queryCommandsSplit[i].replace(/,/gi, '');
                        var value = dataForSearch[el][searchWord];

                        if (!dataObj[searchWord]) {
                            dataObj[searchWord] = [value];
                        } else {
                            dataObj[searchWord].push(value);
                        }
                    }
                }

                dataObj = sumValues(dataObj);
                printResults(dataObj);
                break;
            case "find":
                var elements;
                for (elements = 0; elements < dataForSearch.length; elements++) {

                    var searchWord = queryCommandsSplit[0].replace(/,/gi, '');
                    for (key in dataForSearch[elements]) {

                        if (dataForSearch[elements][key].indexOf(searchWord) > -1) {
                            dataObj[key] = [dataForSearch[elements][key]];
                        }
                    }
                }

                printResults(dataObj);
                break;
        }
    });

    /**
     * This function clears the table content in case too many command have been executed.
     */
    btnClear.addEventListener('click', function (ev) {
        var row = document.getElementById("result-query").innerHTML = '';
    });

    /**
     * The function is responsible for printing the results in tabular way.
     * @param obj - this is the passed data created from the main function;
     * @param valuesJoint all values from the keys, joint as a string;
     * @param row this is the row from the table where the results will be displayed, as a columns;
     */
    function printResults(obj, limitNumber) {
        var heading = "";
        var valuesJoint = "";
        var row = document.getElementById("result-query");

        if (limitNumber !== undefined) {
            for (key in obj) {
                var col = document.createElement("td");
                heading = "******<br>" + key + " <br>******";

                for (var i = 0; i < limitNumber; i++) {
                    valuesJoint += obj[key][i] + "<br>";
                }

                col.innerHTML = heading + "<br>" + valuesJoint;
                row.appendChild(col);
                valuesJoint = "";
            }

        } else {
            for (key in obj) {
                var col = document.createElement("td");
                valuesJoint = obj[key].join('<br>')
                heading = "******<br>" + key + " <br>******";

                col.innerHTML = heading + "<br>" + valuesJoint;
                row.appendChild(col);
            }
        }
    }

    function sumValues(obj) {
        var data = {};

        for (key in obj) {
            var count = 0;
            var i;

            for (i = obj[key].length; i--;) {
                count += parseInt(obj[key][i]);
            }

            data[key] = [count];
        }
        return data;
    }
};
