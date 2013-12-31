var irisAPI = require('./irisAPI')

exports.list = function(req, res){
	res.send(JSON.stringify(data));
};

exports.turnOn = function(name, cb) {
   var dataItems = _.where(data, {name: name});
   _.each(dataItems, function(dataItem) {
      on(dataItem.id, function(pinData) {
         cb(pinData.status);
      });
   });

}

exports.turnOff = function(name, cb) {
   var dataItems = _.where(data, {name: name});
   if(name === "Everything") {
      dataItems = _.where(data, {status:"on"});
      recursiveOff(dataItems, 0);
      cb("off");
   } else {
      _.each(dataItems, function(dataItem) {
         off(dataItem.id, function(pinData) {
            cb(pinData.status);
         });
      });
   }

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
exports.list = function(req, res)  {
    irisAPI.list(
    { 
       error: function(){},
       success: function(data){
           res.send(data);
       },
    });
}

