function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
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
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "agenda";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
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
        data.set("agendaItem", searchItem(eventData.agenda, id));
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