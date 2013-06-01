define(
    [
        'backbone',
        'vendor/BaseView',
        'text!templates/apps/map.html'
    ],
    
    function(Backbone,BaseView,mapTemplate){
        
        var MapView = BaseView.extend({
            
            initialize: function(){
                $.get("http://192.168.1.12:3000/geo")
                .success(function(data){
                  console.log(data);
                })
                .error(function(error){
                });
            },
            
            el: '#view',

            template: _.template(mapTemplate),

            events: {
                
            },
            
            render: function(){
                this.$el.empty();
                $('#view').addClass('no_padding');
                this.$el.append(this.template());

                $('#map').css('height', window.screen.height+'px');
                var map = L.mapbox.map('map')
                .addLayer(L.mapbox.tileLayer('heymath.map-ndi5v1vo',{
                    detectRetina: true,
                    retinaVersion: 'examples.map-zswgei2n'
                }));

                if (!navigator.geolocation) {
                    /* pas de geolocalisation */
                } else{
                    map.locate();
                }
                
                map.on('locationfound', function(e){
                    map.fitBounds(e.bounds);
                    map.markerLayer.setGeoJSON({
                        type: "Feature",
                        geometry: {
                            type: "Point",
                            coordinates: [e.latlng.lng, e.latlng.lat]
                        },
                        properties: { 'marker-color': '#000' }
                    });
                });

                return this;
            }
        });
        
        return MapView;
    }
);