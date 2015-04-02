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
        var newsView = Ti.UI.createView({
            layout: "vertical",
            width: newsWidth,
            height: Ti.UI.SIZE,
            top: 30,
            left: 30
        });
        var title = Ti.UI.createLabel({
            font: {
                fontSize: 14,
                fontWeight: "bold",
                fontFamily: titleFont
            },
            color: eventData.styles.foreground,
            text: title,
            textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
            width: "100%"
        });
        var subtitle = null;
        news.time && (subtitle = Ti.UI.createLabel({
            font: {
                fontSize: 10,
                fontWeight: "bold",
                fontFamily: titleFont
            },
            color: eventData.styles.foreground,
            text: news.time + " HS",
            textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
            width: "100%"
        }));
        var content = Ti.UI.createLabel({
            top: 15,
            font: {
                fontSize: 12,
                fontFamily: contentFont
            },
            color: eventData.styles.foreground,
            text: news.content,
            textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
        });
        var line = Ti.UI.createView({
            backgroundColor: "#999999",
            layout: "vertical",
            width: "100%",
            height: 1,
            top: 30
        });
        newsView.add(title);
        subtitle && newsView.add(subtitle);
        newsView.add(content);
        $.newsContainer.add(newsView);
        $.newsContainer.add(line);
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
        left: 0,
        width: "100%",
        height: Titanium.UI.SIZE,
        id: "newsContainer"
    });
    $.__views.__alloyId2.add($.__views.newsContainer);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var data = require("data"), ui = require("ui"), eventData = data.get("eventData"), news = eventData.news, newsWidth = ui.screenWidth() - 60;
    $.newsWindow.setTitle(eventData.news_label);
    $.newsWindow.setBackgroundColor(eventData.styles.background);
    $.newsContainer.setWidth(ui.screenWidth());
    var contentFont = ANDROID ? "DroidSerif" : "Georgia", titleFont = ANDROID ? "DroidSans" : "Helvetica";
    for (var i in news) addNews(news[i]);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;