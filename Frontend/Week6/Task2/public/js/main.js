'use strict';

$(document).ready(function () {
    var nav = $('.navbar')[0];
    requestAnimationFrame(navigationEffect);

    function navigationEffect(){
        if (window.scrollY >= 70) {
            nav.style.background = '#F6F6EF';
            nav.classList.add('nav-moveFromTopFade');
        } else {
            nav.style.background = "transparent";
            nav.classList.remove('nav-moveFromTopFade');
        }

        requestAnimationFrame(navigationEffect);
    }


    $("#search-btn").click(function(){
       var searchValue=$("#search-field").val().trim();
        $.ajax({
            "method": "get",
            "url": "https://edamam-recipe-search-and-diet-v1.p.mashape.com/search?_app_id=f97d9d3a&_app_key=0b7d993712a9cacc5d8846a0be403258&q=" + searchValue,
            "headers": {
                "X-Mashape-Key": "RT5n7xPUGLmshdaR8jZM8YCi2ELBp1PSjdMjsnlWep1IeNGIsi"
            },
            "dataType": "json"
        }).done(function (result) {
            displayResults(result);
        });
    });


    var wrapper = $("#wrapper > .row");

    $.ajax({
        "method": "get",
        "url": "https://edamam-recipe-search-and-diet-v1.p.mashape.com/search?_app_id=f97d9d3a&_app_key=0b7d993712a9cacc5d8846a0be403258&q=<required>",
        "headers": {
            "X-Mashape-Key": "RT5n7xPUGLmshdaR8jZM8YCi2ELBp1PSjdMjsnlWep1IeNGIsi"
        },
        "dataType": "json"
    }).done(function (result) {
        displayResults(result);
    });

    $("#dessert_filter").click(function () {
        $.ajax({
            "method": "get",
            "url": "https://edamam-recipe-search-and-diet-v1.p.mashape.com/search?_app_id=f97d9d3a&_app_key=0b7d993712a9cacc5d8846a0be403258&q=dessert",
            "headers": {
                "X-Mashape-Key": "RT5n7xPUGLmshdaR8jZM8YCi2ELBp1PSjdMjsnlWep1IeNGIsi"
            },
            "dataType": "json"
        }).done(function (result) {
            displayResults(result);
        });
    });

    $("#exotic_filter").click(function () {
        $.ajax({
            "method": "get",
            "url": "https://edamam-recipe-search-and-diet-v1.p.mashape.com/search?_app_id=f97d9d3a&_app_key=0b7d993712a9cacc5d8846a0be403258&q=exotic",
            "headers": {
                "X-Mashape-Key": "RT5n7xPUGLmshdaR8jZM8YCi2ELBp1PSjdMjsnlWep1IeNGIsi"
            },
            "dataType": "json"
        }).done(function (result) {
            displayResults(result);
        });
    });

    $("#pasta_filter").click(function () {
        $.ajax({
            "method": "get",
            "url": "https://edamam-recipe-search-and-diet-v1.p.mashape.com/search?_app_id=f97d9d3a&_app_key=0b7d993712a9cacc5d8846a0be403258&q=pasta",
            "headers": {
                "X-Mashape-Key": "RT5n7xPUGLmshdaR8jZM8YCi2ELBp1PSjdMjsnlWep1IeNGIsi"
            },
            "dataType": "json"
        }).done(function (result) {
            displayResults(result);
        });
    });

    $("#chicken_filter").click(function () {
        $.ajax({
            "method": "get",
            "url": "https://edamam-recipe-search-and-diet-v1.p.mashape.com/search?_app_id=f97d9d3a&_app_key=0b7d993712a9cacc5d8846a0be403258&q=chicken",
            "headers": {
                "X-Mashape-Key": "RT5n7xPUGLmshdaR8jZM8YCi2ELBp1PSjdMjsnlWep1IeNGIsi"
            },
            "dataType": "json"
        }).done(function (result) {
            displayResults(result);
        });
    });

    function displayResults(result){
        wrapper.empty();
        debugger;
        if(result.hits.length != 0) {
            var recipeCollection = result.hits;
            for (var i = 0; i < recipeCollection.length; i++) {
                var recipeData = recipeCollection[i].recipe;
                console.log(recipeData.summary);
                var recipeContainer = $("<article></article>").attr("class", "receipts-wrapper col-md-6 col-sm-6 col-xs-12");
                var title = $("<h1>" + recipeData.label + "</h1>").attr("class", "receipt_title");
                var difficulty = $("<span>Level: " + difficultyValue(recipeData.level) + "</span>").attr("class", "receipt_date");
                var img = $("<img>").attr("class", "receipt_img").attr("src", recipeData.image);
                var source = $("<p>Source: " + recipeData.source + "</p>").attr("class", "receipt_info");
                var calories = $("<p>Calories: " + recipeData.calories.toFixed(2) + "</p>").attr("class", "receipt_info");
                var dietLabels = $("<p>Diet Labels: " + recipeData.dietLabels + "</p>").attr("class", "receipt_info");
                var info = $("<a></a>").attr("class", "receipt_more-info").attr("href", "").text("More info");
                recipeContainer.append(title).append(difficulty).append(img);
                recipeContainer.append(source).append(calories).append(dietLabels);
                recipeContainer.append(info);
                wrapper.append(recipeContainer);
            }
        }else{
            wrapper.append("No results were found! Try again")
        }
    }

    function difficultyValue(value) {
        switch (value) {
            case "EASY":
                return "Easy";
                break;
            case "DIFFICULT":
                return "Difficult";
                break;
            case "MODERATE":
                return "Moderate";
                break;
            case "MODERATELY_EASY":
                return "Moderately easy";
                break;
            case "MODERATELY_DIFFICULT":
                return "Moderately difficult";
                break;
            case "VERY_DIFFICULT":
                return "Very difficult";
                break;
            default:
                return "unknown";
        }
    }
});