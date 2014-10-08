var windowStatus = false;

var loadingWindow = null;

function openWindow() {
	if (windowStatus) {
		closeWindow();
	}
	
	loadingWindow = Alloy.createController('loading').getView();
            
    loadingWindow.open();
    
    windowStatus = true;
};

function closeWindow() {
	if (windowStatus == false) {
		return;
	}
	
    loadingWindow.close();
    
    windowStatus = false;
};

exports.open	= openWindow;
exports.close 	= closeWindow;