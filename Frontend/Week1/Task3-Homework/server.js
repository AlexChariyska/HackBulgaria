var fs = require("fs");
var express = require('express');

var app = express();

app.use(express.static('public'));
app.set('views', './views');
app.set('view engine', 'jade');

app.get('/', function (req, res) {
    res.render('index', { name: 'Hack'});
});

// listen for files: /post -> /views/post.jade
app.get("/:fileName", function(req, res, next){
    if(req.params && req.params.fileName && fs.existsSync(__dirname+"/views/"+req.params.fileName+".jade")){
        res.render(req.params.fileName);
    } else {
        next();
    }
})
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port)
});