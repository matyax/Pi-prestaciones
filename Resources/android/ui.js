function pxToDP(px) {
    return px / (Titanium.Platform.displayCaps.dpi / 160);
}

function getUnreadNewsQuantity(news) {
    var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "latest_read_news.dat");
    var blob = file.read(), latestNewsID = "";
    if (blob) latestNewsID = blob.text; else {
        file.write("0");
        latestNewsID = "0";
    }
    var unreadNews = 0;
    for (var i in news) {
        if (news[i].id == latestNewsID) break;
        unreadNews++;
    }
    return unreadNews;
}

exports.createSectionView = function(eventData, title) {
    var sectionView = Ti.UI.createView({
        backgroundColor: eventData.styles.button_background,
        width: "100%",
        height: 40,
        top: 0,
        left: 0
    });
    var sectionLabel = Ti.UI.createLabel({
        color: eventData.styles.button_foreground,
        font: {
            fontSize: 16
        },
        text: title,
        textAlign: "left",
        top: 10,
        left: 10
    });
    sectionView.add(sectionLabel);
    return sectionView;
};

exports.pxToDP = pxToDP;

exports.screenWidth = function() {
    return pxToDP(Ti.Platform.displayCaps.platformWidth);
};

exports.screenHeight = function() {
    return pxToDP(Ti.Platform.displayCaps.platformHeight);
};

exports.processItemConfig = function(item, eventData) {
    if ("news" == item.controller) {
        var unreadNews = getUnreadNewsQuantity(eventData.news);
        if (0 == eventData.news.length) {
            item.label += " (0)";
            null == item.controller;
            item.onClick = function() {};
        } else unreadNews > 0 && (item.label += " (" + unreadNews + ")");
    }
    return item;
};

exports.setLastUnreadNews = function(id) {
    var file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory, "latest_read_news.dat");
    file.write("" + id);
    return true;
};