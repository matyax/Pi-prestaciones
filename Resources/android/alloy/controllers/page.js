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
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.page = Ti.UI.createWindow({
        id: "page"
    });
    $.__views.page && $.addTopLevelView($.__views.page);
    $.__views.pageView = Ti.UI.createView({
        layout: "vertical",
        id: "pageView"
    });
    $.__views.page.add($.__views.pageView);
    $.__views.sectionView = Ti.UI.createView({
        width: "100%",
        height: 30,
        top: 0,
        left: 0,
        id: "sectionView"
    });
    $.__views.pageView.add($.__views.sectionView);
    $.__views.title = Ti.UI.createLabel({
        font: {
            fontSize: 14
        },
        textAlign: "left",
        top: 5,
        left: 10,
        id: "title"
    });
    $.__views.sectionView.add($.__views.title);
    $.__views.pageScrollView = Ti.UI.createScrollView({
        layout: "vertical",
        width: "95%",
        left: 10,
        height: Ti.UI.FILL,
        id: "pageScrollView"
    });
    $.__views.pageView.add($.__views.pageScrollView);
    $.__views.imageBefore = Ti.UI.createImageView({
        top: 10,
        width: "100%",
        id: "imageBefore"
    });
    $.__views.pageScrollView.add($.__views.imageBefore);
    $.__views.content = Ti.UI.createLabel({
        top: 10,
        font: {
            fontSize: 12
        },
        id: "content"
    });
    $.__views.pageScrollView.add($.__views.content);
    $.__views.imageAfter = Ti.UI.createImageView({
        top: 10,
        width: "100%",
        id: "imageAfter"
    });
    $.__views.pageScrollView.add($.__views.imageAfter);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var data = require("data"), page = data.get("page"), eventData = data.get("eventData");
    $.sectionView.setBackgroundColor(eventData.styles.button_background);
    $.title.setText(page.title);
    $.title.setColor(eventData.styles.button_foreground);
    $.content.setText(page.content);
    $.content.setColor(eventData.styles.forecolor);
    $.pageView.setBackgroundColor(eventData.styles.background);
    if (page.image) if ("before" == page.image_position) {
        $.imageBefore.setImage(page.image);
        $.imageBefore.setVisible(true);
    } else if ("after" == page.image_position) {
        $.imageAfter.setImage(page.image);
        $.imageAfter.setVisible(true);
    }
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;