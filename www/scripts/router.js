define(
    [
        'backbone',
        'views/headerView',
        'views/footerView',
        'views/home/homeView',
        'views/apps/configView',
        'views/apps/mapView',
        'views/apps/alertesView'
    ],
    
    function(Backbone,HeaderView,FooterView,HomeView,ConfigView,MapView,AlertesViews){

        var AppRouter = Backbone.Router.extend({
            
            routes: {
                '': 'home',
                'config': 'config',
                'map': 'map',
                'alertes': 'alertes'
            },
             
            app: {
                view : {

                }
            },
            
            home: function(){
                console.log("Routage vers la view home");
                homeView = new HomeView({router: this});
                this.app.view.headerView.hide_btn_back();
                homeView.render();
            },

            config: function(){
                console.log("Routage vers la view config");
                configView = new ConfigView({router: this})
                configView.render();
                this.app.view.headerView.show_btn_back();
            },

            map: function(){
                console.log("Routage vers la view map");
                mapView = new MapView({router: this})
                mapView.render();
                this.app.view.headerView.show_btn_back();
            },

            alertes: function(){
                console.log("Routage vers la view alertes");
                alertesView = new AlertesView({router: this})
                alertesView.render();
                this.app.view.headerView.show_btn_back();
            }
        });

        initialize = function(){
            var app_router = new AppRouter;
            app_router.app.view.headerView = new HeaderView({router: this});
            app_router.app.view.headerView.render();
            app_router.app.view.footerView = new FooterView({router: this});
            app_router.app.view.footerView.render();
            Backbone.history.start();
        };

        return {
            initialize: initialize
        };
    }
);