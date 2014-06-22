function Controller() {
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "index";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createWindow({
        layout: "vertical",
        backgroundColor: "#4f4f4f",
        id: "index",
        title: ""
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.piLogo = Ti.UI.createImageView({
        left: "10dp",
        top: "20dp",
        width: "60dp",
        id: "piLogo",
        image: "/pi/logo.png"
    });
    $.__views.index.add($.__views.piLogo);
    $.__views.congressTitle = Ti.UI.createLabel({
        top: "30dp",
        width: "100%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "white",
        font: {
            fontSize: "12dp"
        },
        text: "Eventos actuales",
        id: "congressTitle"
    });
    $.__views.index.add($.__views.congressTitle);
    $.__views.eventsScrollView = Ti.UI.createScrollView({
        top: "10dp",
        id: "eventsScrollView",
        showVerticalScrollIndicator: "true",
        showHorizontalScrollIndicator: "false",
        height: "100%",
        width: "100%"
    });
    $.__views.index.add($.__views.eventsScrollView);
    $.__views.eventsView = Ti.UI.createView({
        height: "100%",
        width: "100%",
        top: 0,
        id: "eventsView"
    });
    $.__views.eventsScrollView.add($.__views.eventsView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    var piApi = require("pi");
    piApi.loadEvents(function(events) {
        false === events && alert("Error de conexión");
        if (!events.length) {
            var emptyLabel = Ti.UI.createLabel({
                text: "No se encontraron eventos.",
                top: "5dp",
                font: {
                    fontSize: "12dp"
                },
                color: "white",
                textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
                width: "100%"
            });
            $.eventsView.add(emptyLabel);
            return;
        }
        var relativeHeight = Math.round(200 * Ti.Platform.displayCaps.platformWidth / 800);
        var quantity = 0, top = 0, image = null;
        for (var i in events) {
            top = quantity * relativeHeight + 10 * quantity;
            image = Ti.UI.createButton({
                image: events[i].image,
                top: top,
                width: "100%",
                height: relativeHeight,
                style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN
            });
            $.eventsView.add(image);
            quantity++;
        }
        $.eventsView.setHeight(events.length * relativeHeight + 10 * events.length);
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;