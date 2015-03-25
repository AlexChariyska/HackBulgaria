var prompt = require('prompt');
var word = "";

//Starting
prompt.start();
getWord();
var lifes= 10;

function getWord() {
    prompt.get(['word'], function (err, result) {
        word = result.word;
        var hidden =hideWord(word);
        console.log(hidden);
        guessLetter(hidden);
        if (err) {
            return onErr(err);
        }
    });
}

function guessLetter(hidden) {
    prompt.get(['letter'], function (err, result) {
        console.log(word);
        var letter = result.letter;
        if (word.indexOf(letter) == -1){
            lifes--;
            console.log("The word doesn't contain the letter. Try again");
            console.log("Lifes: " + lifes);
            console.log(hidden);
            guessLetter(hidden);
        }else{
            var index = word.indexOf(letter);
            hidden = hidden.replaceAt(index, letter);

            if(word === hidden){
                console.log("You win!");
            }else{
                console.log(hidden);
                guessLetter(hidden);
            }
        }
        if(lifes == 0 ){
            console.log("You lose!");
        }

        if (err) {
            return onErr(err);
        }
    });
}


function onErr(err) {
    console.log(err);
    return 1;
}

function hideWord(word){
    var firstLetter = word.slice(0,1);
    var lastLetter = word.slice(-1);
    var hidden = Array(word.length-1).join(" _ ");
    return firstLetter + hidden + lastLetter;
}

String.prototype.replaceAt=function(index, char) {
    var a = this.split("");
    a[index] = char;
    return a.join("");
}
