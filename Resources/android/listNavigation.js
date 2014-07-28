exports.add = function(label, items, onClick, navigationWindow, backgroundColor) {
    function addCalendar(label, items, onClick, navigationWindow) {
        var window = createWindow(label, backgroundColor, createListView(items, onClick, navigationWindow));
        return window;
    }
    function addCalendarTime(label, items, onClick, navigationWindow) {
        items = addTimeLabels(items);
        return createWindow(label, backgroundColor, createMultipleTitleListView(items, onClick, navigationWindow));
    }
    function createWindow(title, backgroundColor, viewChildren) {
        var window = Titanium.UI.createWindow({
            backgroundColor: backgroundColor,
            title: title
        });
        var view = Titanium.UI.createView({
            layout: "vertical",
            backgroundColor: backgroundColor,
            width: "100%",
            height: Ti.UI.FILL
        });
        view.add(viewChildren);
        window.add(view);
        return window;
    }
    function createListView(items, onClick, navigationWindow) {
        var isFinalList = false;
        var sectionParameters = {};
        items.headerTitle ? sectionParameters = {
            headerTitle: items.headerTitle
        } : isFinalList = true;
        var listView = Ti.UI.createListView();
        var sections = [];
        var section = Ti.UI.createListSection(sectionParameters);
        var dataSet = [];
        var title = "";
        var hasChildren = true;
        var itemId = null;
        for (var i in items) {
            if ("headerTitle" === i) continue;
            title = isNaN(parseInt(i)) ? i : items[i].title;
            "undefined" != typeof items[i][0] && (hasChildren = false);
            itemId = "undefined" != typeof items[i].id ? items[i].id : i;
            dataSet.push({
                properties: {
                    title: title,
                    id: itemId
                }
            });
        }
        section.setItems(dataSet);
        sections.push(section);
        listView.setSections(sections);
        isFinalList ? listView.addEventListener("itemclick", function(e) {
            var item = section.getItemAt(e.itemIndex);
            var id = item.properties.id;
            var title = item.properties.title;
            onClick(id, title);
        }) : hasChildren ? listView.addEventListener("itemclick", function(e) {
            var item = section.getItemAt(e.itemIndex);
            var id = item.properties.id;
            var title = item.properties.title;
            var subWindow = addCalendar(title, items[id], onClick, navigationWindow);
            navigationWindow.openWindow(subWindow, {
                animated: true
            });
        }) : listView.addEventListener("itemclick", function(e) {
            var item = section.getItemAt(e.itemIndex);
            var id = item.properties.id;
            var title = item.properties.title;
            var subWindow = addCalendarTime(title, items[id], onClick, navigationWindow);
            navigationWindow.openWindow(subWindow, {
                animated: true
            });
        });
        return listView;
    }
    function createMultipleTitleListView(items, onClick) {
        var listView = Ti.UI.createListView();
        var sections = [];
        var section = null;
        var dataSet = [];
        for (var title in items) {
            section = Ti.UI.createListSection({
                headerTitle: title
            });
            for (var i in items[title]) dataSet.push({
                properties: {
                    title: items[title][i].title,
                    id: items[title][i].id
                }
            });
            section.setItems(dataSet);
            sections.push(section);
        }
        listView.setSections(sections);
        listView.addEventListener("itemclick", function(e) {
            var item = section.getItemAt(e.itemIndex);
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
    return addCalendar(label, items, onClick, navigationWindow);
};