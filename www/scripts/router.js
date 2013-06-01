define(
    [
        'backbone',
        'views/headerView',
        'views/footerView',
        'views/home/homeView',
        'views/apps/configView',
        'views/apps/mapView',
        'views/apps/alertesView',
        'views/apps/reveilView'
    ],
    
    function(Backbone,HeaderView,FooterView,HomeView,ConfigView,MapView,AlertesView,ReveilView){

        var AppRouter = Backbone.Router.extend({
            
            routes: {
                '': 'home',
                'config': 'config',
                'map': 'map',
                'alertes': 'alertes',
                'reveil': 'reveil'
            },
             
            app: {
                view : {

                }
            },
            
            home: function(){
                console.log("Routage vers la view home");
                if(this.app.view.home == null){
                    this.app.view.home = new HomeView({router: this});
                }
                this.app.view.home.render();
                this.app.view.headerView.hide_btn_back();
                $('#footer_container').css('top', (window.screen.height-34)+'px');
            },

            config: function(){
                console.log("Routage vers la view config");
                if(this.app.view.config == null){
                    this.app.view.config = new ConfigView({router: this})
                }
                this.app.view.config.render();
                this.app.view.headerView.show_btn_back();
            },

            map: function(){
                console.log("Routage vers la view map");
                if(this.app.view.map == null){
                    this.app.view.map = new MapView({router: this})
                }
                this.app.view.map.render();
                this.app.view.headerView.show_btn_back();
            },

            alertes: function(){
                console.log("Routage vers la view alertes");
                if(this.app.view.alertes == null){
                    this.app.view.alertes = new AlertesView({router: this});
                }
                this.app.view.alertes.render();
                this.app.view.headerView.show_btn_back();
            },

            reveil: function(){
                console.log("Routage vers la view réveil");
                if(this.app.view.reveil == null){
                    this.app.view.reveil = new ReveilView({router: this})
                }
                this.app.view.reveil.render();
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