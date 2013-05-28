define(
    [
        'backbone',
        'vendor/BaseView'
    ],
    
    function(Backbone,BaseView){
        
        var FooterView = BaseView.extend({
            
            initialize: function(){
                
            },
            
            el: '#main_container',
            
            events: {
            },
            
            render: function(){
                html = "<section id='footer_container'><footer id='footer'></footer></section>";
                this.$el.append(html);
                return this;
            }
            
        });
        
        return FooterView;
    }
);