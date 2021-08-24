import { Component, OnInit} from '@angular/core';
declare var H: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'map-for-ie';

  ngOnInit() {
    
    var ua = window.navigator.userAgent;
    var trident = ua.indexOf('Trident');
        
    var platform = new H.service.Platform({
      'apikey': 'inNGcnh-3w_51vpyvsF_j9-tAtQGlwQ7-TG_C-JVOz0'
    });
    var defaultLayers = platform.createDefaultLayers();
  
    if (trident == -1) {
      var map = new H.Map(document.getElementById('mapContainer'),
        defaultLayers.raster.normal.map, {
        zoom: 14,
        center: { lat: 53, lng: 13 }
      });
    } else {
      var map = new H.Map(document.getElementById('mapContainer'),
        defaultLayers.raster.normal.map, {
        zoom: 14,
        center: { lat: 53, lng: 13 },
        engineType: H.map.render.RenderEngine.EngineType.P2D
      });
    }
    

    // add a resize listener to make sure that the map occupies the whole container
    window.addEventListener('resize', () => map.getViewPort().resize());
  
    //make the map interactive Behavior implements default interactions for pan/zoom
    var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
  
    // Create the default UI components
    var ui = H.ui.UI.createDefault(map, defaultLayers);
    window.onload = function () {
      moveMap(map);
    }
  
    //Moves the map to display over the location
    function moveMap(map) {
      map.setCenter({ lat: 53, lng: 13 });
      map.setZoom(14);
    }
    ui.removeControl("mapsettings");
    var ms = new H.ui.MapSettingsControl( {
      baseLayers : [ {
         label:"road",layer:defaultLayers.vector.normal.map
       },{
       label:"satellite",layer:defaultLayers.raster.satellite.map
        }
    ],
      layers : [ {
        label: "traffic flow", layer: defaultLayers.vector.normal.traffic         
       },{        
        label: "traffic incidents", layer: defaultLayers.vector.normal.trafficincidents
         }
        ]
     });

     ui.addControl("customized", ms);
     ui.getControl('scalebar').setAlignment('bottom-right');
      
//     // Initialize the map menu controls
//   _ui = H.ui.UI.createDefault(_map, _defaultLayers);
//     //add customized here controls
//    _ui.removeControl("mapsettings");
//    // create custom map controls
//     if (CSDI.browser.isIE11) {  
//          // IE11 doesn't support vector functionality. 
//       // We need to add a raster layer for IE11 traffic, but we treat it as if it's a vector layer to simply things.
//     // This code is temporary in that we can remove it as soon as support for IE11 is dropped.
//      var trafficService = platform.getMapTileService({type: 'traffic'});
//     _defaultLayers.vector.normal.traffic = trafficService.createTileLayer('flowtile', 'hybrid.traffic.day', TILESIZE, 'png', {'ppi' : HERE_PPI});
//       var ms = new H.ui.MapSettingsControl( {
//        baseLayers : [ {
//           label:"road",layer:_defaultLayers.raster.normal.map
//             },{
//         label:"satellite",layer:_defaultLayers.raster.satellite.map
//          } ],
//        layers : [ {
//            label: "traffic flow", layer:_defaultLayers.vector.normal.traffic
//          } ]           
//       });
// } else{
//      var ms = new H.ui.MapSettingsControl( {
//       baseLayers : [ {
//          label:"road",layer:_defaultLayers.vector.normal.map
//        },{
//        label:"satellite",layer:_defaultLayers.raster.satellite.map
//         }
//     ],
//       layers : [ {
//            label: "traffic flow", layer: _defaultLayers.vector.normal.traffic
//        },{
//           label: "traffic incidents", layer: _defaultLayers.vector.normal.trafficincidents
//          }
//         ]
//      });
//    }
//    _ui.addControl("customized", ms);
//    _ui.getControl('scalebar').setAlignment('bottom-right');    
  
  }

  }
