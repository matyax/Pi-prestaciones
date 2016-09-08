var data        = require('data'),
    eventData   = data.get('eventData'),
    ui          = require('ui');

var listHeight = Ti.UI.FILL,
    listItemWidth = ui.screenWidth() - 20;

exports.add = function (label, items, onClick, navigationWindow, backgroundColor, openerWindow) {

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
                    width: listItemWidth,
                }
            }
        ]
    };

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
           top: 20,
           height: Ti.UI.FILL
        });

        view.add(viewChildren);

        window.add(view);

        return window;
    }

    function createListView(items, onClick, navigationWindow)
    {
        var isFinalList         = false,
            sectionParameters   = {},
            sections            = [],
            section             = null,
            dataSet             = [],
            title               = '',
            hasChildren         = false,
            itemId              = null;

        var listView = Ti.UI.createListView({
        	id: "listNavigationList",
            backgroundColor: eventData.styles.button_background,
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
            if (items.headerTitle) {
                sectionParameters = { headerTitle: items.headerTitle };
            } else if ((typeof items[0] != 'undefined') && (items[0].startTime)) {
                isFinalList = false;
            }
            else {
                isFinalList = true;
            }

            section = Ti.UI.createListSection(sectionParameters);
            dataSet = [];
            title = '';
            hasChildren = false;
            itemId = null;

            for (var i in items) {
                title = items[i].title;
                itemId = items[i].id;
                
                dataSet.push({
                    info: {
                        text: title
                    },
                    properties: {
                        id: itemId,
                        title: title,
                        subItems: items[i],
                        backgroundColor: eventData.styles.button_background,
                        color: eventData.styles.button_foreground,
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