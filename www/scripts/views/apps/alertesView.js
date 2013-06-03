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
                // désactive Gmail
                if(localStorage.getItem('gmail') == 'on'){
                    $('#gmail_on_off').toggleClass('on');
                    // désactive l'app et l'API Gmail
                    localStorage.setItem('gmail', 'off');
                    $.post('http://'+localStorage.getItem('ip')+':3000/gmailStatut', { statut : 'false' });
                }
                // active Gmail
                else{
                    // si les logins Gmail sont bien paramétrés
                    if(localStorage.getItem('gmailLogin') && localStorage.getItem('gmailPassword')){
                        $('#gmail_on_off').toggleClass('on');
                        // active l'app et l'API Gmail
                        localStorage.setItem('gmail', 'on');
                        $.post('http://'+localStorage.getItem('ip')+':3000/gmailStatut', { statut : 'true' });
                        navigator.notification.vibrate(500);
                        // connexion à la boîte mail
                        var gmailLogin = localStorage.getItem('gmailLogin'),
                            gmailPassword = localStorage.getItem('gmailPassword');
                        $.post('http://'+localStorage.getItem('ip')+':3000/gmail/', { user: gmailLogin, password: gmailPassword })
                        .success(function(data){
                            navigator.notification.vibrate(500);
                         }.bind(this))
                        .error(function(error){
                            navigator.notification.alert(error.responseText, null, 'Gmail')
                        });
                    }
                    // si les logins Gmail ne sont pas paramétrés
                    else{
                        navigator.notification.alert('Tu ne m\'a pas donné tes identifiants Gmail.', null, 'Attention !');
                    }
                }
            },

            setGmail: function(){
                var gmailLogin = this.$el.find('input[name="gmailLogin"]').val(),
                    gmailPassword = this.$el.find('input[name="gmailPassword"]').val(),
                    errors = 0;
                errors = this.formCheck(gmailLogin);
                errors += this.formCheck(gmailPassword);
                // si erreur
                if(errors > 0){
                    navigator.notification.alert('Tu as mal rempli le formulaire.', null, 'Attention !');
                }else{
                    navigator.notification.vibrate(500);
                    localStorage.setItem('gmailLogin', gmailLogin);
                    localStorage.setItem('gmailPassword', gmailPassword);
                }
                return false;
            },

            formCheck: function(field){
                if(field == null || field === '')
                    return 1;
                return 0;
            }
        });
        
        return AlertesView;
    }
);