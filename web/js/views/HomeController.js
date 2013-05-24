define(['jquery','backbone', 'collections/GPIO', './GPIO' ]
, function ($, Backbone, GPIOCollection, GPIOView){
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
            var self = this;
            $(function(){
                $(document).on('keydown',function(evt) {self.keyPress(evt)});
            });

        },
	toggle: function(evt) {
		var id = evt.target.getAttribute('id');
		$('#overlay')[0].style['display'] = "block";
		this.collection.get(id).fetch({success: function() {
			$('#overlay')[0].style['display'] = "none";
                   }});
	},
	error: function() {
	    console.error("something is wrong");
	},
	add: function(model) {
			var gpioView = new GPIOView({model: model});
			gpioView.render();
			this.$el.append(gpioView.$el);
	},
        keyPress: function(evt) {
            if(evt.keyCode === 39) {
                this.swiper.swipeNext();
            } else if(evt.keyCode === 37) {
                this.swiper.swipePrev();
            }
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
		if(this.swiper) {
		} else {
			this.swiper=$('.swiper-container').swiper({
				mode:'horizontal',
				loop:false
			});
		}
	},
        render: function() {
        }

    });
    return HomeController;
});
