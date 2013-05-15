var fs = require('fs');
var gpio = require("pi-gpio");
/*
var files  = fs.readdirSync('/sys/devices/virtual/gpio/');

for(var i=0;i < files.length; i++) {
    var match = files[i].match(/gpio(\d+)/);
    if(match && match[1]) {
        console.log("closing '" + match[1] + "'");
        gpio.close(parseInt(match[1]));
    }

}
*/
var toggle = function(pin, cb) {
    gpio.open(pin, "output", function(err) {        // Open pin pin for output
	if(err) {
		cb.error(err);
		return;
	}
        gpio.write(pin, 1, function() {            // Set pin pin high (1)

	    setTimeout(function() {
    		gpio.write(pin, 0, function() {          
        		gpio.close(pin);
			cb.success();
		});
	    },500);
        });
    });
};


var filename = process.env.APPLICATION_DIRECTORY +  '/pinTable.json';
var data = JSON.parse(fs.readFileSync(filename, {encoding:"utf8"}));
var criticalArea = 0;

var persist = function(data) {
	fs.writeFileSync(filename,JSON.stringify(data));	
};

exports.list = function(req, res){
	res.send(JSON.stringify(data));
};

exports.on = function(req, res){
    var pin = req.params.pin;
    var pinData = data[pin];
    if(criticalArea || pinData.status === "on") {
        res.send(JSON.stringify(pinData));
        return;
    }
    criticalArea = 1;
    pinData.status = "on";
    toggle(parseInt(pin), {success:function() {
         persist(data);
        res.send(JSON.stringify(pinData));
        criticalArea = 0;
    }, error: function(err) {
        pinData.status ="off";
        res.send(JSON.stringify(pinData));
        criticalArea = 0;
    }});

};
exports.off = function(req, res){
    var pin = req.params.pin;
    var pinData = data[pin];
    if(criticalArea || pinData.status === "off") {
        res.send(JSON.stringify(pinData));
        return;
    }
    criticalArea = 1;
    pinData.status = "off";
    toggle(parseInt(pin), {success:function() {
         persist(data);
    	res.send(JSON.stringify(pinData));
    	criticalArea = 0;
    }, error: function(err) {
	pinData.status ="on";
    	res.send(JSON.stringify(pinData));
    	criticalArea = 0;
    }});
};
exports.toggle = function(req, res){
    var pin = req.params.pin;
    toggle(parseInt(pin));
    res.send(JSON.stringify({status: "OK"}));
};

