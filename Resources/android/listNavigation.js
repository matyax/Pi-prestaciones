var data = require("data"), eventData = data.get("eventData"), ui = require("ui");

var listHeight = ui.screenHeight() - 110, listItemWidth = ui.screenWidth() - 20;

exports.add = function(label, items, onClick, navigationWindow, backgroundColor, openerWindow) {
    function init(label, items, onClick, navigationWindow, openerWindow) {
        createWindow(label, backgroundColor, createListView(items, onClick, navigationWindow), openerWindow);
    }
    function addCalendar(label, items, onClick, navigationWindow) {
        var window = createWindow(label, backgroundColor, createListView(items, onClick, navigationWindow));
        return window;
    }
    function addCalendarTime(label, items, onClick, navigationWindow) {
        items = addTimeLabels(items);
        return createWindow(label, backgroundColor, createMultipleTitleListView(items, onClick, navigationWindow));
    }
    function createWindow(title, backgroundColor, viewChildren, localOpenerWindow) {
        var window = null;
        if (localOpenerWindow) {
            window = localOpenerWindow;
            window.setBackgroundColor(backgroundColor);
            window.setTitle(title);
        } else window = Titanium.UI.createWindow({
            backgroundColor: backgroundColor,
            title: title
        });
        var view = Titanium.UI.createView({
            layout: "vertical",
            backgroundColor: backgroundColor,
            width: "100%",
            left: 0,
            top: 20,
            height: ui.screenHeight() - 40
        });
        view.add(viewChildren);
        window.add(view);
        return window;
    }
    function createListView(items, onClick, navigationWindow) {
        function addItemsToListView(items) {
            items.headerTitle ? sectionParameters = {
                headerTitle: items.headerTitle
            } : isFinalList = "undefined" != typeof items[0] && items[0].startTime ? false : true;
            section = Ti.UI.createListSection(sectionParameters);
            dataSet = [];
            title = "";
            hasChildren = false;
            itemId = null;
            for (var i in items) {
                if ("headerTitle" === i) continue;
                title = "string" == typeof i ? i : isNaN(parseInt(i)) ? i : items[i].title;
                "undefined" == typeof items[i].length && (hasChildren = true);
                itemId = "undefined" != typeof items[i].id ? items[i].id : i;
                dataSet.push({
                    info: {
                        text: title
                    },
                    properties: {
                        id: itemId,
                        title: title,
                        subItems: items[i],
                        backgroundColor: eventData.styles.button_background
                    }
                });
            }
            section.setItems(dataSet);
            return section;
        }
        var isFinalList = false, sectionParameters = {}, sections = [], section = null, dataSet = [], title = "", hasChildren = false, itemId = null;
        var listView = Ti.UI.createListView({
            backgroundColor: eventData.styles.button_background,
            templates: {
                template: listTemplate
            },
            defaultItemTemplate: "template",
            height: listHeight,
            width: "100%"
        });
        for (var j in items) sections.push(false === isNaN(parseInt(j)) && items[j].headerTitle ? addItemsToListView(items[j]) : addItemsToListView(items));
        listView.setSections(sections);
        isFinalList ? listView.addEventListener("itemclick", function(e) {
            var item = e.section.getItemAt(e.itemIndex);
            var id = item.properties.id;
            var title = item.properties.title;
            onClick(id, title);
        }) : hasChildren ? listView.addEventListener("itemclick", function(e) {
            var item = e.section.getItemAt(e.itemIndex);
            item.properties.id;
            var title = item.properties.title;

            var subWindow = addCalendar(title, item.properties.subItems, onClick, navigationWindow);
            null == navigationWindow ? subWindow.open({
                modal: true
            }) : navigationWindow.openWindow(subWindow, {
                animated: true
            });
        }) : listView.addEventListener("itemclick", function(e) {
            var item = e.section.getItemAt(e.itemIndex);
            item.properties.id;
            var title = item.properties.title;
            var subWindow = addCalendarTime(title, item.properties.subItems, onClick, navigationWindow);
            null == navigationWindow ? subWindow.open({
                modal: true
            }) : navigationWindow.openWindow(subWindow, {
                animated: true
            });
        });
        return listView;
    }
    function createMultipleTitleListView(items, onClick) {
        var listView = Ti.UI.createListView({
            templates: {
                template: listTemplate
            },
            defaultItemTemplate: "template",
            backgroundColor: eventData.styles.button_background,
            height: listHeight,
            width: "100%"
        });
        var sections = [];
        var section = null;
        var dataSet;
        for (var title in items) {
            section = Ti.UI.createListSection({
                headerTitle: title
            });
            dataSet = [];
            for (var i in items[title]) dataSet.push({
                info: {
                    text: items[title][i].title
                },
                properties: {
                    id: items[title][i].id,
                    backgroundColor: eventData.styles.button_background
                }
            });
            section.setItems(dataSet);
            sections.push(section);
        }
        listView.setSections(sections);
        listView.addEventListener("itemclick", function(e) {
            var item = e.section.getItemAt(e.itemIndex);
            var id = item.properties.id;
            var title = item.properties.title;
            onClick(id, title);
        });
        return listView;
    }
    function addTimeLabels(items) {
        var timeItems = {};
        for (var i in items) {
            timeLabel = items[i].endTime ? items[i].startTime + " - " + items[i].endTime : items[i].startTime;
            "undefined" == typeof timeItems[timeLabel] && (timeItems[timeLabel] = []);
            timeItems[timeLabel].push(items[i]);
        }
        return timeItems;
    }
    var listTemplate = {
        childTemplates: [ {
            type: "Ti.UI.Label",
            bindId: "info",
            properties: {
                borderWidth: 0,
                backgroundColor: eventData.styles.button_background,
                color: eventData.styles.button_foreground,
                left: 10,
                font: {
                    fontSize: 18
                },
                height: Ti.UI.FILL,
                width: listItemWidth
            }
        } ]
    };
    return init(label, items, onClick, navigationWindow, openerWindow);
};