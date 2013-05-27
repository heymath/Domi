define(
    [
        'backbone',
        'models/department',
        'i18n!nls/str'
    ],
    
    function(Backbone,Department,str){
        Departments_collection = Backbone.Collection.extend({
            
            initialize: function(){
                console.log("Création d'une collection de départements");
            },
            url :url_api_dev()+"departements",
            sync: function(method, model, options){
                var success = options.success;
                options.timeout = 10000;
                options.contentType = "application/json";
                options.dataType = "jsonp";
                var that = this;
                options.success = function(resp, status, xhr){
                    all = "<li id='all_offers'>";
                    all +="<a href='#listJob'>";
                    all +="<i class='arrow arrow-right'> </i>";
                    all +="<i class='icone' style='background-image:url(images/departments/all_offers.png)'> </i>";
                    all += str.viewAllOurOffers;
                    all +="</li>";
                    $('.departments_list ul').html(all);
                    departments = $.parseJSON(status);
                    _.each(departments,function(department){
                        that.add(new Department(department));
                    });
                };
                options.error = function(resp, status, xhr){
                    $('.departments_list ul').html('<h1>Aucun département disponible.</h1>');
                }
                Backbone.sync(method, model, options);
            },
            model: Department
        });
        return Departments_collection;
    }
);