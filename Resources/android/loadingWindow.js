Ti.UI.backgroundColor = "white";

var loadingWindow = Ti.UI.createWindow({
    backgroundColor: "yellow",
    fullscreen: true
});

var style;

style = Ti.UI.ActivityIndicatorStyle.DARK;

var activityIndicator = Ti.UI.createActivityIndicator({
    color: "green",
    font: {
        fontFamily: "Helvetica Neue",
        fontSize: 26,
        fontWeight: "bold"
    },
    message: "Loading...",
    style: style,
    top: 10,
    left: 10,
    height: Ti.UI.SIZE,
    width: Ti.UI.SIZE
});

loadingWindow.add(activityIndicator);

loadingWindow.addEventListener("open", function() {
    activityIndicator.show();
});

win2.open();

exports.open = function() {
    loadingWindow.open();
};

exports.close = function() {
    loadingWindow.close();
    activityIndicator.hide();
};