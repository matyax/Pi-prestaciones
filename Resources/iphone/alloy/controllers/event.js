function Controller() {
    function addEventMenuItem(item) {
        var button = Titanium.UI.createButton({
            title: item.label,
            top: "0dp",
            width: "100%",
            height: 40,
            textAlign: "left",
            borderWidth: 1,
            borderColor: "black"
        });
        button.addEventListener("click", item.onClick);
        $.eventView.add(button);
    }
    function createAgendaDetailWindow(title, item) {
        var window = Titanium.UI.createWindow({
            backgroundColor: "white",
            layout: "vertical",
            title: title
        });
        var scrollView = Ti.UI.createScrollView({
            contentWidth: "auto",
            contentHeight: "auto",
            showVerticalScrollIndicator: true,
            height: Ti.UI.FILL,
            width: "100%"
        });
        var label = Ti.UI.createLabel({
            color: "#900",
            font: {
                fontSize: 12
            },
            text: item[0].description,
            textAlign: "left",
            top: 10,
            left: 10,
            width: Ti.UI.SIZE,
            height: Ti.UI.SIZE
        });
        scrollView.add(label);
        window.add(scrollView);
        return window;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "event";
    arguments[0] ? arguments[0]["__parentSymbol"] : null;
    arguments[0] ? arguments[0]["$model"] : null;
    arguments[0] ? arguments[0]["__itemTemplate"] : null;
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
        event.background_color && $.eventWindow.setBackgroundColor(event.background_color);
        var image = Ti.UI.createImageView({
            image: event.logo,
            width: "100%",
            top: "0dp"
        });
        $.eventView.add(image);
        var label = "";
        if (event.information) {
            label = event.information_label || "Presentación";
            var informationWindow = Titanium.UI.createWindow({
                backgroundColor: "white",
                layout: "vertical",
                title: label
            });
            var informationScrollView = Ti.UI.createScrollView({
                contentWidth: "auto",
                contentHeight: "auto",
                showVerticalScrollIndicator: true,
                height: Ti.UI.FILL,
                width: "100%"
            });
            var informationLabel = Ti.UI.createLabel({
                color: "#900",
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
            var agendaOnclick = function(id, title) {
                var detailWindow = createAgendaDetailWindow(title, event.agenda[id]);
                $.eventNavigationWindow.openWindow(detailWindow, {
                    animated: true
                });
            };
            var calendar = require("calendar");
            var agendaWindow = calendar.add(label, event.agenda, agendaOnclick, $.eventNavigationWindow);
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
            var formWindow = Titanium.UI.createWindow({
                backgroundColor: "white",
                layout: "vertical",
                title: label
            });
            var formWebView = Titanium.UI.createWebView({
                url: event.form
            });
            var informationLabel = Ti.UI.createLabel({
                color: "#900",
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
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;