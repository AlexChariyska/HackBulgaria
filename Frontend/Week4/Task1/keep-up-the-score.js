document.addEventListener("DOMContentLoaded", function (event) {
    var container = document.getElementById("container");
    container.style.width="400px";
    container.style.padding="20px";
    function hasKey(dict, key) {
        return typeof dict[key] !== "undefined";
    }

    function createElement(tagName, content, attributes) {
        attributes = attributes || {};

        var obj = document.createElement(tagName);
        obj.appendChild(document.createTextNode(content));

        if (hasKey(attributes, "id")) {
            obj.id = attributes["id"];
        }

        return obj;
    }

    var buttonA = createElement("button", "Team A", {id: "teamA"});
    var headingA = createElement("p", "Team A Score: 0", {id: "teamAScore"});
    buttonA.style.float="left";
    headingA.style.float="left";
    headingA.style.margin="40px -60px";

    var buttonB = createElement('button', 'Team B', {id: "teamB"});
    buttonB.style.float="right";
    var headingB = createElement('p', 'Team B Score: 0', {id: "teamBScore"});
    headingB.style.float="right";
    headingB.style.margin="40px -60px";



    var scores = {
        "teamA": 0,
        "teamB": 0
    };
    buttonA.addEventListener('click', function (event) {
        scores[event.target.id]+=1;
        var scoreValue = scores[event.target.id];
        headingA.firstChild.data = "Team A Score: " + scoreValue;
        container.appendChild(headingA);
    });
    buttonB.addEventListener('click', function (event) {
        scores[event.target.id]+=1;
        var scoreValue = scores[event.target.id];
        headingB.firstChild.data = "Team B Score: " + scoreValue;
        container.appendChild(headingB);
    });


    container.appendChild(buttonA);
    container.appendChild(buttonB);
});
