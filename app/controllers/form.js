var args = arguments[0] || {};

var data            = require('data'),
    eventData       = data.get('eventData');

$.formWindow.setTitle(eventData.form_label);
$.formWindow.setBackgroundColor(eventData.styles.background);
        
var formWebView = Titanium.UI.createWebView({
    url: eventData.form
});

$.formWindow.add(formWebView);