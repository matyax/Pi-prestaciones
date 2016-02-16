var data          = require('data'),
    eventData     = data.get('eventData'),
    ui            = require('ui'),
    listItemWidth = ui.screenWidth() - 20,
    listView      = null;

var listTemplate = {
    childTemplates: [
        {
            type: 'Ti.UI.Label',
            bindId: 'info',
            properties: {
                borderWidth: 0,
                backgroundColor: eventData.styles.button_background,
                color: eventData.styles.button_foreground,
                left: 10,
                font: { fontSize: 18 },
                height: Ti.UI.FILL,
                width: listItemWidth
            }
        }
    ]
};

exports.setListView = function (newListView) {
	listView = newListView;
	
	listView.setBackgroundColor(eventData.styles.button_background);
	listView.setTemplates({ 'template': listTemplate });
	
	setListViewSectionTitle(listView);
};

function setListViewSectionTitle() {
	var sections = listView.getSections();
	
	if (! sections.length) {
		Titanium.API.error('Search results section not found');
	}
	
	sections[0].setHeaderTitle('Resultados de la búsqueda');
	
	sections[0].setItems([
		{
            info: {
                text: 'Test'
            },
            properties: {
                backgroundColor: 'red'
            }
        }
	]);
	
	listView.setSections(sections);
}

exports.search = function (query) {
	
};
