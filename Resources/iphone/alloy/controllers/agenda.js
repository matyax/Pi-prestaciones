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
    this.__controllerPath = "agenda";
    this.args = arguments[0] || {};
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
    $.__views.agenda = Ti.UI.createWindow({
        orientationModes: [ Ti.UI.PORTRAIT ],
        id: "agenda"
    });
    $.__views.agenda && $.addTopLevelView($.__views.agenda);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var data = require("data"), eventData = data.get("eventData"), windowReference = data.get("windowReference");
    var agendaOnclick = function(id) {
        var item = eventData.agenda_details[id];
        if (!item || !item.items) return;
        data.set("agendaItem", item);
        var detailWindow = Alloy.createController("agendaDetail").getView();
        "android" == Titanium.Platform.osname ? detailWindow.open({
            modal: true
        }) : windowReference.openWindow(detailWindow, {
            animated: true
        });
    };
    var listNavigation = require("listNavigation");
    listNavigation.add(eventData.agenda_label, eventData.agenda, agendaOnclick, windowReference, eventData.styles.button_background, $.agenda);
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;