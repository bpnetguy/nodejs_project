define(['underscore', 'backbone'], function(_, Backbone){
    _.extend(Backbone.View.prototype, {
      close: function(){
        this.remove();
        this.unbind();
      }
    });

    var ViewManager = (function(){
    
        function ViewManager(options){
          this.currentView = null;
          this.$el = $(options.el);
        };
        
        ViewManager.prototype = {
        
          showView: function(view){
            if(this.currentView){
              this.currentView.close();
            }
            this.currentView = view;
            this.currentView.render();
        
            this.$el.html(this.currentView.el);
          },
          setElement: function(el) {
              this.$el = $(el);
          }
        
        };
        
        return ViewManager;
    
    })();

    return ViewManager;
});