function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "event";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.eventWindow = Ti.UI.createWindow({
        id: "eventWindow"
    });
    $.__views.event = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.eventWindow,
        id: "event"
    });
    $.__views.event && $.addTopLevelView($.__views.event);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var piApi = require("pi");
    piApi.getEventDetail(function(event) {
        if (!event) {
            $.event.close();
            return;
        }
        $.eventWindow.setTitle(event.title);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;