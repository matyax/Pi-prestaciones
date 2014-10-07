var windowStatus = false;

var loadingWin = null;

exports.open = openWindow;

function openWindow() {
	if (windowStatus) {
		closeWindow();
	}
	
	loadingWin = Ti.UI.createWindow({
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
	
	loadingWin.add(activityIndicator);
	
	loadingWin.addEventListener('open', function(e) {
	    activityIndicator.show();
	});
	
    loadingWin.open();
    
    windowStatus = true;
};

exports.close = closeWindow;

function closeWindow() {
	if (windowStatus == false) {
		return;
	}
	
    loadingWin.close();
    
    windowStatus = false;
};
