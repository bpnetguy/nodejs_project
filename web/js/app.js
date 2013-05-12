define(['backbone', 'ViewManager', 'router', 'views/menu/Menu'], function(Backbone, ViewManager, router, Menu) {

    return {
        initialize: function() {
            var el = $('<div class="swiper-container"></div>')[0];
            var viewManager = new ViewManager({el:el});
            router.setViewManager(viewManager);

            var menu = new Menu();
            $('body').append(menu.el).append(el);
            Backbone.history.start();
        }
    }
});

