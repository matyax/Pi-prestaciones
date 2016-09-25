var args = arguments[0] || {};

var data             = require('data'),
    eventData        = data.get('eventData'),
    windowReference  = data.get('windowReference'),
    exhibitionHelper = require('exhibitionHelper'); 
        
var agendaOnclick = function (id, title) {
    var item = exhibitionHelper.findStand(id);
    
    if ((! item) || (! item.items)) {
        return;
    }
    
    data.set('page', item);
    
    var detailWindow = Alloy.createController('page').getView();
    
    if (Titanium.Platform.osname == 'android') {
        detailWindow.open({
            modal: true
        });
    } else {
        windowReference.openWindow(detailWindow, { animated:true });
    }
};

$.exhibitions.setBackgroundColor(eventData.exhibition_background || eventData.styles.button_background);

/* Initialize list */
var listNavigation = require('listNavigation');

listNavigation.add(
    eventData.exhibition_label,
    exhibitionHelper.transformData(eventData.exhibitions),
    agendaOnclick,
    windowReference,
    eventData.styles.button_background,
    $.exhibitions,
    'exhibition'
);