var siri = require("siri");
var gpio = require('./gpio');
console.log("Starting siri..");

var on = /on|open/;
var off = /off|close/;

var handleSwitch=function(cmd, name, cb) {
   console.log("Handling Switch for " + name);
   if(on.test(cmd)) {
       gpio.turnOn(name, function(status) {
          cb(name + " is turned " + status);
       });      
   } else if(off.test(cmd)) {  
       gpio.turnOff(name, function(status) {
          cb(name + " is turned " + status);
       }) ;
   }
}


siri.createServer(function(cmd, dev) {
    cmd = cmd.toLowerCase().replace(/ /g,'');
    console.log(cmd);
    if (/hello/.test(cmd)) {
        dev.end("Siri proxy says hello to you");
    } else if(/tv/.test(cmd)) {
	handleSwitch(cmd, "TV System", function(msg){dev.end(msg)});
    } else if(/diningroom/.test(cmd)) {
	handleSwitch(cmd, "Dining Room", function(msg){dev.end(msg)});
    } else if(/masterbedroom/.test(cmd)) {
	handleSwitch(cmd, "Master Bedroom", function(msg){dev.end(msg)});
    } else if(/garage/.test(cmd)) {
	handleSwitch(cmd, "Garage", function(msg){dev.end(msg)});
    } else if(/livingroom/.test(cmd)) {
	handleSwitch(cmd, "Living Room", function(msg){dev.end(msg)});
    } else {
        dev.proxy();
    }
}).start();

