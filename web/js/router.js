define(['backbone', 'views/HomeController'], function(Backbone, HomeController) {
    var AppRouter = Backbone.Router.extend({
        routes: {
            "home": "defaultRoute",
            "*actions": "defaultRoute"
        },
        setViewManager: function(viewManager) {
            this.viewManager = viewManager;
        },
        defaultRoute: function() {
            var homeController = new HomeController();
            this.viewManager.showView(homeController);
        }
    });
    // Initiate the router

    // Start Backbone history a necessary step for bookmarkable URL's
    var appRouter = new AppRouter();
    return appRouter;
});

