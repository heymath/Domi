define(
    [
        'backbone',
        'vendor/BaseView'
    ],
    
    function(Backbone,BaseView){
        
        var FooterView = BaseView.extend({
            
            initialize: function(){
                console.log(navigator.language);
            },
            
            el: '#main_container',
            
            events: {
            },
            
            render: function(){
                html = "<section id='footer_container'><header id='footer'></header></section>";
                this.$el.append(html);
                return this;
            }
            
        });
        
        return FooterView;
    }
);