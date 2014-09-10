function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function addButton(event, buttonOptions) {
        var button = null;
        buttonOptions.idEvent = event.id;
        button = Ti.UI.createButton(buttonOptions);
        button.addEventListener("click", function() {
            var selectedEvent = null;
            for (var i in eventList) if (eventList[i].id == this.idEvent) {
                selectedEvent = eventList[i];
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
        var containerView = Ti.UI.createView({
            width: "100%",
            height: Ti.UI.SIZE,
            backgroundColor: "white",
            top: 0,
            left: 0
        });
        containerView.add(button);
        $.eventsView.add(containerView);
    }
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
        orientationModes: [ Ti.UI.PORTRAIT ],
        backgroundColor: "white",
        id: "index",
        title: "",
        fullscreen: "true",
        exitOnClose: "true"
    });
    $.__views.index && $.addTopLevelView($.__views.index);
    $.__views.logoContainer = Ti.UI.createView({
        top: 25,
        height: 90,
        id: "logoContainer"
    });
    $.__views.index.add($.__views.logoContainer);
    $.__views.piLogo = Ti.UI.createImageView({
        width: "60dp",
        id: "piLogo",
        image: "/pi/logo.png"
    });
    $.__views.logoContainer.add($.__views.piLogo);
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
    var cachedImage = require("cachedImage");
    var eventList = null;
    $.index.open();
    loading.open();
    piApi.loadEvents(function(events) {
        false === events && alert("Error de conexión");
        eventList = events;
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
        var buttonOptions = null, relativeHeight = null, relativeWidth = null, buttonData = null;
        if (1 == events.length) {
            $.index.remove($.logoContainer);
            $.index.remove($.congressTitle);
            $.eventsScrollView.setTop(0);
            relativeHeight = Math.round(Ti.Platform.displayCaps.platformWidth * events[0].image_full_info.height / events[0].image_full_info.width) + "px";
            buttonData = {
                height: relativeHeight,
                event: events[0]
            };
            cachedImage.load(events[0].image_full, function(imagePath, data) {
                loading.close();
                addButton(data.event, {
                    backgroundImage: imagePath,
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: data.height,
                    style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN
                });
            }, $.eventsScrollView, buttonData);
        } else if (2 == events.length) {
            $.index.remove($.logoContainer);
            $.index.remove($.congressTitle);
            $.eventsScrollView.setTop(0);
            for (var i = 0; events.length > i; i++) {
                relativeHeight = Math.round(Ti.Platform.displayCaps.platformHeight / 2);
                relativeWidth = Math.round(relativeHeight * events[i].image_half_info.width / events[i].image_half_info.height) + "px";
                relativeHeight += "px";
                buttonData = {
                    height: relativeHeight,
                    width: relativeWidth,
                    event: events[i]
                };
                cachedImage.load(events[i].image_half, function(imagePath, data) {
                    loading.close();
                    addButton(data.event, {
                        backgroundImage: imagePath,
                        width: data.width,
                        height: data.height,
                        style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN
                    });
                }, $.eventsScrollView, buttonData);
            }
        } else for (var i = 0; events.length > i; i++) {
            events[i].image_info.width = events[i].image_info.width;
            relativeHeight = Math.round(Ti.Platform.displayCaps.platformWidth * events[i].image_info.height / events[i].image_info.width) + "px";
            buttonOptions = {
                backgroundImage: events[i].image,
                borderRadius: 15,
                top: 10,
                left: "5%",
                width: "90%",
                height: relativeHeight,
                style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN
            };
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;