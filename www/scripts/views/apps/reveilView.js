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
                    $(this).toggleClass('active');
                });

                $('#hour_input').change(function(){
                    var reveil = $(this).val();
                    var reveil_heure = reveil.substr(0,2),
                        reveil_minutes = reveil.substr(3,2);
                    $('#hours').text(reveil_heure), $('#minutes').text(reveil_minutes);
                    if(localStorage.getItem('reveil') == 'on'){
                        // envoyer à Domi la nouvelle heure
                        $.post('http://'+localStorage.getItem('ip')+':3000/reveil', {
                            'hour': reveil_heure,
                            'minutes': reveil_minutes
                        })
                        .success(function(data){
                            navigator.notification.vibrate(500);
                         }.bind(this))
                        .error(function(error){
                            navigator.notification.alert(error, null, 'Alarme')
                        });
                    }
                });
                return this;
            },

            switchReveil: function(){
                $('#reveil_on_off').toggleClass('on');
                if(localStorage.getItem('reveil') == 'on'){
                    localStorage.setItem('reveil', 'off');
                }else{
                    localStorage.setItem('reveil', 'on');
                    navigator.notification.vibrate(500);
                }
            }
        });
        
        return ReveilView;
    }
);