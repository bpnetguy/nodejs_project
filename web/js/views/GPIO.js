define(['backbone', 'text!templates/gpio.html']
, function (Backbone, gpioTemplate){
    var HomeController = Backbone.View.extend({
	events: {
		"click .button": "toggle"
	},
	toggle: function() {
		console.log("Toggle");
	},
	template: _.template(gpioTemplate),
	className: "swiper-slide",
        render: function() {
	      this.$el.html(this.template(this.model.attributes));
        }

    });
    return HomeController;
});
