//String prototypes
//Make the first letter of the string uppercase.
String.prototype.capitalize = function () {
    this[0] = this[0].toUpperCase();
};

String.prototype.capitalize = function () {
    this[0] = this[0].toUpperCase();
};

//Returns true if the string is an empty string or containing only empty strings.
String.prototype.isBlank = function () {
    return this.search(/\w/) === -1;
};

//Splits a string into array of words.
String.prototype.words = function () {
    return this.split(/\W/).filter(function (n) {
        return n != undefined && n != ""
    });
};

//format
String.prototype.format = function () {
    var str = "";
    for (var i = 0; i < this.length; i++) {
        str += this[i];
    }
    for (var k = 0; k < arguments.length; k++) {
        if (str.indexOf("{}") !== -1) {
            str = str.replace("{}", arguments[k]);
        } else {
            var arr = arguments[0];
            for (key in arr) {
                str = str.replace("{" + key + "}", arr[key]);
            }
        }
    }
    return str;
};


/*
 Array

 head returns the first element of the array.
 tail returns the array without the first element.
 last returns the last element of the array.*/

Array.prototype.head = function () {
    return this[0];
};

Array.prototype.tail = function () {
    return this.slice(1, this.length)
};

Array.prototype.last = function () {
    return this[this.length - 1];
};
//Range is a method of two arguments - start and end and returns a new array of all integers between [start, end]
Array.prototype.range = function (start, end) {
    var result = [];
    for (start; start <= end; start++) {
        result.push(start);
    }
    return result;
};

//Sum
Array.prototype.sum = function () {
    var result = 0;
    var i = 0;
    for (i; i < this.length; i++) {
        result += this[i];
    }
    return result;
};

//Product
Array.prototype.product = function () {
    var result = 1;
    var i = 0;
    for (i; i < this.length; i++) {
        result *= this[i];
    }
    return result;
};

Array.prototype.compact = function () {
    return this.filter(function (n) {
        return (n != undefined && n != "" && n === n );
    });
};

//take takes one argument - an integer value n, and returns the first n elements from the array
//drop takes one argument - an integer value n and returns a new array, where the first n elements are removed

Array.prototype.take = function (n) {
    if (n > this.length) {
        return this;
    }
    var result = [];
    for (var i = 0; i < n; i++) {
        result.push(this[i]);
    }
    return result;
};

Array.prototype.drop = function (n) {
    if (n > this.length) {
        return [];
    }
    var result = this;
    for (var i = 0; i < n; i++) {
        result.shift();
    }
    return result;
};

//dedup - Returns a new array where all duplicate elements are removed, leaving only one copy of each.

Array.prototype.dedup = function () {
    var result = [this[0]];
    this.sort();
    for (var i = 1; i < this.length; i++) {
        if (this[i] !== this[i - 1]) {
            result.push(this[i]);
        }

    }
    return result;
};

//sample - Returns a random sample from the array.
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

Array.prototype.sample = function () {
    var num = getRandomInt(0, this.length - 1);
    return this[num];
};