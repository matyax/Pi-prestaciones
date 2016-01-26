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
    this.__controllerPath = "form";
    this.args = arguments[0] || {};
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
    $.__views.formWindow = Ti.UI.createWindow({
        layout: "vertical",
        orientationModes: [ Ti.UI.PORTRAIT ],
        id: "formWindow"
    });
    $.__views.formWindow && $.addTopLevelView($.__views.formWindow);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var data = require("data"), eventData = data.get("eventData");
    $.formWindow.setTitle(eventData.form_label);
    $.formWindow.setBackgroundColor(eventData.styles.background);
    var formWebView = Titanium.UI.createWebView({
        url: eventData.form
    });
    $.formWindow.add(formWebView);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;