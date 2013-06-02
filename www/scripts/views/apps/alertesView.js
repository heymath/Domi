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
                'click #gmail_on_off' : 'switchGmail',
                'submit' : 'setGmail'
            },
            
            render: function(){
                this.$el.empty();
                this.$el.append(this.template());
                if(localStorage.getItem('gmail') == 'on'){
                    $('#gmail_on_off').addClass('on');
                }
                return this;
            },

            switchGmail: function(){
                $('#gmail_on_off').toggleClass('on');
                if(localStorage.getItem('gmail') == 'on'){
                    localStorage.setItem('gmail', 'off');
                }else{
                    localStorage.setItem('gmail', 'on');
                }
            },

            setGmail: function(){
                var gmailLogin = this.$el.find('input[name="gmailLogin"]').val(),
                    gmailPassword = this.$el.find('input[name="gmailPassword"]').val(),
                    errors = 0;
                errors = this.formCheck(gmailLogin);
                errors += this.formCheck(gmailPassword);
                if(errors > 0){
                    navigator.notification.alert('Formulaire invalide', null, 'Alerte');
                }else{
                    navigator.notification.alert('Formulaire valide', null, 'Alerte');
                    
                    $.post('http://'+localStorage.getItem('ip')+':3000/gmail/',{user:gmailLogin, password:gmailPassword})
                    .success(function(data){
                        navigator.notification.alert('Identifiants sauvegardés', null, 'Gmail');
                     }.bind(this))
                    .error(function(error){
                        navigator.notification.alert(error.responseText, null, 'Gmail')
                    });
                }
                return false;
            },

            formCheck: function(field){
                if(field === null || field === '')
                    return 1;
                return 0;
            }
        });
        
        return AlertesView;
    }
);