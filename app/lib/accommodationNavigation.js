var data        = require('data'),
    eventData   = data.get('eventData'),
    ui          = require('ui');

var listHeight = Ti.UI.FILL,
    listItemWidth = ui.screenWidth() - 20;

exports.add = function (label, items, onClick, navigationWindow, backgroundColor, openerWindow) {

    var listTemplate;
    
    var backgroundColor = eventData.accommodations_background || eventData.styles.button_background,
		fontColor       = eventData.accommodations_color || eventData.styles.button_foreground;
    
    if (eventData.accommodations_style == 'list') {
		listTemplate = {
	        childTemplates: [
	            {
	                type: 'Ti.UI.Label',
	                bindId: 'info',
	                properties: {
	                    borderWidth: 0,
	                    backgroundColor: backgroundColor,
	                    color: fontColor,
	                    left: 10,
	                    font: { fontSize: 18 },
	                    height: Ti.UI.FILL,
	                    width: listItemWidth,
	                }
	            }
	        ]
	    };
	} else {
		listTemplate = {
	        childTemplates: [
		        {
		            type: 'Ti.UI.ImageView',
		            bindId: 'pic',
		            properties: {
		                width: 35,
		                height: 35,
		                left: 5,
		                top: 5
		            }
		        },
	            {
	                type: 'Ti.UI.Label',
	                bindId: 'info',
	                properties: {
	                    borderWidth: 0,
	                    backgroundColor: backgroundColor,
	                    color: fontColor,
	                    left: 50,
	                    height: 50,
	                    font: { fontSize: 18 },
	                    height: Ti.UI.FILL,
	                    width: listItemWidth - 50
	                }
	            }
	        ]
	    };
	}

    function init(label, items, onClick, navigationWindow, openerWindow) {
        createWindow(
            label,
            backgroundColor,
            createListView(items, onClick, navigationWindow),
            openerWindow
        );
    }

    function createWindow(title, backgroundColor, viewChildren, localOpenerWindow) {
        var window = null;

        if (localOpenerWindow) {
            window = localOpenerWindow;

            window.setBackgroundColor(backgroundColor);
            
            if (window.setTitle) {
            	window.setTitle(title);
            }
        } else {
            window = Titanium.UI.createWindow({
                backgroundColor: backgroundColor,
                title: title
            });
        }

        var view = Titanium.UI.createView({
           layout: 'vertical',
           backgroundColor: backgroundColor,
           width: '100%',
           left: 0,
           top: 0,
           height: Ti.UI.FILL
        });

        view.add(viewChildren);

        window.add(view);

        return window;
    }

    function createListView(items, onClick, navigationWindow)
    {
        var sections = [],
            section  = null,
            dataSet  = [],
            title    = '',
            itemId   = null;

        var listView = Ti.UI.createListView({
        	id: "listNavigationList",
            backgroundColor: backgroundColor,
            templates: { 'template': listTemplate },
            defaultItemTemplate: 'template',
            height: listHeight,
            width: '100%'
        });

        sections.push(
            addItemsToListView(items)
        );    

        listView.setSections(sections);

        function addItemsToListView(items) {
            section = Ti.UI.createListSection({});
            
            dataSet = [];
            title = '';
            itemId = null;
            
            var image;

            for (var i in items) {
                title = items[i].title;
                itemId = items[i].id;
                
                image = items[i].image || '/icons/silhouette_light.png';
                
                dataSet.push({
                    info: {
                        text: title
                    },
                    pic: {
						image: image
                    },
                    properties: {
                        id: itemId,
                        title: title,
                        subItems: items[i],
                        backgroundColor: backgroundColor,
                        color: fontColor,
                        font: {
                        	fontSize: 20
                        }
                    }
                });
            }

            section.setItems(dataSet);

            return section;
        };

        listView.addEventListener('itemclick', function (e) {
            var item = e.section.getItemAt(e.itemIndex);

            var id      = item.properties.id;
            var title   = item.properties.title;

            onClick(id, title);
        });
        
        return listView;
    }

    return init(label, items, onClick, navigationWindow, openerWindow);
};