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
                    
                var sentiment = self.setInterval(function(){ clock() }, 10000);
                function clock(){
                    if(localStorage.getItem('ip')){
                        $.get('http://'+localStorage.getItem('ip')+':3000/sentiment')
                        .success(function(data){
                            var happyness = data.nivo,
                                domi_happyness = $('#domi_happyness');
                            if(happyness < 3){
                                domi_happyness.addClass('icon-frown');
                                domi_happyness.removeClass('icon-meh'), domi_happyness.removeClass('icon-smile');
                            }else if(happyness < 5){
                                domi_happyness.addClass('icon-meh');
                                domi_happyness.removeClass('icon-frown'), domi_happyness.removeClass('icon-smile');
                            }else{
                                domi_happyness.addClass('icon-smile');
                                domi_happyness.removeClass('icon-meh'), domi_happyness.removeClass('icon-frown');
                            }
                        })
                    }
                }
                return this;
            }
            
        });
        
        return FooterView;
    }
);