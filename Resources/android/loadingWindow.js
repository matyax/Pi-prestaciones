function openWindow() {
    windowStatus && closeWindow();
    loadingWindow = Alloy.createController("loading").getView();
    loadingWindow.open();
    windowStatus = true;
}

function closeWindow() {
    if (false == windowStatus) return;
    loadingWindow.close();
    windowStatus = false;
}

var windowStatus = false;

var loadingWindow = null;

exports.open = openWindow;

exports.close = closeWindow;