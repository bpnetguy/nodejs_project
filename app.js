var express = require('express'),
    app = express()
  , http = require('http')
  , server = http.createServer(app);

var base = "";


app.configure(function(){
    app.use(express.static(__dirname + '/web'));
    app.use(function(req, res, next) {
      res.contentType('application/json');
      next();
    });
    app.use(express.cookieParser());
    app.use(express.session({secret: 'secret', key: 'express.sid'}));
});

require('./siri');
var gpio  = require('./gpio');
var iris  = require('./iris');

app.get(base + '/gpio/list', gpio.list);
app.get(base + '/gpio/on/:pin', gpio.RESTOn);
app.get(base + '/gpio/off/:pin', gpio.RESTOff);

app.get(base + '/iris/list', iris.list);
app.get(base + '/iris/on/:pin', iris.RESTOn);
app.get(base + '/iris/off/:pin', iris.RESTOff);

server.listen(process.env.PORT || 3000);
