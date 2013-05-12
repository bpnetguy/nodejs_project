/**
 * Created with IntelliJ IDEA.
 * User: bphan
 * Date: 4/13/13
 * Time: 11:46 AM
 * To change this template use File | Settings | File Templates.
 */

define(['backbone'], function (Backbone){
    var GPIO = Backbone.Model.extend({
        defaults: {
        },
	url: function() {
		return "../gpio/toggle/" + this.get('id');
	}
    });
    return GPIO;
});
