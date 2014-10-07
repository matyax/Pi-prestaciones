function openWindow() {
    windowStatus && closeWindow();
    loadingWin = Ti.UI.createWindow({
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
    loadingWin.add(activityIndicator);
    loadingWin.addEventListener("open", function() {
        activityIndicator.show();
    });
    loadingWin.open();
    windowStatus = true;
}

function closeWindow() {
    if (false == windowStatus) return;
    loadingWin.close();
    windowStatus = false;
}

var windowStatus = false;

var loadingWin = null;

exports.open = openWindow;

exports.close = closeWindow;