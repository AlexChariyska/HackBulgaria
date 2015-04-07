var Paragraph = function (text) {
    this.text = text;
};

Paragraph.prototype.render = function () {
    return "\n\t<p>" + this.text + "</p>\n";
};

var Div = function () {
    var self = this;
    self.text = "";
    this.addChild = function (obj) {
        self.text += obj.render();
        return this;
    }
};

Div.prototype.render = function () {
    return "\n\t<div>" + this.text + "\t</div>";
};


var Table = function (data) {
    if ((data instanceof Array)) {
        data = convertToObj(data);
    }

    this.text = " <thead>\n\t<tr>\n";

    for (key in data) {
        this.text += "\t\t<th>" + key + "</th>\n";
    }
    this.text += "\t</tr>\n </thead>\n<tbody>\n";

    for (key in data) {
        this.text += "\t<tr>\n";
        for (var i = 0; i < data[key].length; i++) {
            this.text += "\t\t<td>" + data[key][i] + "</td>\n";
        }
        this.text += "\t</tr>\n";
    }
    this.text += "</tbody>\n";
};


Table.prototype.render = function () {
    return "<table>\n" + this.text + "</table>\n";
};

function convertToObj(data) {
    var res = {};
    var i = 0,
        k = 1;
    for (i; i < data[0].length; i++) {
        var column = data[0][i];
        res[column] = [];
    }
    for (k; k < data.length; k++) {
        for (var j = 0; j < data[0].length; j++) {
            res[data[0][j]].push(data[k][j]);
        }
    }
    return res;
}

var obj = {
    "name": ["Ivo", "Rado", "Maria"],
    "age": [22, 24, 22]
};

var Page = function (element) {
    this.text = element.render();
};

Page.prototype.render = function () {
    return "<html>" + this.text + "\n</html>";
};

var p = new Paragraph("Rolling in the deep");
var div = new Div();

div.addChild(new Div()).addChild(new Div()).addChild(p);

var page = new Page(div);
console.log(page.render());