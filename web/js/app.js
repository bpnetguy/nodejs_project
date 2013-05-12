define(['backbone', 'ViewManager', 'router'], function(Backbone, ViewManager, router) {

    return {
        initialize: function() {
            var el = $('<div class="swiper-container"></div>')[0];
            var viewManager = new ViewManager({el:el});
            router.setViewManager(viewManager);

            $('body').append(el);
            Backbone.history.start();
        }
    }
});

