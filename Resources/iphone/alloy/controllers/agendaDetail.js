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
    this.__controllerPath = "agendaDetail";
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
    $.__views.agendaDetail = Ti.UI.createWindow({
        orientationModes: [ Ti.UI.PORTRAIT ],
        id: "agendaDetail"
    });
    $.__views.agendaDetail && $.addTopLevelView($.__views.agendaDetail);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var data = require("data"), eventData = data.get("eventData"), item = data.get("agendaItem"), ui = require("ui"), pageWindow = require("pageWindow");
    var window = $.agendaDetail;
    window.setBackgroundColor(item.style_background);
    window.setTitle(item.title);
    var scrollViewHeight = ui.screenHeight() - 75;
    var scrollView = Ti.UI.createScrollView({
        contentWidth: "auto",
        contentHeight: "auto",
        layout: "vertical",
        showVerticalScrollIndicator: true,
        height: scrollViewHeight,
        width: "100%",
        top: 0,
        left: 0,
        zIndex: 1
    });
    for (var i in item.items) "paragraph" == item.items[i].type ? scrollView.add(pageWindow.createParagraph(item.items[i])) : "title" == item.items[i].type ? scrollView.add(pageWindow.createTitle(item.items[i])) : "image" == item.items[i].type && scrollView.add(pageWindow.createImage(item.items[i]));
    window.add(pageWindow.createAgendaShareView(item, eventData));
    window.add(scrollView);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;