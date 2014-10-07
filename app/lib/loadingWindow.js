var windowStatus = false;

var loadingWindow = Ti.UI.createWindow({
    backgroundColor : 'black',
    opacity: 0.8,
    fullscreen : true
});

var style;
if (Ti.Platform.name === 'iPhone OS') {
    style = Ti.UI.iPhone.ActivityIndicatorStyle.BIG;
} else {
    style = Ti.UI.ActivityIndicatorStyle.BIG;
}
var activityIndicator = Ti.UI.createActivityIndicator({
    style : style,
    height : Ti.UI.SIZE,
    width : Ti.UI.SIZE
});

loadingWindow.add(activityIndicator);

loadingWindow.addEventListener('open', function(e) {
    activityIndicator.show();
});

exports.open = openWindow;

function openWindow() {
	if (windowStatus) {
		closeWindow();
	}
	
    loadingWindow.open();
    
    windowStatus = true;
};

exports.close = closeWindow;

function closeWindow() {
	if (windowStatus == false) {
		return;
	}
	
    loadingWindow.close();
    
    activityIndicator.hide();
    
    windowStatus = false;
};
