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
        title: "",
        id: "index"
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
        top: "50dp",
        width: "100%",
        textAlign: "center",
        text: "Eventos actuales",
        id: "congressTitle"
    });
    $.__views.index.add($.__views.congressTitle);
    exports.destroy = function() {};
    _.extend($, $.__views);
    $.index.open();
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;