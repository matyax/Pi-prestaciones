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
    this.__controllerPath = "accommodationDetail";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.accommodationDetail = Ti.UI.createWindow({
        layout: "vertical",
        id: "accommodationDetail"
    });
    $.__views.accommodationDetail && $.addTopLevelView($.__views.accommodationDetail);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var data = require("data"), eventData = data.get("eventData"), item = data.get("accommodationItem"), ui = require("ui");
    var window = $.accommodationDetail;
    window.setBackgroundColor(eventData.styles.background);
    window.setTitle(item.title);
    var scrollView = Ti.UI.createScrollView({
        contentWidth: "auto",
        contentHeight: "auto",
        showVerticalScrollIndicator: true,
        layout: "vertical",
        height: Ti.UI.FILL,
        width: "100%"
    });
    var sectionView = ui.createSectionView(eventData, eventData.accommodations_label + " - " + item.title);
    var image = null;
    item.image && (image = Ti.UI.createImageView({
        image: item.image,
        top: 10,
        left: 10,
        width: "95%"
    }));
    var titleLabel = Ti.UI.createLabel({
        color: eventData.styles.forecolor,
        font: {
            fontSize: 12
        },
        text: item.title,
        textAlign: "left",
        top: 10,
        left: 10,
        width: Titanium.Platform.displayCaps.platformWidth,
        height: Ti.UI.SIZE
    });
    var descriptionLabel = Ti.UI.createLabel({
        color: eventData.styles.forecolor,
        font: {
            fontSize: 12
        },
        text: item.description,
        top: 10,
        left: 10,
        width: "95%",
        height: Ti.UI.SIZE
    });
    scrollView.add(sectionView);
    image && scrollView.add(image);
    scrollView.add(titleLabel);
    scrollView.add(descriptionLabel);
    window.add(scrollView);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;