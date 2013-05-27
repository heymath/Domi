require.config({
    paths: {
        // Libraries.
        jquery: 'vendor/jquery', // 1.9.0
        lodash: 'vendor/lodash', // 0.7.0
        backbone: 'vendor/backbone', // 0.9.2
        marionette: 'vendor/backbone.marionette.min', // 1.0.0-rc2
        text: 'vendor/text', // 2.0.1 :- require plug-in which compiles our templates
        'cordova.ios': 'vendor/cordova.ios',
    },
               
    shim: {
        // Backbone library depends on lodash and jQuery.
        backbone: {
            deps: [
                'lodash',
                'jquery'
            ],
            exports: 'Backbone'
        },

        // Marionette depends on jquery, lodash and backbone
        /* marionette : {
        deps : ['jquery', 'lodash', 'backbone'],
        exports : 'Marionette'
        },*/
    }
});

require(
    [
        'app',
        'jquery',
        'vendor/domReady',
        'cordova.ios'
    ],
    function (App, jQuery, domReady) {
        'use strict';

        domReady(function(){
            console.log("The DOM is ready - waiting for the device");
            document.addEventListener("deviceready", startWhenReady, false);
        });

        function startWhenReady(){
            console.log("dom and device ready : we can start...");
            App.initialize();
        }
});