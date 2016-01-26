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
    this.__controllerPath = "page";
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
    $.__views.pageWindow = Ti.UI.createWindow({
        orientationModes: [ Ti.UI.PORTRAIT ],
        id: "pageWindow"
    });
    $.__views.pageWindow && $.addTopLevelView($.__views.pageWindow);
    $.__views.pageView = Ti.UI.createView({
        layout: "vertical",
        id: "pageView"
    });
    $.__views.pageWindow.add($.__views.pageView);
    $.__views.pageScrollView = Ti.UI.createScrollView({
        layout: "vertical",
        top: 0,
        left: 0,
        height: Ti.UI.FILL,
        width: "100%",
        id: "pageScrollView",
        showHorizontalScrollIndicator: "false"
    });
    $.__views.pageView.add($.__views.pageScrollView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var data = require("data"), page = data.get("page"), pageWindow = (data.get("eventData"), 
    require("pageWindow"));
    $.pageWindow.setTitle(page.title);
    page.background_color && $.pageView.setBackgroundColor(page.background_color);
    for (var i in page.items) "paragraph" == page.items[i].type ? $.pageScrollView.add(pageWindow.createParagraph(page.items[i])) : "title" == page.items[i].type ? $.pageScrollView.add(pageWindow.createTitle(page.items[i])) : "image" == page.items[i].type && $.pageScrollView.add(pageWindow.createImage(page.items[i]));
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;