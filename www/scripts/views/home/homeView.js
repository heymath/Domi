define(
    [
        'backbone',
        'vendor/BaseView',
        'text!templates/home/home.html'
    ],
    
    function(Backbone,BaseView,homeTemplate){
        
        var HomeView = BaseView.extend({
            
            initialize: function(){

            },
            
            el: '#view',

            template: _.template(homeTemplate),

            events: {
                'click #micro' : 'captureAudio'
            },
            
            render: function(){
                this.$el.empty();
                $('#view').removeClass('no_padding');
                this.$el.append(this.template());
                $('#footer_container').css('top', (window.screen.height-34)+'px');
                return this;
            },

            captureAudio : function(){
                navigator.device.capture.captureAudio(this.captureSuccess.bind(this), this.captureError, { limit: 1});                  
            },

            captureSuccess : function(e){
                /*var i, len;
                for (i = 0, len = e.length; i < len; i += 1) {
                     this.uploadFile(e[i],self);
                }*/
                console.log('capture success');                
            },
                     
            captureError : function(error){
                /*var msg = 'An error occurred during the capture: ' + error.code;
                navigator.notification.alert(msg, null, 'Uh oh!');*/
            },
                    
            uploadFile : function(media) {
                var ft = new FileTransfer(),
                path = media.fullPath,
                name = media.name;

                ft.upload(path,"http://kevinlarosa.fr:3001/api/content?api-key=foo&idRoom="+localStorage.getItem("currentRoom"),function(result) {
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