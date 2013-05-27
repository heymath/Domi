define(
    [
        'backbone',
        'vendor/BaseView',
        'text!templates/apps/alertes.html'
    ],
    
    function(Backbone,BaseView,alertesTemplate){
        
        var AlertesView = BaseView.extend({
            
            initialize: function(){
                
            },
            
            el: '#view',

            template: _.template(alertesTemplate),

            events: {
                
            },
            
            render: function(){
                this.$el.empty();
                this.$el.append(this.template());
                return this;
            }
        });
        
        return AlertesView;
    }
);