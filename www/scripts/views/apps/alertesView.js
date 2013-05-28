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
                'click #gmail_on_off' : 'switchEmail'
            },
            
            render: function(){
                this.$el.empty();
                this.$el.append(this.template());
                return this;
            },

            switchEmail: function(){
                $('#gmail_on_off').toggleClass('on');
            }
        });
        
        return AlertesView;
    }
);