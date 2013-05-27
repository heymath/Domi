define(
    [
        'backbone'
    ],
    
    function(Backbone){
	
     Departments_model = Backbone.Model.extend({

        initialize: function(){
           console.log('Nouveau département')
        },

    });
    
    return Departments_model;
    }
);