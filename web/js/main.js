require.config({
  baseUrl: "./js",

  paths : {
    "backbone":"libs/backbone/backbone",
    "underscore":"libs/underscore/underscore",
    "pubsub": 'libs/jquery/jquery.pubsub',
    "swiper": 'libs/swiper/swiper',
    "text": 'libs/require/text'
  },
  shim: {
      'pubsub': {
          deps: ['jquery']
      },
      'swiper': {
          deps: ['jquery']
      }
  }

});
require(["jquery", 'app', 'swiper'], function($, app) {
    $(function() {
        app.initialize();
    });
});
