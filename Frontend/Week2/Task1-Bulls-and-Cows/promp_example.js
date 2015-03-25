var prompt = require('prompt');

//Starting
prompt.start();
var generatedNumber = getRandomInt();
prompNumber(generatedNumber);

function prompNumber(generatedNumber) {
    prompt.get(['number'], function (err, result) {
        var input = result.number;
        var checked = checkIfUnique(input);
        if (isNaN(parseInt(input)) || input.length !== 4 || checked) {
            console.log("Invalid input. Try again :)");
            prompNumber(generatedNumber);
        }

        if (generatedNumber === input) {
            console.log("You win :)")
        } else {
            console.log("You didn't guess.");
            console.log(checkNumbers(input, generatedNumber));
            prompNumber(generatedNumber);
        }

        if (err) {
            return onErr(err);
        }
    });
}
function checkIfUnique(input) {
    var count = 0;
    var check = false;
    for (var i = 0; i < input.length; i++) {
        for (var k = 1; k < input.length; k++) {
            if (input[i] == input[k]) {
                count++;
            }
        }
        if (count > 1) {
            check = true;
        }
        count = 0;
    }
    return check;
}

function onErr(err) {
    console.log(err);
    return 1;
}

function getRandomInt() {
    var nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        ranNums = [],
        i = 10,
        j = 0;

    while (i--) {
        j = Math.floor(Math.random() * (i + 1));
        ranNums.push(nums[j]);
        nums.splice(j, 1);
    }
    return ranNums.join('').slice(0, 4);
}

function checkNumbers(input, generatedNum) {
    var i = 3,
        countCows = 0,
        countBulls = 0;
    for (i; i >= 0; i--) {
        if (input[i] === generatedNum[i]) {
            countBulls++;
        }
        for (var k = 3; k >= 0; k--) {
            if (input[i] === generatedNum[k] && input[i] !== generatedNum[i]) {
                countCows++;
            }
        }
    }
    return "Bulls: " + countBulls + ", Cows: " + countCows;
}