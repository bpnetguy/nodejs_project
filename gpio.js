var fs = require('fs');
var gpio = require("pi-gpio");
var _ = require("underscore");
console.log('Starting gpio ...');
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


var filename = (process.env.APPLICATION_DIRECTORY || process.env.PWD) +  '/pinTable.json';
var data = JSON.parse(fs.readFileSync(filename, {encoding:"utf8"}));
var criticalArea = 0;

var persist = function(data) {
	fs.writeFileSync(filename,JSON.stringify(data));	
};

var on = function(pin, done){
    var pinData = data[pin];
    if(criticalArea || pinData.status === "on") {
        done(pinData);
        return;
    }
    criticalArea = 1;
    pinData.status = "on";
    toggle(parseInt(pin), {success:function() {
        persist(data);
        done(pinData);
        criticalArea = 0;
    }, error: function(err) {
        pinData.status ="off";
        done(pinData);
        criticalArea = 0;
    }});

};
var off = function(pin, done){
    var pinData = data[pin];
    if(criticalArea || pinData.status === "off") {
        done(pinData);
        return;
    }
    criticalArea = 1;
    pinData.status = "off";
    toggle(parseInt(pin), {success:function() {
        persist(data);
    	done(pinData);
    	criticalArea = 0;
    }, error: function(err) {
	pinData.status ="on";
    	done(pinData);
    	criticalArea = 0;
    }});
};

exports.list = function(req, res){
	res.send(JSON.stringify(data));
};

exports.turnOn = function(name, cb) {
   var dataItem = _.where(data, {name: name})[0];
   on(dataItem.id, function(pinData) {
      cb(pinData.status);
   });

}
/* 
 * name: Device Name
 * cb(status="on" || "off")
 */
exports.turnOff = function(name, cb) {
   var dataItem = _.where(data, {name: name})[0];
   off(dataItem.id, function(pinData) {
      cb(pinData.status);
   });

}
exports.RESTOn = function(req, res){
    var pin = req.params.pin;
    on(pin, function(pinData) {
        res.send(JSON.stringify(pinData));    
    });
}
exports.RESTOff = function(req, res){
    var pin = req.params.pin;
    off(pin, function(pinData) {
        res.send(JSON.stringify(pinData));    
    });
}

