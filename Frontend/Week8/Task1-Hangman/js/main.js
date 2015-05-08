window.onload = function () {
    var words = ["container", "box", "chocolate"];
    var container = document.getElementById("container");
    var wordContainer = document.getElementById("word-container");
    var guesses = document.getElementById("guesses");

    var lifes = 10;
    var lookedWord = getRandomWord();
    var hiddenWord = hideWord(lookedWord);
    wordContainer.innerHTML = hiddenWord;

    function getRandomWord() {
        var num = getRandomInt(0, words.length);
        return words[num];
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    document.getElementById("submit").addEventListener("click", function (event) {
        event.preventDefault();
        var guess = document.getElementById("letter").value;
        guess.trim();
        guessLetter(guess, hiddenWord)
    });

    function hideWord(word) {
        var firstLetter = word.slice(0, 1);
        var firstLettersArr = charPos(word, firstLetter);
        var lastLetter = word.slice(-1);
        var lastLettersArr = charPos(word, lastLetter);

        var hidden = Array(word.length).join("_").split("");
        for (var i = 0; i < firstLettersArr.length; i++) {
            hidden[firstLettersArr[i]] = firstLetter;
        }
        for (var k = 0; k < lastLettersArr.length; k++) {
            hidden[lastLettersArr[k]] = lastLetter;
        }
        return hidden.join("");
    }

    function charPos(str, char) {
        return str
            .split("")
            .map(function (c, i) {
                if (c == char) return i;
            })
            .filter(function (v) {
                return v >= 0;
            });
    }

    function guessLetter(letter, hidden) {
        if (lookedWord.indexOf(letter) == -1) {
            wordContainer += "</br>";
            lifes--;
            guesses.innerHTML += ("The word doesn't contain the letter. Try again</br>");
            guesses.innerHTML += ("Lifes: " + lifes + "</br>");
            wordContainer.innerHTML = hidden;
        } else {
            var result = getIndicesOf(letter, lookedWord);
            debugger;

            for (var i = 0; i < result.length; i++) {
                var position = result[i];
                hidden = hidden.replaceAt(position,letter);
            }

            if (lookedWord === hidden) {
                guesses.innerHTML += ("You win!");
                wordContainer.innerHTML = hidden;
            } else {
                wordContainer.innerHTML = hidden;
            }
        }

        if (lifes == 0) {
            guesses.innerHTML += ("You lose!");
        }
        hiddenWord = hidden;
        wordContainer.innerHTML = hiddenWord;
    }

    String.prototype.replaceAt = function (index, char) {
        var a = this.split("");
        a[index] = char;
        return a.join("");
    };


    function getIndicesOf(searchStr, str) {
        var startIndex = 0, searchStrLen = searchStr.length;
        var index, indices = [];

        str = str.toLowerCase();
        searchStr = searchStr.toLowerCase();

        while ((index = str.indexOf(searchStr, startIndex)) > -1) {
            indices.push(index);
            startIndex = index + searchStrLen;
        }
        return indices;
    }

};
