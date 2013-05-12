var express = require('express'),
    app = express()
  , http = require('http')
  , server = http.createServer(app);


app.configure(function(){
    app.use(express.static(__dirname + '/web'));
    app.use(function(req, res, next) {
      res.contentType('application/json');
      next();
    });
    app.use(express.cookieParser());
    app.use(express.session({secret: 'secret', key: 'express.sid'}));
});

var gpio  = require('./gpio');

app.get('/gpio/list', gpio.list);
app.get('/gpio/toggle/:pin', gpio.toggle);

server.listen(process.env.PORT || 3000);
