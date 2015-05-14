'use strict';

$(document).ready(function () {
    var recipeCollection = {};
    var nav = $('.navbar')[0];
    requestAnimationFrame(navigationEffect);

    function navigationEffect() {
        if (window.scrollY >= 70) {
            nav.style.background = '#F6F6EF';
            nav.classList.add('nav-moveFromTopFade');
        } else {
            nav.classList.remove('nav-moveFromTopFade');
        }

        requestAnimationFrame(navigationEffect);
    }


    $("#search-btn").click(function () {
        var searchValue = $("#search-field").val().trim();
        filterRequest(searchValue);
    });


    var wrapper = $("#recipesList");

    var cookingRequest = new Resource("https://edamam-recipe-search-and-diet-v1.p.mashape.com/search?_app_id=f97d9d3a&_app_key=0b7d993712a9cacc5d8846a0be403258&q=<required>",
        {"X-Mashape-Key": "RT5n7xPUGLmshdaR8jZM8YCi2ELBp1PSjdMjsnlWep1IeNGIsi"});

    cookingRequest.query().then(function (result) {
        displayResults(result);
    });


    $("#dessert_filter").click(function () {
        filterRequest('dessert');
    });

    $("#exotic_filter").click(function () {
        filterRequest('exotic');
    });

    $("#pasta_filter").click(function () {
        filterRequest('pasta');
    });

    $("#chicken_filter").click(function () {
        filterRequest('chicken');
    });

    function displayWithJade(container, fileName, data) {

        return Q($.get(fileName)).then(function (jadeString) {
            var renderedHtml = jade.render(jadeString, data);
            container.html(renderedHtml);
        })
    }

    function addEventOnBtns() {
        for (var i = 0; i < recipeCollection.length; i++) {
            var dataId = recipeCollection[i].recipe.calories;
            $("[data-id='" + dataId + "']").click(function (event) {
                var recipe = findRecipe(event.target.getAttribute('data-id'));
                return displayRecipe(recipe)
            })
        }
    }

    function findRecipe(searched) {
        for (var i = 0; i < recipeCollection.length; i++) {
            var lookedFrom = recipeCollection[i].recipe.calories;
            if(searched == lookedFrom){
                return recipeCollection[i].recipe;
            }
        }
    }


    function displayResults(result) {
        wrapper.empty();
        if (result.hits.length != 0) {
            recipeCollection = result.hits;
            return displayWithJade(wrapper, "/views/recipes.jade", {
                recipes: result.hits
            }).then(function () {
                addEventOnBtns()
            });

        } else {
            wrapper.append("No results were found! Try again")
        }
    }


    function displayRecipe(data) {
        wrapper.empty();
        return displayWithJade(wrapper, "/views/recipe.jade", {
            recipe: data
        });
    }


    function filterRequest(search) {
        var cookingFilter = new Resource("https://edamam-recipe-search-and-diet-v1.p.mashape.com/search?_app_id=f97d9d3a&_app_key=0b7d993712a9cacc5d8846a0be403258&q=" + search,
            {"X-Mashape-Key": "RT5n7xPUGLmshdaR8jZM8YCi2ELBp1PSjdMjsnlWep1IeNGIsi"});
        cookingFilter.query().then(function (result) {
            displayResults(result)
        });
    }
});