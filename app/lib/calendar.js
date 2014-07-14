exports.add = function (label, items, onClick, navigationWindow) {
    return addCalendar(label, items, onClick, navigationWindow);
};

function addCalendar(label, items, onClick, navigationWindow) {
    var window = Titanium.UI.createWindow({
        backgroundColor: 'white',
        title: label
    });
    
    var view = Titanium.UI.createView({
       layout: 'vertical',
       backgroundColor: 'white',
       width: '100%',
       height: Ti.UI.FILL
    });
    
    window.add(view);
    
    view.add( createListView(items, onClick, navigationWindow) );
    
    return window;
}

function addCalendarTime(label, items, onClick, navigationWindow) {
    var window = Titanium.UI.createWindow({
        backgroundColor: 'white',
        title: label
    });
    
    var view = Titanium.UI.createView({
       layout: 'vertical',
       backgroundColor: 'white',
       width: '100%',
       height: Ti.UI.FILL
    });
    
    window.add(view);
    
    items = addTimeLabels(items);
    
    view.add( createListView(items, onClick, navigationWindow) );
    
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

function addTimeLabels(items) {
    var newItems = {}, item = null;
    
    for(var i in items) {
        if (typeof newItems[items[i].date] == 'undefined') {
            newItems[items[i].date] = [];
        }
        
        newItems[items[i].date].push(items[i]);
    }
    
    return newItems;
}
