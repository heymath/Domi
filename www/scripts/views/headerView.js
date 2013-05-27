define(
    [
        'backbone',
        'vendor/BaseView'
    ],
    
    function(Backbone,BaseView){
        
        var HeaderView = BaseView.extend({
            
            initialize: function(){
                console.log(navigator.language);
            },
            
            el: '#main_container',
            
            events: {
            },
            
            render: function(){
                html = "<section id='header_container'>";
                    html += "<header id='header'>";
                        html += "<a href='#' id='back' class='icon-reply'></a>";
                        html += "<i id='logo'></i>";
                    html += "</header>";
                html += "</section>";
                this.$el.append(html);
                return this;
            },
            
            show_btn_back: function(){
                $('#back').show();
            },
            
            hide_btn_back: function(){
                $('#back').hide();
            },
            
            change_route_btn: function(route){
                $('#back').attr('href',route);
            }
            
        });
        
        return HeaderView;
    }
);