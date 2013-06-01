define(
    [
        'backbone',
        'vendor/BaseView',
        'text!templates/apps/config.html'
    ],
    
    function(Backbone,BaseView,configTemplate){
        
        var ConfigView = BaseView.extend({
            
            initialize: function(){
                this.statut();
            },
            
            el: '#view',

            template: _.template(configTemplate),

            events: {
              'submit #setIp' : 'setIp' 
            },
            
            statut : function(){
              $.get("http://"+localStorage.getItem('ip')+":3000/statut")
                .success(function(datas){
                 alert('Domy est disponible');
                })
                .error(function(error){
                  alert('Domy a disparu');
              });
            },
            
            setIp: function(){
              var ip = this.$el.find('input[name="ip"]').val();
              $.get("http://"+ip+":3000/statut")
                .success(function(datas){
                 localStorage.setItem('ip',ip);
                 alert("L'ip est configuré");
                })
                .error(function(error){
                  alert("Impossible de joindre l'ip");
              });
                return false;
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