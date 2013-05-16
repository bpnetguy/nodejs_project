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
        initialize: function() {
              this.model.on("change", this.render, this);
        },
        render: function() {

	      this.$el.html(this.template(this.model.attributes)).find(".button").removeClass("on off").addClass(this.model.attributes.status);
        }

    });
    return HomeController;
});
