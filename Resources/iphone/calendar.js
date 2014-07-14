function addCalendar(label, items, onClick, navigationWindow) {
    var window = Titanium.UI.createWindow({
        backgroundColor: "white",
        title: label
    });
    var view = Titanium.UI.createView({
        layout: "vertical",
        backgroundColor: "white",
        width: "100%",
        height: Ti.UI.FILL
    });
    window.add(view);
    view.add(createListView(items, onClick, navigationWindow));
    return window;
}

function createListView(items, onClick, navigationWindow) {
    var sectionParameters = {};
    items.headerTitle && (sectionParameters = {
        headerTitle: items.headerTitle
    });
    var listView = Ti.UI.createListView();
    var sections = [];
    var section = Ti.UI.createListSection(sectionParameters);
    var dataSet = [];
    var title = "";
    var hasChildren = true;
    for (var i in items) {
        if ("headerTitle" === i) continue;
        title = isNaN(parseInt(i)) ? i : items[i].title;
        "undefined" != typeof items[i][0] && (hasChildren = false);
        dataSet.push({
            properties: {
                title: title,
                id: i
            }
        });
    }
    section.setItems(dataSet);
    sections.push(section);
    listView.setSections(sections);
    hasChildren ? listView.addEventListener("itemclick", function(e) {
        var item = section.getItemAt(e.itemIndex);
        var id = item.properties.id;
        var title = item.properties.title;
        var subWindow = addCalendar(title, items[id], onClick, navigationWindow);
        navigationWindow.openWindow(subWindow, {
            animated: true
        });
    }) : listView.addEventListener("itemclick", onClick);
    return listView;
}

exports.add = function(label, items, onClick, navigationWindow) {
    return addCalendar(label, items, onClick, navigationWindow);
};