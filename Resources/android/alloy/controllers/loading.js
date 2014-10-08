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
    this.__controllerPath = "loading";
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
    $.__views.loadingWindow = Ti.UI.createWindow({
        backgroundColor: "black",
        opacity: .8,
        fullscreen: true,
        id: "loadingWindow",
        exitOnClose: "false"
    });
    $.__views.loadingWindow && $.addTopLevelView($.__views.loadingWindow);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var style;
    style = Ti.UI.ActivityIndicatorStyle.BIG;
    var activityIndicator = Ti.UI.createActivityIndicator({
        style: style,
        height: Ti.UI.SIZE,
        width: Ti.UI.SIZE
    });
    $.loadingWindow.add(activityIndicator);
    activityIndicator.show();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;