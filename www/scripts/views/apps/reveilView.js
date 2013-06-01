define(
    [
        'backbone',
        'vendor/BaseView',
        'text!templates/apps/reveil.html'
    ],
    
    function(Backbone,BaseView,reveilTemplate){
        
        var ReveilView = BaseView.extend({
            
            initialize: function(){
                
            },
            
            el: '#view',

            template: _.template(reveilTemplate),

            events: {
                'click #reveil_on_off' : 'switchReveil',
            },
            
            render: function(){
                this.$el.empty();
                this.$el.append(this.template());
                if(localStorage.getItem('reveil') == 'on'){
                    $('#reveil_on_off').addClass('on');
                }
                $('#days span').click(function(){
                    if($(this).hasClass('active')){
                        $(this).removeClass('active');
                    }else{
                        $(this).addClass('active');
                    }
                });
                $('#hour_btn').click(function(){
                    $('#hour_input').click();
                    console.log('yo');
                });
                return this;
            },

            switchReveil: function(){
                $('#reveil_on_off').toggleClass('on');
                if(localStorage.getItem('reveil') == 'on'){
                    localStorage.setItem('reveil', 'off');
                }else{
                    localStorage.setItem('reveil', 'on');
                }
            }
        });
        
        return ReveilView;
    }
);