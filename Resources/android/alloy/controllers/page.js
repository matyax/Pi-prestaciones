function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function createParagraph(item) {
        var textAlign = Ti.UI.TEXT_ALIGNMENT_LEFT;
        "right" == item.style_align ? textAlign = Ti.UI.TEXT_ALIGNMENT_RIGHT : "center" == item.style_align && (textAlign = Ti.UI.TEXT_ALIGNMENT_CENTER);
        var width = Ti.Platform.displayCaps.platformWidth - 40;
        width += "px";
        var foreColor = item.style_foreground || "black";
        return Ti.UI.createLabel({
            text: item.value,
            color: foreColor,
            font: {
                fontSize: item.style_font_size
            },
            width: width,
            top: 10,
            left: 10,
            textAlign: textAlign
        });
    }
    function createTitle(item) {
        var textAlign = Ti.UI.TEXT_ALIGNMENT_LEFT;
        "right" == item.style_align ? textAlign = Ti.UI.TEXT_ALIGNMENT_RIGHT : "center" == item.style_align && (textAlign = Ti.UI.TEXT_ALIGNMENT_CENTER);
        var view = Ti.UI.createView({
            layout: "vertical",
            backgroundColor: item.style_background,
            width: "100%",
            height: Ti.UI.SIZE,
            top: 10
        });
        view.add(Ti.UI.createView({
            width: "100%",
            height: 5
        }));
        var labelWidth = Ti.Platform.displayCaps.platformWidth - 40;
        labelWidth += "px";
        view.add(Ti.UI.createLabel({
            text: item.value,
            color: item.style_foreground,
            font: {
                fontSize: item.style_font_size
            },
            top: 0,
            left: 20,
            textAlign: textAlign,
            width: labelWidth
        }));
        view.add(Ti.UI.createView({
            width: "100%",
            height: 5
        }));
        return view;
    }
    function createImage(item) {
        var view = Ti.UI.createView({
            width: "100%",
            height: Ti.UI.SIZE,
            top: 10
        });
        view.add(Ti.UI.createImageView({
            image: item.value
        }));
        return view;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "page";
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
    {
        var data = require("data"), page = data.get("page");
        data.get("eventData");
    }
    page.background_color && $.pageView.setBackgroundColor(page.background_color);
    for (var i in page.items) "paragraph" == page.items[i].type ? $.pageScrollView.add(createParagraph(page.items[i])) : "title" == page.items[i].type ? $.pageScrollView.add(createTitle(page.items[i])) : "image" == page.items[i].type && $.pageScrollView.add(createImage(page.items[i]));
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;