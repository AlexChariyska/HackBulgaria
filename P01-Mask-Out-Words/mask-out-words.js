window.onload = function () {
    "use strict";
    var btnSubmit = document.getElementById("submit");
    var displayArea = document.getElementById('displayArea');

    /*
     * This displays the output on the page.
     */
    btnSubmit.addEventListener('click', function () {
        var words = document.getElementById("input-words").value;
        words = JSON.parse(words);

        var text = document.getElementById("input-text").value;

        displayArea.innerHTML += MaskOutWords(words, text);
        displayArea.innerHTML += "<br/>";

    });

    function MaskOutWords(words, text) {
        for (var i = 0; i < words.length; i++) {
            var searchedWord = new RegExp("(" + words[i] + ")", 'gi');
            var stars = new Array((words[i].length || 1) + 1).join("*");
            text = text.replace(searchedWord, stars);
        }

        return text;
    }

    /*
     * An example on the console.
     */
    console.log(MaskOutWords(["PHP"], "We love coding in PHP!\nThis makes us really productive."));

    console.log(MaskOutWords(["yesterday", "Dog", "food", "walk"], "Yesterday, I took my dog for a walk.\n It was crazy! My dog wanted only food."));
};
