function openWindow() {
    windowStatus && closeWindow();
    loadingWindow.open();
    windowStatus = true;
}

function closeWindow() {
    if (false == windowStatus) return;
    loadingWindow.close();
    activityIndicator.hide();
    windowStatus = false;
}

var windowStatus = false;

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

exports.open = openWindow;

exports.close = closeWindow;