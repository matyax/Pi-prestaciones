exports.add = function (label, items, onClick, navigationWindow) {
    return addCalendar(label, items, onClick, navigationWindow);
};

function addCalendar(label, items, onClick, navigationWindow) {
    var window = createWindow(
        label,
        'white',
        createListView(items, onClick, navigationWindow)
    );
    
    return window;
}

function addCalendarTime(label, items, onClick, navigationWindow) {
    items = addTimeLabels(items);
    
    return createWindow(
        label,
        'white',
        createMultipleTitleListView(items, onClick, navigationWindow)
    );
}

function createWindow(title, backgroundColor, viewChildren) {
    var window = Titanium.UI.createWindow({
        backgroundColor: backgroundColor,
        title: title
    });
    
    var view = Titanium.UI.createView({
       layout: 'vertical',
       backgroundColor: backgroundColor,
       width: '100%',
       height: Ti.UI.FILL
    });
    
    view.add(viewChildren);
    
    window.add(view);
    
    return window;
} 

function createListView(items, onClick, navigationWindow)
{
    var sectionParameters = {};
    
    if (items.headerTitle) {
        sectionParameters = { headerTitle: items.headerTitle};
    }
    
    var listView = Ti.UI.createListView();
    var sections = [];
    
    var section = Ti.UI.createListSection(sectionParameters);
    var dataSet = [];
    
    var title = '';
    
    var hasChildren = true;
    
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
        
        dataSet.push(
            { properties: { title: title, id: i } }
        );
    }
    
    section.setItems(dataSet);
    sections.push(section);
    
    listView.setSections(sections);
    
    if (hasChildren) {
        listView.addEventListener('itemclick', function (e) {
            var item = section.getItemAt(e.itemIndex);
            
            var id      = item.properties.id;
            var title   = item.properties.title;
            
            var subWindow = addCalendar(title, items[id], onClick, navigationWindow);
            
            navigationWindow.openWindow(subWindow, {animated:true});
        });
    } else {
        listView.addEventListener('itemclick', function (e) {
            var item = section.getItemAt(e.itemIndex);
            
            var id      = item.properties.id;
            var title   = item.properties.title;
            
            var subWindow = addCalendarTime(title, items[id], onClick, navigationWindow);
            
            navigationWindow.openWindow(subWindow, {animated:true});
        });
    }
    
    return listView;
}

function createMultipleTitleListView(items, onClick, navigationWindow)
{
    var listView = Ti.UI.createListView();
    var sections = [];
    
    var section = null;
    var dataSet = [];

    for (var title in items) {
        section = Ti.UI.createListSection({ headerTitle: title });
        
        for (var i in items[title]) {
            dataSet.push(
                { properties: { title: items[title][i].title, id: items[title][i].id } }
            );            
        }
        
        section.setItems(dataSet);
        sections.push(section);
    }
    
    listView.setSections(sections);
    
    listView.addEventListener('itemclick', function (e) {
        var item = section.getItemAt(e.itemIndex);
        
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
