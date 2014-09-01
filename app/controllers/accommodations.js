var args = arguments[0] || {};

var data            = require('data'),
    eventData       = data.get('eventData'),
    windowReference = data.get('windowReference');
    
var accommodationOnclick = function (id, title) {
    
    data.set('page', searchItem(eventData.accommodations, id));
    
    var detailWindow = Alloy.createController('page').getView();
    
    if (Titanium.Platform.osname == 'android') {
        detailWindow.open({
            modal: true
        });
    } else {
        windowReference.openWindow(detailWindow, { animated:true });
    }
};

var accommodationNavigation = require('listNavigation');

var accommodationWindow = accommodationNavigation.add(
    eventData.accommodations_label,
    eventData.accommodations,
    accommodationOnclick,
    windowReference, 
    eventData.styles.background,
    $.accommodations
);

function searchItem(items, id) {
    var item = null;
    
    for (var i in items) {
        if (typeof items[i] != 'object') {
            continue;
        } else if (isNaN(parseInt(i))) {
            item = searchItem(items[i], id);
            
            if (item) {
                return item;
            }
        } else {
            if ((items[i].id) && (items[i].id == id)) {
                return items[i];
            }
        }
    }
    
    return null;
}