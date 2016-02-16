var args = arguments[0] || {};

var data            = require('data'),
    eventData       = data.get('eventData'),
    windowReference = data.get('windowReference');
        
var agendaOnclick = function (id, title) {
    var item = eventData.agenda_details[id];
    
    if ((! item) || (! item.items)) {
        return;
    }
    
    data.set('agendaItem', item);
    
    var detailWindow = Alloy.createController('agendaDetail').getView();
    
    if (Titanium.Platform.osname == 'android') {
        detailWindow.open({
            modal: true
        });
    } else {
        windowReference.openWindow(detailWindow, { animated:true });
    }
};

$.searchContainer.setBackgroundColor(eventData.styles.button_background);
$.agendaContainer.setBackgroundColor(eventData.styles.button_background);

$.searchField.addEventListener('change', function () {
	if ($.searchField.getValue()) {
		$.agendaContainer.hide();
	} else {
		$.agendaContainer.show();
	}
	
});

var listNavigation = require('listNavigation');

listNavigation.add(
    eventData.agenda_label,
    eventData.agenda,
    agendaOnclick,
    windowReference,
    eventData.styles.button_background,
    $.agendaContainer
);