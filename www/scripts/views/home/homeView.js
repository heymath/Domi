define(
    [
        'backbone',
        'vendor/BaseView',
        'text!templates/home/home.html'
    ],
    
    function(Backbone,BaseView,homeTemplate){
        
        var HomeView = BaseView.extend({
            
            initialize: function(){
                if(localStorage.getItem('gmail') == 'on'){
                    $.post('http://'+localStorage.getItem('ip')+':3000/gmailStatut', { statut :'true' });
                }else{
                    $.post('http://'+localStorage.getItem('ip')+':3000/gmailStatut', { statut : 'false' });
                }
                if(localStorage.getItem('reveil') == 'on'){
                    $.post('http://'+localStorage.getItem('ip')+':3000/reveilStatut', { statut : 'true' });
                }else{
                    $.post('http://'+localStorage.getItem('ip')+':3000/reveilStatut', { statut : 'false' });
                }
            },
            
            el: '#view',

            template: _.template(homeTemplate),

            events: {
                'click #micro' : 'captureAudio'
            },

            render: function(){
                this.$el.empty();
                this.$el.append(this.template());
                $('#view').removeClass('no_padding');
                return this;
            },

            captureAudio : function(){
            
              $.get("http://"+localStorage.getItem('ip')+":3000/statut")
                .success(function(datas){
                    navigator.device.capture.captureAudio(this.captureSuccess.bind(this), this.captureError, { limit: 1, duration: 10});
                }.bind(this))
                .error(function(error){
                    alert('Domi a disparu, vous devez changer l\'adresse IP dans config !');
              });               
            },
            

            captureSuccess : function(e){
                var i, len;
                for (i = 0, len = e.length; i < len; i += 1) {
                     this.uploadFile(e[i],self);
                }
                navigator.notification.vibrate(500);
            },
                     
            captureError : function(error){
                
            },
                    
            uploadFile : function(media) {
                var ft = new FileTransfer(),
                path = media.fullPath,
                name = media.name;

                ft.upload(path,"http://"+localStorage.getItem('ip')+":3000/domi",function(result) {
                   console.log('Upload success: ' + result.responseCode);
                   console.log(result.bytesSent + ' bytes sent');
                   },
                   function(error) {
                       console.log('Error uploading file ' + path + ': ' + error.code);
                   },
                   { fileName: name }
                );        
            }
        });
        
        return HomeView;
    }
);