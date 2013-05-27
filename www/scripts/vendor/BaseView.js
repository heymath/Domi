/*     
    Dailymotion Jobs : WebApp v1
    Developer : Kévin La Rosa & Mathieu Dutto
    Designer : Lukas Bachtrog

*/
define(['backbone'], function (Backbone) {
	
    BaseView = Backbone.View.extend({
        id: '...',

        constructor: function (options) {	
            this.router = options.router;
            this.models = options.models;
            this.collections = options.collections;
            this.param = options.param;
            Backbone.View.prototype.constructor.call(this);
        },
        initialize: function () {
        	this.remove();
            this.template = _.template(tpl);
        },

        events: {

        },
        render: function () {
            $(this.el).html(this.template());
            return this;
        },
        //Provides transparent navigation between views throught the backbonejs
        //route mechanism
        navigate: function(pageId)
        {
            this.router.navigate(pageId, {trigger: true});
        }
    });
    
    return BaseView;
});