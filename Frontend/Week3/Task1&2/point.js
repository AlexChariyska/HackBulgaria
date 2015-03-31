/*
 All the three components - x, y and z should be private with only getters - getX(), getY(), getZ().
 Our point should have a method, called move(dx, dy, dz), which mutates our point in the following way: x = x + dx, y = y + dy, z = z + dz.
*/

function MutablePoint3d(x, y, z) {
    this.getX = function () {
        return x;
    };

    this.getZ = function () {
        return z;
    };

    this.getY = function () {
        return y;
    };

    this.move = function (dx, dy, dz) {
        x += dx;
        y += dy;
        z += dz;
    }
}

MutablePoint3d.prototype.toString = function () {
    return "(" + this.getX() + ", " + this.getY() + ", " + this.getZ() + ")"
};


function ImmutablePoint3d(x,y,z){
    this.getX = function () {
        return x;
    };

    this.getZ = function () {
        return z;
    };

    this.getY = function () {
        return y;
    };
}

ImmutablePoint3d.prototype.toString = function () {
    return "(" + this.getX() + ", " + this.getY() + ", " + this.getZ() + ")"
};

//Creates a new point with new parameters. This is the only difference with the MutablePoint3d
ImmutablePoint3d.prototype.move = function () {
    return new ImmutablePoint3d(this.getX()+dx,this.getY()+dy,this.getZ()+dz);
};

var p1 = new MutablePoint3d(0, 0, 0);
p1.move(0, 0, -1);
console.log(p1.toString());
