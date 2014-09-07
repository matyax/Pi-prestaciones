var args = arguments[0] || {};

var data        = require('data'),
    eventData   = data.get('eventData');
    
$.linkWindow.setTitle(eventData.link_label);
$.linkWindow.setBackgroundColor(eventData.styles.background);
        
var cwWebView = Titanium.UI.createWebView({
    url: eventData.link_url
});

$.linkWindow.add(cwWebView);