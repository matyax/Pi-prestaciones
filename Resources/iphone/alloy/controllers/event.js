function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function hideWindowsForEventImage() {
        "android" == Titanium.Platform.osname ? $.eventNavigationWindow.hide() : $.eventNavigationWindow.hide();
    }
    function showWindowsAfterEventImage() {
        bigEventWindow.hide();
        "android" == Titanium.Platform.osname ? $.eventNavigationWindow.show() : $.eventNavigationWindow.show();
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "event";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.eventWindow = Ti.UI.createWindow({
        id: "eventWindow"
    });
    $.__views.eventView = Ti.UI.createView({
        height: Ti.UI.FILL,
        layout: "vertical",
        top: 0,
        id: "eventView"
    });
    $.__views.eventWindow.add($.__views.eventView);
    $.__views.eventNavigationWindow = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.eventWindow,
        id: "eventNavigationWindow"
    });
    $.__views.eventNavigationWindow && $.addTopLevelView($.__views.eventNavigationWindow);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var piApi = require("pi");
    var data = require("data");
    var loading = require("loadingWindow");
    var selectedEvent = data.get("event");
    if (selectedEvent.big_image) {
        var bigEventWindow = Titanium.UI.createWindow();
        var loadingView = Titanium.UI.createView({
            layout: "vertical",
            top: 0,
            backgroundImage: selectedEvent.big_image
        });
        bigEventWindow.add(loadingView);
        hideWindowsForEventImage();
        bigEventWindow.show({
            modal: true
        });
    }
    loading.open();
    piApi.getEventDetail(function(event) {
        loading.close();
        selectedEvent.big_image && setTimeout(function() {
            showWindowsAfterEventImage();
        }, 5e3);
        return;
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;