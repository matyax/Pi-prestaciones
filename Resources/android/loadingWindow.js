Ti.UI.backgroundColor = "white";

var loadingWindow = Ti.UI.createWindow({
    backgroundColor: "black",
    opacity: .8,
    fullscreen: true
});

var style;

style = Ti.UI.ActivityIndicatorStyle.BIG;

var activityIndicator = Ti.UI.createActivityIndicator({
    style: style,
    height: Ti.UI.SIZE,
    width: Ti.UI.SIZE
});

loadingWindow.add(activityIndicator);

loadingWindow.addEventListener("open", function() {
    activityIndicator.show();
});

exports.open = function() {
    loadingWindow.open();
};

exports.close = function() {
    loadingWindow.close();
    activityIndicator.hide();
};