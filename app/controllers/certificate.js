var args = arguments[0] || {};

var data        = require('data'),
    eventData   = data.get('eventData');
    
$.certificateWindow.setTitle(eventData.certificate_label);
$.certificateWindow.setBackgroundColor(eventData.styles.background);
        
var cwWebView = Titanium.UI.createWebView({
    url: eventData.certificate
});

$.certificateWindow.add(cwWebView);