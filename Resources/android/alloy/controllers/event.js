function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function generateEventWindow(event) {
        if (!event) {
            $.eventNavigationWindow.close();
            return;
        }
        eventData = event;
        var windowReference = null;
        $.eventNavigationWindow.setTitle(event.title);
        $.eventNavigationWindow.setBackgroundColor(event.styles.background);
        data.set("windowReference", windowReference);
        var image = Ti.UI.createImageView({
            image: event.logo,
            width: "100%",
            top: "0dp"
        });
        $.eventView.add(image);
        var label = "";
        addEventMenuItem({
            icon: "home",
            label: "Inicio",
            onClick: function() {
                $.eventNavigationWindow.close();
            }
        });
        for (var j in event.pages) addEventMenuItem({
            icon: "page",
            label: event.pages[j].title,
            onClick: function(e) {
                var page = null, title = e.source.getTitle();
                for (var i in eventData.pages) if (eventData.pages[i].title == title) {
                    page = eventData.pages[i];
                    break;
                }
                data.set("page", page);
                var window = Alloy.createController("page").getView();
                window.open({
                    modal: true
                });
            }
        });
        if (event.agenda) {
            label = event.agenda_label || "Agenda";
            addEventMenuItem({
                icon: "agenda",
                label: label,
                controller: "agenda"
            });
        }
        if (event.form) {
            label = event.form_label || "Inscripción online";
            addEventMenuItem({
                icon: "form",
                label: label,
                controller: "form"
            });
        }
        if (event.certificate) {
            label = event.certificate_label || "Certificación web";
            addEventMenuItem({
                icon: "certificate",
                label: label,
                controller: "certificate"
            });
        }
        if (event.map) {
            label = event.map_label || "Ubicación";
            addEventMenuItem({
                icon: "map",
                label: label,
                controller: "map"
            });
        }
        if (event.agenda) {
            label = event.favorites_label || "Favoritos";
            addEventMenuItem({
                icon: "favorite",
                label: label,
                controller: "favorite"
            });
        }
        if (event.accommodations) {
            label = event.accommodations_label || "Agenda";
            addEventMenuItem({
                icon: "accommodation",
                label: label,
                controller: "accommodations"
            });
        }
    }
    function addEventMenuItem(item) {
        var button = Titanium.UI.createButton({
            title: item.label,
            width: Ti.UI.FILL,
            height: 40,
            textAlign: "left",
            backgroundColor: "transparent",
            borderColor: "transparent",
            borderWidth: 0,
            color: eventData.styles.button_foreground,
            top: 0,
            left: 5
        });
        var icon = Ti.UI.createImageView({
            image: "/icons/" + item.icon + ".png",
            width: 30,
            height: 30,
            left: 10,
            top: 5
        });
        var view = Titanium.UI.createView({
            layout: "horizontal",
            top: 1,
            width: "100%",
            height: 40,
            backgroundColor: eventData.styles.button_background
        });
        view.add(icon);
        view.add(button);
        item.controller ? button.addEventListener("click", function() {
            var window = Alloy.createController(item.controller).getView();
            window.open({
                modal: true
            });
        }) : item.onClick ? button.addEventListener("click", item.onClick) : item.window && button.addEventListener("click", function() {
            item.window.open({
                modal: true
            });
        });
        $.eventView.add(view);
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
    $.__views.eventNavigationWindow = Ti.UI.createWindow({
        orientationModes: [ Ti.UI.PORTRAIT ],
        id: "eventNavigationWindow"
    });
    $.__views.eventNavigationWindow && $.addTopLevelView($.__views.eventNavigationWindow);
    $.__views.eventScrollView = Ti.UI.createScrollView({
        height: Ti.UI.FILL,
        layout: "vertical",
        width: "100%",
        id: "eventScrollView"
    });
    $.__views.eventNavigationWindow.add($.__views.eventScrollView);
    $.__views.eventView = Ti.UI.createView({
        height: Ti.UI.SIZE,
        layout: "vertical",
        top: 0,
        id: "eventView"
    });
    $.__views.eventScrollView.add($.__views.eventView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var data = (require("pi"), require("data"));
    require("ui");
    var eventData = data.get("eventData");
    data.get("event");
    generateEventWindow(eventData);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;