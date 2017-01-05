Ext.define('StudentPortal.controller.RegisterAttendance', {
   extend: 'Ext.app.Controller',
   requires: [
      'StudentPortal.store.TerminalComboList',
      'Ext.ProgressIndicator'
   ],   
   config: {
       refs: {
        TerminalList: 'terminallist',
            mapView: {
                selector: 'maps #map',
                xtype: 'Ext.Map'
            },
            Maps: {
                selector: 'maps',
                xtype: 'Ext.navigation.View'
            }
          
        }
      },
         init: function(){
         
      var me = this;
   
      me.control({
            "maps #Register": {
                tap: 'onYouAreHereTap'
            },


        });
   },
   
  
  onYouAreHereTap: function(button, e, eOpts) {
    var me = this;
    var latitude,longitude,location,marker;
        var mapView = this.getMapView();        
        if (Ext.feature.has.Geolocation) {  
          var geo = Ext.create('Ext.util.Geolocation', {
          autoUpdate: false,
          listeners: {
            locationupdate           : function(geo) {
                  latitude  = geo.getLatitude(),
                  longitude = geo.getLongitude(),
                  location  = new google.maps.LatLng(latitude, longitude),            
                  marker    = new google.maps.Marker({
                    position  : location,
                    map       : mapView.getMap(),
                    animation : google.maps.Animation.DROP
                  });
                mapView.setMapOptions({   // Move to the center
                  center: location,
                  zoom: 12
                });
            var tc = me.getTerminalList()
            tc.submit({
              url: '/'+tdsGlobal.getDeployContext()+'/locationUpdate',
              disableCaching: false,
              method: 'POST',
              params : {
                 'latitude': latitude,
                 'longitude': longitude,
                 'person_code': 'S08071608'
              },        
              success: function(response) {
                //debugger;
                Ext.Msg.alert('Success', 'Attendance registered successfuly', Ext.emptyFn);
              },
              failure: function(response) {
                //debugger;
                var msg = 'Error registering';
                Ext.Msg.alert('Error', msg , Ext.emptyFn); 
              }       
            }); 
                },
                failure: function() {
                    console.log('something went wrong!');
            },
    
        locationerror: function(geo, bTimeout, bPermissionDenied, bLocationUnavailable, message) {
            if(bTimeout){
                alert('Timeout occurred.');
            } else {
                alert('Error occurred.');
            }
        }
    }
});
geo.updateLocation();
               
        }
    }
});