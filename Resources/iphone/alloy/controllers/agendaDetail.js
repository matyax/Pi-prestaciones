function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function pxToDP(px) {
        return px / (Titanium.Platform.displayCaps.dpi / 160);
    }
    function createAgendaShareView(item) {
        var shareView = Ti.UI.createView({
            layout: "horizontal",
            backgroundColor: eventData.styles.share_background,
            width: "100%",
            height: 35,
            left: 0,
            bottom: 0,
            zIndex: 2
        });
        var favoriteButton = Titanium.UI.createButton({
            backgroundImage: "/icons" + eventData.favorites_icon,
            width: 25,
            height: 25,
            top: 5,
            left: 20
        });
        var favoriteLabel = Titanium.UI.createLabel({
            text: eventData.favorites_label,
            color: eventData.styles.share_foreground,
            font: {
                fontSize: 12
            },
            top: 9,
            left: 10
        });
        var tweet = Ti.UI.createImageView({
            image: "/icons/dark/1410146719_f099-128.png",
            width: 19,
            height: 25,
            top: 5,
            left: 70
        });
        var tweetLabel = Titanium.UI.createLabel({
            text: "Twittear",
            color: eventData.styles.share_foreground,
            font: {
                fontSize: 12
            },
            top: 9,
            left: 10
        });
        tweet.addEventListener("click", function() {
            var social = require("social");
            social.tweet(eventData, item);
        });
        favoriteButton.addEventListener("click", function() {
            var favorites = require("favorites");
            favorites.toggle(eventData.id_event, item, eventData.favorites_label);
        });
        shareView.add(favoriteButton);
        shareView.add(favoriteLabel);
        shareView.add(tweet);
        shareView.add(tweetLabel);
        return shareView;
    }
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
    var data = require("data"), eventData = data.get("eventData"), item = data.get("agendaItem"), ui = require("ui");
    var window = $.agendaDetail;
    window.setBackgroundColor(item.style_background);
    window.setTitle(item.title);
    var paragraphWidth = Ti.Platform.displayCaps.platformWidth;
    var scrollViewHieght = Ti.Platform.displayCaps.platformHeight;
    if ("android" == Titanium.Platform.osname) {
        paragraphWidth = pxToDP(paragraphWidth);
        scrollViewHieght = pxToDP(scrollViewHieght);
    }
    paragraphWidth -= 40;
    scrollViewHieght -= 75;
    var scrollView = Ti.UI.createScrollView({
        contentWidth: "auto",
        contentHeight: "auto",
        layout: "vertical",
        showVerticalScrollIndicator: true,
        height: scrollViewHieght,
        width: "100%",
        top: 0,
        left: 0,
        zIndex: 1
    });
    window.add(createAgendaShareView(item));
    var sectionView = ui.createSectionView(eventData, eventData.agenda_label + " " + item.date + " " + item.startTime);
    var titleLabel = Ti.UI.createLabel({
        color: item.style_foreground,
        font: {
            fontSize: 15
        },
        text: item.title,
        textAlign: "left",
        top: 20,
        left: 20,
        width: paragraphWidth,
        height: Ti.UI.SIZE
    });
    var timeText = item.endTime ? "De " + item.startTime + " a " + item.endTime + " horas" : item.startTime + " horas";
    var timeLabel = Ti.UI.createLabel({
        color: item.style_foreground,
        font: {
            fontSize: 15
        },
        text: timeText,
        left: 20,
        width: Ti.UI.SIZE,
        height: Ti.UI.SIZE
    });
    var descriptionLabel = Ti.UI.createLabel({
        color: item.style_foreground,
        font: {
            fontSize: 15
        },
        text: item.description,
        top: 20,
        left: 20,
        width: paragraphWidth,
        height: Ti.UI.SIZE
    });
    scrollView.add(sectionView);
    scrollView.add(titleLabel);
    scrollView.add(timeLabel);
    scrollView.add(descriptionLabel);
    window.add(scrollView);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;