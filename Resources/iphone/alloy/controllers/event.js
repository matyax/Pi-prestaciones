function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function addEventMenuItem(item) {
        var button = Titanium.UI.createButton({
            title: item.label,
            top: 1,
            width: "100%",
            height: 40,
            textAlign: "left",
            borderWidth: 0,
            backgroundColor: eventData.styles.button_background,
            color: eventData.styles.button_foreground
        });
        button.addEventListener("click", item.onClick);
        $.eventView.add(button);
    }
    function createAccommodationDetailWindow(item) {
        var window = Titanium.UI.createWindow({
            backgroundColor: eventData.styles.background,
            layout: "vertical",
            title: item.title
        });
        var scrollView = Ti.UI.createScrollView({
            contentWidth: "auto",
            contentHeight: "auto",
            showVerticalScrollIndicator: true,
            layout: "vertical",
            height: Ti.UI.FILL,
            width: Titanium.Platform.displayCaps.platformWidth
        });
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
            width: Ti.UI.SIZE,
            height: Ti.UI.SIZE
        });
        scrollView.add(titleLabel);
        scrollView.add(descriptionLabel);
        window.add(scrollView);
        return window;
    }
    function createAgendaDetailWindow(item) {
        var window = Titanium.UI.createWindow({
            backgroundColor: eventData.styles.background,
            layout: "vertical",
            title: item.title
        });
        var scrollView = Ti.UI.createScrollView({
            contentWidth: "auto",
            contentHeight: "auto",
            showVerticalScrollIndicator: true,
            layout: "vertical",
            height: Ti.UI.FILL,
            width: Titanium.Platform.displayCaps.platformWidth
        });
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
        var timeText = item.endTime ? item.startTime + " - " + item.endTime : item.startTime;
        var timeLabel = Ti.UI.createLabel({
            color: eventData.styles.forecolor,
            font: {
                fontSize: 12
            },
            text: timeText,
            left: 10,
            width: Ti.UI.SIZE,
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
            width: Ti.UI.SIZE,
            height: Ti.UI.SIZE
        });
        scrollView.add(titleLabel);
        scrollView.add(timeLabel);
        scrollView.add(descriptionLabel);
        window.add(scrollView);
        return window;
    }
    function searchItem(items, id) {
        var item = null;
        for (var i in items) {
            if ("object" != typeof items[i]) continue;
            if (isNaN(parseInt(i))) {
                item = searchItem(items[i], id);
                if (item) return item;
            } else if (items[i].id && items[i].id == id) return items[i];
        }
        return null;
    }
    function createEventWindow(title, backgroundColor) {
        return Titanium.UI.createWindow({
            backgroundColor: backgroundColor,
            layout: "vertical",
            title: title
        });
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "event";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.eventWindow = Ti.UI.createWindow({
        id: "eventWindow"
    });
    $.__views.eventView = Ti.UI.createView({
        height: Ti.UI.FILL,
        layout: "vertical",
        top: "0dp",
        id: "eventView"
    });
    $.__views.eventWindow.add($.__views.eventView);
    $.__views.eventNavigationWindow = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.eventWindow,
        id: "eventNavigationWindow"
    });
    $.__views.eventNavigationWindow && $.addTopLevelView($.__views.eventNavigationWindow);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var piApi = require("pi");
    var eventData = null;
    piApi.getEventDetail(function(event) {
        if (!event) {
            $.event.close();
            return;
        }
        eventData = event;
        $.eventWindow.setTitle(event.title);
        $.eventWindow.setBackgroundColor(event.styles.background);
        var image = Ti.UI.createImageView({
            image: event.logo,
            width: "100%",
            top: "0dp"
        });
        $.eventView.add(image);
        var label = "";
        if (event.information) {
            label = event.information_label || "Presentación";
            var informationWindow = createEventWindow(label, event.styles.background);
            var informationScrollView = Ti.UI.createScrollView({
                contentWidth: "auto",
                contentHeight: "auto",
                showVerticalScrollIndicator: true,
                height: Ti.UI.FILL,
                width: "100%"
            });
            var informationLabel = Ti.UI.createLabel({
                color: event.styles.forecolor,
                font: {
                    fontSize: 12
                },
                text: event.information,
                textAlign: "left",
                top: 10,
                left: 10,
                width: Ti.UI.SIZE,
                height: Ti.UI.SIZE
            });
            informationWindow.add(informationScrollView);
            informationScrollView.add(informationLabel);
            addEventMenuItem({
                label: label,
                onClick: function() {
                    $.eventNavigationWindow.openWindow(informationWindow, {
                        animated: true
                    });
                }
            });
        }
        if (event.agenda) {
            label = event.agenda_label || "Agenda";
            var agendaOnclick = function(id) {
                var detailWindow = createAgendaDetailWindow(searchItem(event.agenda, id));
                $.eventNavigationWindow.openWindow(detailWindow, {
                    animated: true
                });
            };
            var calendar = require("listNavigation");
            var agendaWindow = calendar.add(label, event.agenda, agendaOnclick, $.eventNavigationWindow, event.styles.background);
            addEventMenuItem({
                label: label,
                onClick: function() {
                    $.eventNavigationWindow.openWindow(agendaWindow, {
                        animated: true
                    });
                }
            });
        }
        if (event.form) {
            label = event.form_label || "Inscripción online";
            var formWindow = createEventWindow(label, event.styles.background);
            var formWebView = Titanium.UI.createWebView({
                url: event.form
            });
            formWindow.add(formWebView);
            addEventMenuItem({
                label: label,
                onClick: function() {
                    $.eventNavigationWindow.openWindow(formWindow, {
                        animated: true
                    });
                }
            });
        }
        if (event.certificate) {
            label = event.certificate_label || "Certificación web";
            var cwWindow = createEventWindow(label, event.styles.background);
            var cwWebView = Titanium.UI.createWebView({
                url: event.certificate
            });
            cwWindow.add(cwWebView);
            addEventMenuItem({
                label: label,
                onClick: function() {
                    $.eventNavigationWindow.openWindow(cwWindow, {
                        animated: true
                    });
                }
            });
        }
        if (event.map) {
            label = event.map_label || "Ubicación";
            var mapWindow = createEventWindow(label, event.styles.background);
            var MapModule = require("ti.map");
            event.map.lat = parseFloat(event.map.lat);
            event.map.lng = parseFloat(event.map.lng);
            var marker = MapModule.createAnnotation({
                latitude: event.map.lat,
                longitude: event.map.lng,
                pincolor: MapModule.ANNOTATION_PURPLE,
                title: event.title,
                subtitle: event.address,
                leftButton: Ti.UI.iPhone.SystemButton.INFO_DARK
            });
            var map = MapModule.createView({
                userLocation: true,
                mapType: MapModule.NORMAL_TYPE,
                animate: true,
                region: {
                    latitude: event.map.lat,
                    longitude: event.map.lng,
                    latitudeDelta: .05,
                    longitudeDelta: .05
                },
                height: "100%",
                top: 0,
                width: Ti.UI.FILL,
                annotations: [ marker ]
            });
            mapWindow.add(map);
            addEventMenuItem({
                label: label,
                onClick: function() {
                    $.eventNavigationWindow.openWindow(mapWindow, {
                        animated: true
                    });
                }
            });
        }
        if (event.accommodations) {
            label = event.accommodations_label || "Agenda";
            var accommodationOnclick = function(id) {
                var detailWindow = createAccommodationDetailWindow(searchItem(event.accommodations, id));
                $.eventNavigationWindow.openWindow(detailWindow, {
                    animated: true
                });
            };
            var accommodationNavigation = require("listNavigation");
            var accommodationWindow = accommodationNavigation.add(label, event.accommodations, accommodationOnclick, $.eventNavigationWindow, event.styles.background);
            addEventMenuItem({
                label: label,
                onClick: function() {
                    $.eventNavigationWindow.openWindow(accommodationWindow, {
                        animated: true
                    });
                }
            });
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;