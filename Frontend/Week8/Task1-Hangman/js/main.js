window.onload = function () {
    var words = ["container", "box", "chocolate","monkey"];
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
        if (guess.length != 1) {
            guesses.innerHTML += ("One letter :P</br>");
        }else{
            guessLetter(guess)
        }
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

    function guessLetter(letter) {
        if (lookedWord.indexOf(letter) == -1) {
            lifes--;
            guesses.innerHTML = ("The word doesn't contain the letter. Try again</br>");
            guesses.innerHTML = ("Lifes: " + lifes + "</br>");
            wordContainer.innerHTML = hiddenWord;
        } else {
            var result = getIndexesOf(letter, lookedWord);

            for (var i = 0; i < result.length; i++) {
                var position = result[i];
                hiddenWord = hiddenWord.replaceAt(position, letter);
            }
            console.log(hiddenWord)
        }

        if (lookedWord === hiddenWord) {
            guesses.innerHTML = ("You win!");
            wordContainer.innerHTML = hiddenWord;
        } else {
            wordContainer.innerHTML = hiddenWord;
        }

        if (lifes == 0) {
            guesses.innerHTML += ("You lose!");
        }

        wordContainer.innerHTML = hiddenWord;
    }

    String.prototype.replaceAt = function (index, char) {
        var a = this.split("");
        a[index] = char;
        return a.join("");
    };


    function getIndexesOf(searchStr, str) {
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
