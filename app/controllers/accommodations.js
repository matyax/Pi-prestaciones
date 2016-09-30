var args = arguments[0] || {};

var data            = require('data'),
    eventData       = data.get('eventData'),
    windowReference = data.get('windowReference'),
    listSearch      = require('listSearch');
    
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

$.searchContainer.setBackgroundColor(eventData.accommodations_background || eventData.styles.button_background);
$.accommodations.setBackgroundColor(eventData.accommodations_background || eventData.styles.button_background);
$.accommodationsContainer.setBackgroundColor(eventData.accommodations_background || eventData.styles.button_background);
$.searchResultsContainer.setBackgroundColor(eventData.accommodations_background || eventData.styles.button_background);


var isSearchVisible = false;

$.searchField.addEventListener('change', function () {
	if ($.searchField.getValue()) {
		
		if (! isSearchVisible) {
			$.accommodationsContainer.hide();
			$.searchResultsContainer.show();
			
			isSearchVisible = true;
		}
		
		
		listSearch.filter($.searchField.getValue());
	} else {
		$.accommodationsContainer.show();
		$.searchResultsContainer.hide();
		
		isSearchVisible = false;
	}
	
});

/* Initialize search */
$.searchResultsContainer.hide();

var heightAdjustment = IOS ? 45 : 0;

$.accommodationsContainer.addEventListener('postlayout', function () {
	if (! $.searchResultsContainer.getHeight()) {
		$.searchResultsContainer.setHeight($.accommodationsContainer.getSize().height - heightAdjustment);
		$.accommodationsContainer.setHeight($.accommodationsContainer.getSize().height - heightAdjustment);
	}
});

listSearch.setBackgroundColor(eventData.accommodations_background || eventData.styles.button_background);
listSearch.setColor(eventData.accommodations_color || eventData.styles.button_foreground);

listSearch.setListView($.searchResults);
listSearch.setClickHandler(accommodationOnclick);
listSearch.setData(eventData.accommodations);


/* Initialize list */
var accommodationNavigation = require('accommodationNavigation');

var accommodationWindow = accommodationNavigation.add(
    eventData.accommodations_label,
    eventData.accommodations,
    accommodationOnclick,
    windowReference, 
    eventData.styles.background,
    $.accommodationsContainer
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