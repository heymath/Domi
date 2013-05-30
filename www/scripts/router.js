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
    
    function(Backbone,HeaderView,FooterView,HomeView,ConfigView,MapView,AlertesView){

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
                this.app.view.home = new HomeView({router: this});
                this.app.view.home.render();
                this.app.view.headerView.hide_btn_back();
                $('#footer_container').css('top', (window.screen.height-34)+'px');
            },

            config: function(){
                console.log("Routage vers la view config");
                this.app.config = new ConfigView({router: this})
                this.app.config.render();
                this.app.view.headerView.show_btn_back();
            },

            map: function(){
                console.log("Routage vers la view map");
                this.app.map = new MapView({router: this})
                this.app.map.render();
                this.app.view.headerView.show_btn_back();
            },

            alertes: function(){
                console.log("Routage vers la view alertes");
                if(this.app.alertes == null){
                    this.app.alertes = new AlertesView({router: this});
                    this.app.alertes.render();
                }else{
                    this.app.alertes.render();
                }
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