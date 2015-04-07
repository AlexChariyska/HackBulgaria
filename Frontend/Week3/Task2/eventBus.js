var bus = (function () {
    var result = [];
    return {
        "on": function (eventName, callback) {

            if (!result.hasOwnProperty(eventName)) {
                result[eventName] = [];
            }
            result[eventName].push(callback);

            return result;
        },
        "remove": function (eventName) {
            delete result[eventName];
        },
        "trigger": function (eventName) {
            var value = result[eventName];
            for (key in  result[eventName]) {
                value[key]();
            }
        }
    }
})();


bus.on("PANIC_EVENT", function () {
    console.log("PANIC_EVENT HAPPENED!")
});

bus.on("PANIC_EVENT", function () {
    console.log("PANIC_EVENT HAPPENED AGAIN!");
});

bus.trigger("PANIC_EVENT");


