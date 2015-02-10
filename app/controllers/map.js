var args = arguments[0] || {};

var data        = require('data'),
    eventData   = data.get('eventData'),
    MapModule   = require('ti.map');

$.mapWindow.setTitle(eventData.map_label);
$.mapWindow.setBackgroundColor(eventData.styles.background);

eventData.map.lat = parseFloat(eventData.map.lat);
eventData.map.lng = parseFloat(eventData.map.lng);

var marker = MapModule.createAnnotation({
    latitude: eventData.map.lat,
    longitude: eventData.map.lng,
    title: eventData.title,
    subtitle: eventData.address,
    pincolor:MapModule.ANNOTATION_RED,
    myid: 1,
    leftButton: Ti.UI.iPhone.SystemButton.INFO_DARK
});

var map = MapModule.createView({
    userLocation:   true,
    mapType:        MapModule.NORMAL_TYPE,
    animate:        true,
    region:         {latitude: eventData.map.lat, longitude: eventData.map.lng, latitudeDelta: 0.05, longitudeDelta: 0.05 },
    height:         '100%',
    top:            0,
    width:          Ti.UI.FILL,
    annotations: [ marker ]
});

$.mapWindow.add(map);