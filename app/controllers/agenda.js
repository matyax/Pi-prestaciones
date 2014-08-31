var args = arguments[0] || {};

var data            = require('data'),
    eventData       = data.get('eventData'),
    windowReference = data.get('windowReference');
        
var agendaOnclick = function (id, title) {
    data.set('agendaItem', searchItem(eventData.agenda, id));
    
    var detailWindow = Alloy.createController('agendaDetail').getView();
    
    if (Titanium.Platform.osname == 'android') {
        detailWindow.open({
            modal: true
        });
    } else {
        windowReference.openWindow(detailWindow, { animated:true });
    }
};

var listNavigation = require('listNavigation');

listNavigation.add(
    eventData.agenda_label,
    eventData.agenda,
    agendaOnclick,
    windowReference,
    eventData.styles.button_background,
    $.agenda
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