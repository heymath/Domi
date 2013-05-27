define(
    [
        'backbone',
        'vendor/BaseView',
        'text!templates/apps/config.html'
    ],
    
    function(Backbone,BaseView,configTemplate){
        
        var ConfigView = BaseView.extend({
            
            initialize: function(){
                
            },
            
            el: '#view',

            template: _.template(configTemplate),

            events: {
                
            },
            
            render: function(){
                this.$el.empty();
                this.$el.append(this.template());
                return this;
            }
        });
        
        return ConfigView;
    }
);