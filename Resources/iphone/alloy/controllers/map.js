function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "map";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.mapWindow = Ti.UI.createWindow({
        layout: "vertical",
        orientationModes: [ Ti.UI.PORTRAIT ],
        id: "mapWindow"
    });
    $.__views.mapWindow && $.addTopLevelView($.__views.mapWindow);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var data = require("data"), eventData = data.get("eventData"), MapModule = require("ti.map");
    $.mapWindow.setTitle(eventData.map_label);
    $.mapWindow.setBackgroundColor(eventData.styles.background);
    eventData.map.lat = parseFloat(eventData.map.lat);
    eventData.map.lng = parseFloat(eventData.map.lng);
    var marker = MapModule.createAnnotation({
        latitude: eventData.map.lat,
        longitude: eventData.map.lng,
        pincolor: MapModule.ANNOTATION_PURPLE,
        title: eventData.title,
        subtitle: eventData.address,
        leftButton: Ti.UI.iPhone.SystemButton.INFO_DARK
    });
    var map = MapModule.createView({
        userLocation: true,
        mapType: MapModule.NORMAL_TYPE,
        animate: true,
        region: {
            latitude: eventData.map.lat,
            longitude: eventData.map.lng,
            latitudeDelta: .05,
            longitudeDelta: .05
        },
        height: "100%",
        top: 0,
        width: Ti.UI.FILL,
        annotations: [ marker ]
    });
    $.mapWindow.add(map);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;