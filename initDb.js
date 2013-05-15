
var initData = [{"_id":7,"name":"Dining Room","description":"Outlet 1"},{"_id":11, "name": "Master Bedroom", "description":"Outlet 3"},{"_id":12,"name":"Garage","description":"Remote"},{"_id":15,"description":"Outlet 4"},{"_id":16,"description":"Outlet 5"},{"_id":18,"name":"Living Room","description":"Outlet 2"}];


var databaseUrl = "home_controller";
var collections = ["devices" ]
var db = require("mongojs").connect(databaseUrl, collections);

var i = 0;
for(i = 0 ; i <initData.length; i++) {
	var item = initData[i];
	item.status = "On";
	db.devices.save(item);
}

db.devices.find({name:"Dining Room"}, function(err, users) {
	if( err || !users) console.log("No female users found");
	else console.log(JSON.stringify(users));
});

