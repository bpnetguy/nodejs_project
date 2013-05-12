define(['backbone', 'collections/GPIO', './GPIO' ]
, function (Backbone, GPIOCollection, GPIOView){
    var HomeController = Backbone.View.extend({
        id:"homeController",
	className: "swiper-wrapper",
	events: {
		"click .button": "toggle"
	},
        initialize: function() {
            this.collection = new GPIOCollection();
            this.collection.on("add", this.add,this);
            this.collection.on("sync", this.done,this);
            this.collection.on("error", this.error,this);
	    this.collection.fetch();

        },
	toggle: function(evt) {
		var id = evt.target.getAttribute('id');
		this.collection.get(id).fetch();
	},
	error: function() {
	    console.error("something is wrong");
	},
	add: function(model) {
			var gpioView = new GPIOView({model: model});
			gpioView.render();
			this.$el.append(gpioView.$el);
	},
	done: function(id) {
		var self = this;
		/**
		$.each(this.collection.models, function(index, item) {
			var gpioView = new GPIOView({model: item});
			gpioView.render();
			self.$el.append(gpioView.$el);
		});
		*/
		if(this.swiped) {
		} else {
			$('.swiper-container').swiper({
				mode:'horizontal',
				loop: true
			});
			this.swiped=true;
		}
	},
        render: function() {
        }

    });
    return HomeController;
});
