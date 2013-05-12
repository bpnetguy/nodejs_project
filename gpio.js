fs = require('fs');
var gpio = require("pi-gpio");
var toggle = function(pin, cb) {
    gpio.open(pin, "output", function(err) {        // Open pin pin for output
        gpio.write(pin, 1, function() {            // Set pin pin high (1)

	    setTimeout(function() {
    		gpio.write(pin, 0, function() {          
        		gpio.close(pin);
		});
	    },500);
        });
    });
};

exports.list = function(req, res){
	var data  = fs.readFileSync( process.env.PWD + '/pinTable.json', {encoding:"utf8"});
	//res.send(JSON.stringify(data));
	res.send(data);

};
exports.toggle = function(req, res){
    var pin = req.params.pin;
    toggle(parseInt(pin));
    res.send(JSON.stringify({status: "OK"}));
};

