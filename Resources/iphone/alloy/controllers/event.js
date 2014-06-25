function Controller() {
    function addEventMenuItem(item) {
        var button = Titanium.UI.createButton({
            title: item.label,
            top: "0dp",
            width: "100%"
        });
        button.addEventListener("click", item.onClick);
        $.eventButtonsView.add(button);
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
        height: Ti.UI.SIZE,
        top: "0dp",
        id: "eventView"
    });
    $.__views.eventWindow.add($.__views.eventView);
    $.__views.eventButtonsView = Ti.UI.createView({
        height: Ti.UI.SIZE,
        top: "0dp",
        id: "eventButtonsView"
    });
    $.__views.eventWindow.add($.__views.eventButtonsView);
    $.__views.event = Ti.UI.iOS.createNavigationWindow({
        window: $.__views.eventWindow,
        id: "event"
    });
    $.__views.event && $.addTopLevelView($.__views.event);
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
            addEventMenuItem({
                label: label,
                onClick: function() {
                    alert("Clicked");
                }
            });
        }
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;