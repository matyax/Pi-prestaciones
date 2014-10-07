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
    this.__controllerPath = "link";
    if (arguments[0]) {
        {
            __processArg(arguments[0], "__parentSymbol");
        }
        {
            __processArg(arguments[0], "$model");
        }
        {
            __processArg(arguments[0], "__itemTemplate");
        }
    }
    var $ = this;
    var exports = {};
    $.__views.linkWindow = Ti.UI.createWindow({
        layout: "vertical",
        orientationModes: [ Ti.UI.PORTRAIT ],
        id: "linkWindow"
    });
    $.__views.linkWindow && $.addTopLevelView($.__views.linkWindow);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var data = require("data"), eventData = data.get("eventData");
    $.linkWindow.setTitle(eventData.link_label);
    $.linkWindow.setBackgroundColor(eventData.styles.background);
    var cwWebView = Titanium.UI.createWebView({
        url: eventData.link_url
    });
    $.linkWindow.add(cwWebView);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;