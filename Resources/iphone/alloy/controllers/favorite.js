function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function refreshList(clear) {
        if (true == clear) {
            $.list.deleteSectionAt(0);
            $.list.removeEventListener("itemclick", itemClicked);
        }
        var sections = [], dataSet = [], favorites = favorites = Alloy.createCollection("favorite");
        favorites.fetch();
        section = Ti.UI.createListSection(), favorites.map(function(favorite) {
            if (!favorite.get("idAgendaItem")) {
                favorite.destroy();
                return;
            }
            dataSet.push({
                properties: {
                    title: favorite.get("title"),
                    id: favorite.get("idAgendaItem"),
                    color: eventData.styles.button_foreground,
                    backgroundColor: eventData.styles.button_background
                }
            });
        });
        section.setItems(dataSet);
        sections.push(section);
        $.list.setSections(sections);
        $.list.addEventListener("itemclick", itemClicked);
    }
    function itemClicked(e) {
        var item = section.getItemAt(e.itemIndex);
        var agendaItem = searchItem(eventData.agenda, item.properties.id);
        if (null == agendaItem) {
            var favorites = Alloy.createCollection("favorite");
            favorites.fetch();
            favorites.map(function(favorite) {
                if (favorite.get("idAgendaItem") == item.properties.id) {
                    favorite.destroy();
                    return;
                }
            });
            refreshList(true);
            return;
        }
        data.set("agendaItem", agendaItem);
        var detailWindow = Alloy.createController("agendaDetail").getView();
        "android" == Titanium.Platform.osname ? detailWindow.open({
            modal: true
        }) : windowReference.openWindow(detailWindow, {
            animated: true
        });
    }
    function searchItem(items, id) {
        return eventData.agenda_details[id];
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "favorite";
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
    $.__views.favoriteWindow = Ti.UI.createWindow({
        layout: "vertical",
        orientationModes: [ Ti.UI.PORTRAIT ],
        id: "favoriteWindow",
        title: "Lista"
    });
    $.__views.favoriteWindow && $.addTopLevelView($.__views.favoriteWindow);
    $.__views.favoriteView = Ti.UI.createView({
        id: "favoriteView"
    });
    $.__views.favoriteWindow.add($.__views.favoriteView);
    $.__views.list = Ti.UI.createListView({
        id: "list"
    });
    $.__views.favoriteView.add($.__views.list);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var data = require("data"), eventData = data.get("eventData"), title = eventData.favorites_label || "Favoritos", windowReference = data.get("windowReference"), section = null;
    $.favoriteWindow.setTitle(title);
    $.favoriteWindow.setBackgroundColor(eventData.styles.background);
    $.list.setBackgroundColor(eventData.styles.button_background);
    refreshList();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;