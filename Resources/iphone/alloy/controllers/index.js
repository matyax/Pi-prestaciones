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
    this.__controllerPath = "index";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.index = Ti.UI.createWindow({
        layout: "vertical",
        backgroundColor: "white",
        id: "index",
        title: ""
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.__alloyId0 = Ti.UI.createView({
        top: 25,
        height: 90,
        id: "__alloyId0"
    });
    $.__views.index.add($.__views.__alloyId0);
    $.__views.piLogo = Ti.UI.createImageView({
        width: "60dp",
        id: "piLogo",
        image: "/pi/logo.png"
    });
    $.__views.__alloyId0.add($.__views.piLogo);
    $.__views.congressTitle = Ti.UI.createLabel({
        top: "30dp",
        width: "100%",
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
        color: "black",
        font: {
            fontSize: "12dp"
        },
        text: "Eventos actuales",
        id: "congressTitle"
    });
    $.__views.index.add($.__views.congressTitle);
    $.__views.eventsScrollView = Ti.UI.createScrollView({
        top: "10dp",
        height: "100%",
        id: "eventsScrollView",
        showVerticalScrollIndicator: "true",
        showHorizontalScrollIndicator: "false",
        width: "100%"
    });
    $.__views.index.add($.__views.eventsScrollView);
    $.__views.eventsView = Ti.UI.createView({
        height: Ti.UI.SIZE,
        width: "100%",
        top: 0,
        layout: "vertical",
        id: "eventsView"
    });
    $.__views.eventsScrollView.add($.__views.eventsView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    var piApi = require("pi");
    var data = require("data");
    var loading = require("loadingWindow");
    $.index.open();
    loading.open();
    piApi.loadEvents(function(events) {
        loading.close();
        "android" == Titanium.Platform.osname && (events = JSON.parse('[{"id":1,"name":"AAOC","image":"http://piprestaciones.com/resources/mobile/events/1.jpg"},{"id":2,"name":"IX Congreso el forum venoso latinoamericano","image":"http://piprestaciones.com/resources/mobile/events/2.png"},{"id":3,"name":"XIII Jornadas nacionales de Mastología","image":"http://piprestaciones.com/resources/mobile/events/3.jpg"}]'));
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
        var relativeHeight = null;
        relativeHeight = "android" == Titanium.Platform.osname ? Math.round(200 * Ti.Platform.displayCaps.platformWidth / 800) + "px" : Math.round(200 * Ti.Platform.displayCaps.platformWidth / 800);
        var quantity = 0, button = null;
        for (var i in events) {
            button = Ti.UI.createButton({
                backgroundImage: events[i].image,
                borderRadius: 15,
                top: 10,
                left: "5%",
                width: "90%",
                height: relativeHeight,
                style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
                idEvent: events[i].id
            });
            button.addEventListener("click", function() {
                var selectedEvent = null;
                for (var i in events) if (events[i].id == this.idEvent) {
                    selectedEvent = events[i];
                    break;
                }
                data.set("event", selectedEvent);
                loading.open();
                piApi.getEventDetail(selectedEvent.id, function(eventData) {
                    loading.close();
                    data.set("eventData", eventData);
                    var win = Alloy.createController("event").getView();
                    win.open({
                        animated: true
                    });
                });
            });
            $.eventsView.add(button);
            quantity++;
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;