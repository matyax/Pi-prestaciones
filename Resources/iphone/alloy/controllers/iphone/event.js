function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "iphone/event";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.__alloyId0 = Ti.UI.createWindow({
        title: "Event home?",
        id: "__alloyId0"
    });
    $.__views.button = Ti.UI.createButton({
        title: "Open Blue Window",
        id: "button"
    });
    $.__views.__alloyId0.add($.__views.button);
    $.__views.event = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.__alloyId0,
        id: "event"
    });
    $.__views.event && $.addTopLevelView($.__views.event);
    exports.destroy = function() {};
    _.extend($, $.__views);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;