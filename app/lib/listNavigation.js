var data        = require('data'),
    eventData   = data.get('eventData'),
    ui			= require('ui');
    
var listHeight = ui.screenHeight() - 110;

exports.add = function (label, items, onClick, navigationWindow, backgroundColor, openerWindow) {

    function init(label, items, onClick, navigationWindow, openerWindow) {
        createWindow(
            label,
            backgroundColor,
            createListView(items, onClick, navigationWindow),
            openerWindow
        );
    }

    function addCalendar(label, items, onClick, navigationWindow) {
        var window = createWindow(
            label,
            backgroundColor,
            createListView(items, onClick, navigationWindow)
        );

        return window;
    }

    function addCalendarTime(label, items, onClick, navigationWindow) {
        items = addTimeLabels(items);

        return createWindow(
            label,
            backgroundColor,
            createMultipleTitleListView(items, onClick, navigationWindow)
        );
    }

    function createWindow(title, backgroundColor, viewChildren, localOpenerWindow) {
        var window = null;

        if (localOpenerWindow) {
            window = localOpenerWindow;

            window.setBackgroundColor(backgroundColor);
            window.setTitle(title);
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
           height: ui.screenHeight() - 40
        });

        view.add(viewChildren);

        window.add(view);

        return window;
    }

    function createListView(items, onClick, navigationWindow)
    {
        var isFinalList = false;

        var sectionParameters = {};

        if (items.headerTitle) {
            sectionParameters = { headerTitle: items.headerTitle};
        } else {
            isFinalList = true;
        }

        var listView = Ti.UI.createListView({
            backgroundColor: eventData.styles.button_background,
            font: {
                fontSize: 15
            },
            height: listHeight
        });
        var sections = [];

        var section = Ti.UI.createListSection(sectionParameters);
        var dataSet = [];

        var title = '';

        var hasChildren = true;

        var itemId = null;

        for (var i in items) {
            if (i === 'headerTitle') {
                continue;
            }

            if (! isNaN(parseInt(i))) {
                title = items[i].title;
            } else {
                title = i;
            }

            if (typeof items[i][0] != 'undefined'){
                hasChildren = false;
            }

            if (typeof items[i].id != 'undefined') {
                itemId = items[i].id;
            } else {
                itemId = i;
            }

            dataSet.push({
                properties: {
                    title: title,
                    id: itemId,
                    color: eventData.styles.button_foreground,
                    backgroundColor: eventData.styles.button_background,
                    font: {
                        fontSize: 15
                    }
                }
            });
        }

        section.setItems(dataSet);
        sections.push(section);

        listView.setSections(sections);

        if (isFinalList) {
            listView.addEventListener('itemclick', function (e) {
                var item = section.getItemAt(e.itemIndex);

                var id      = item.properties.id;
                var title   = item.properties.title;

                onClick(id, title);
            });
        }
        else if (hasChildren) {
            listView.addEventListener('itemclick', function (e) {
                var item = section.getItemAt(e.itemIndex);

                var id      = item.properties.id;
                var title   = item.properties.title;

                var subWindow = addCalendar(title, items[id], onClick, navigationWindow);

                if (navigationWindow == null) {
                    subWindow.open({
                        modal: true
                    });
                } else {
                    navigationWindow.openWindow(subWindow, {animated:true});
                }
            });
        } else {
            listView.addEventListener('itemclick', function (e) {
                var item = section.getItemAt(e.itemIndex);

                var id      = item.properties.id;
                var title   = item.properties.title;

                var subWindow = addCalendarTime(title, items[id], onClick, navigationWindow);

                if (navigationWindow == null) {
                    subWindow.open({
                        modal: true
                    });
                } else {
                    navigationWindow.openWindow(subWindow, {animated:true});
                }
            });
        }

        return listView;
    }

    function createMultipleTitleListView(items, onClick, navigationWindow)
    {
        var listView = Ti.UI.createListView({
            backgroundColor: eventData.styles.button_background,
            height: listHeight
        });

        var sections = [];

        var section = null;
        var dataSet;

        for (var title in items) {
            section = Ti.UI.createListSection({ headerTitle: title });

            dataSet = [];

            for (var i in items[title]) {
                dataSet.push({
                    properties: {
                        title: items[title][i].title,
                        id: items[title][i].id,
                        color: eventData.styles.button_foreground,
                        backgroundColor: eventData.styles.button_background
                    }
                });
            }

            section.setItems(dataSet);
            sections.push(section);
        }

        listView.setSections(sections);

        listView.addEventListener('itemclick', function (e) {
            var item = e.section.getItemAt(e.itemIndex);

            var id      = item.properties.id;
            var title   = item.properties.title;

            onClick(id, title);
        });

        return listView;
    }

    function addTimeLabels(items) {
        var timeItems = {},
            timelabel = null,
            item = null;

        for(var i in items) {
            timeLabel = items[i].endTime ? items[i].startTime + ' - ' + items[i].endTime : items[i].startTime;

            if (typeof timeItems[timeLabel] == 'undefined') {
                timeItems[timeLabel] = [];
            }

            timeItems[timeLabel].push(items[i]);
        }

        return timeItems;
    }

    return init(label, items, onClick, navigationWindow, openerWindow);
};
