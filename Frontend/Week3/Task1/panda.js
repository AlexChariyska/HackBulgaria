function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Panda(name, sex, weight) {
    var sexVariables = ['male', 'female'];
    this.name = name || "";
    if (sexVariables.indexOf(sex) == -1) {
        this.sex = "female";
    } else {
        this.sex = sex || "female";
    }
    this.weight = 20 || weight;
    this.isLazy = false;
}

Panda.prototype.toString = function () {
    console.log(this.name + " is a " + this.sex + " panda which weights " + this.weight + " kg");
};

Panda.prototype.isMale = function () {
   return this.sex === "male";
};

Panda.prototype.isFemale = function () {
    return this.sex === "female";
};

Panda.prototype.eat = function (bamboo) {
    this.weight += bamboo / 2;

    if (this.weight >= 80 && !this.isLazy) {
        this.name = "Lazy Panda " + this.name;
        this.isLazy = true;
    }
};


Panda.prototype.mate = function (anotherPanda) {
    var motherName =this.sex === "female"?this.name + " " + anotherPanda.name:anotherPanda.name + " " + this.name;
    var fatherName=this.sex === "male"?this.name + " " + anotherPanda.name:anotherPanda.name + " " + this.name;

    if (this.isFemale() === anotherPanda.isFemale()) {
        throw new CannotMatePandas();
    }

    babySex = ["female","male"][getRandomInt(0,2)];

    babyName={
        "female":motherName,
        "male":fatherName
    }[babySex];

    return new Panda(babyName, babySex);
};

function CannotMatePandas() {
    console.log("Cannot mate pandas");
}
var ivo = new Panda("Ivo", "male");
ivo.eat(200);
console.log(ivo.name)

var ivan = new Panda("Ivan", "male");
var ivanka = new Panda("Ivanka", "female");

var baby = ivan.mate(ivanka);
console.log(ivan);
console.log(ivanka);
console.log(baby);
