var express = require("express");
var app = express();
var routes  = require('./routes');

app.get('/rest', routes.index);

app.listen(3000);
console.log('Listening on port 3000');
