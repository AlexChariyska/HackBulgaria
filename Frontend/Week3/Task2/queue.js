/*queue.push(item) - pushes the item to the queue
 queue.pop() - returns the item on top of the queue
 queue.isEmpty() - returns true if the queue is empty*/

var queue = (function () {
    var result = [];

    return {
        "push": function (item) {
            result.push(item);
            return result;
        },
        "pop": function () {
            result.shift();
            return result[0];
        },
        "isEmpty": function () {
            return result.length===0;
        },
        "toString": function () {
            console.log(result);
        }
    }
})();

queue.push(1);

queue.push(2);

queue.push(3);

queue.pop();

queue.toString();


