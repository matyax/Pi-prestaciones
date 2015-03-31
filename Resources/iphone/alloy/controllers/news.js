function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function addNews(news) {
        var title = news.textual_date;
        news.time && (title += " " + news.time);
        var newsView = Ti.UI.createView({
            layout: "vertical",
            width: "100%",
            height: Ti.UI.SIZE,
            top: 20
        });
        var title = Ti.UI.createLabel({
            font: {
                fontSize: 14
            },
            color: eventData.styles.foreground,
            text: title,
            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
        });
        var content = Ti.UI.createLabel({
            top: 10,
            font: {
                fontSize: 12
            },
            color: eventData.styles.foreground,
            text: news.content,
            textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
        });
        var line = Ti.UI.createView({
            backgroundColor: "#666666",
            layout: "vertical",
            width: "100%",
            height: 1,
            top: 10
        });
        newsView.add(title);
        newsView.add(content);
        newsView.add(line);
        $.newsContainer.add(newsView);
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "news";
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
    $.__views.newsWindow = Ti.UI.createWindow({
        id: "newsWindow"
    });
    $.__views.newsWindow && $.addTopLevelView($.__views.newsWindow);
    $.__views.__alloyId1 = Ti.UI.createView({
        layout: "vertical",
        id: "__alloyId1"
    });
    $.__views.newsWindow.add($.__views.__alloyId1);
    $.__views.__alloyId2 = Ti.UI.createScrollView({
        layout: "vertical",
        showHorizontalScrollIndicator: "false",
        id: "__alloyId2"
    });
    $.__views.__alloyId1.add($.__views.__alloyId2);
    $.__views.newsContainer = Ti.UI.createView({
        layout: "vertical",
        top: 0,
        left: 20,
        height: Titanium.UI.SIZE,
        id: "newsContainer"
    });
    $.__views.__alloyId2.add($.__views.newsContainer);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var data = require("data"), ui = require("ui"), eventData = data.get("eventData"), news = eventData.news;
    $.newsWindow.setTitle(eventData.news_label);
    $.newsWindow.setBackgroundColor(eventData.styles.background);
    $.newsContainer.setWidth(ui.screenWidth() - 40);
    for (var i in news) addNews(news[i]);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;