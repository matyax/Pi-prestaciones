function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function searchItem(items, id) {
        var item = null;
        for (var i in items) {
            if ("object" != typeof items[i]) continue;
            if (isNaN(parseInt(i))) {
                item = searchItem(items[i], id);
                if (item) return item;
            } else if (items[i].id && items[i].id == id) return items[i];
        }
        return null;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "accommodations";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.accommodations = Ti.UI.createWindow({
        orientationModes: [ Ti.UI.PORTRAIT ],
        id: "accommodations"
    });
    $.__views.accommodations && $.addTopLevelView($.__views.accommodations);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var data = require("data"), eventData = data.get("eventData"), windowReference = data.get("windowReference");
    var accommodationOnclick = function(id) {
        data.set("accommodationItem", searchItem(eventData.accommodations, id));
        var detailWindow = Alloy.createController("accommodationDetail").getView();
        "android" == Titanium.Platform.osname ? detailWindow.open({
            modal: true
        }) : windowReference.openWindow(detailWindow, {
            animated: true
        });
    };
    var accommodationNavigation = require("listNavigation");
    accommodationNavigation.add(eventData.accommodations_label, eventData.accommodations, accommodationOnclick, windowReference, eventData.styles.background, $.accommodations);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;