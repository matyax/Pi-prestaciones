var args = arguments[0] || {};

var data            = require('data'),
    eventData       = data.get('eventData'),
    title           = eventData.favorites_label || 'Favoritos',
    windowReference = data.get('windowReference'),
    section         = null;
    
$.favoriteWindow.setTitle(title);
$.favoriteWindow.setBackgroundColor(eventData.styles.background);

$.list.setBackgroundColor(eventData.styles.button_background);

refreshList();

function refreshList(clear) {
    if (clear == true) {
        $.list.deleteSectionAt(0);
        
        $.list.removeEventListener('itemclick', itemClicked);
    }
    
    var sections    = [],
        dataSet     = [],
        favorites   = favorites = Alloy.createCollection('favorite');
        
    favorites.fetch();
    
    section = Ti.UI.createListSection(),
    
    favorites.map(function (favorite) {
        if (! favorite.get('idAgendaItem')) {
            favorite.destroy();
            
            return;
        }
        
        //console.log(favorite.get('idAgendaItem') + ': ' + favorite.get('title'));
        
        dataSet.push({ 
            properties: { 
                title: favorite.get('title'), 
                id: favorite.get('idAgendaItem'),
                color: eventData.styles.button_foreground,
                backgroundColor: eventData.styles.button_background
            } 
        });
    }); 
        
    section.setItems(dataSet);
    sections.push(section);
    
    $.list.setSections(sections);
    
    $.list.addEventListener('itemclick', itemClicked);
}

function itemClicked(e) {
    var item = section.getItemAt(e.itemIndex);
    
    var agendaItem = searchItem(eventData.agenda, item.properties.id);
    
    if (agendaItem == null) {
        var favorites = Alloy.createCollection('favorite');
        
        favorites.fetch();
        
        favorites.map(function (favorite) {
            if (favorite.get('idAgendaItem') == item.properties.id) {
                favorite.destroy();
                
                return;
            }
        });
        
        refreshList(true); 
        
        return;
    }
    
    data.set('agendaItem', agendaItem);
    
   var detailWindow = Alloy.createController('agendaDetail').getView();
    
    if (Titanium.Platform.osname == 'android') {
        detailWindow.open({
            modal: true
        });
    } else {
        windowReference.openWindow(detailWindow, { animated:true });
    }
}

function getFavorite(id) {
    var favorites   = favorites = Alloy.createCollection('favorite');
        
    favorites.fetch();
    
    var item = null;
    
    favorites.map(function (favorite) {
        if (favorite.get('idAgendaItem') == id) {
            item = {
                id: favorite.get('idAgendaItem'),
                title: favorite.get('title'),
                description: favorite.get('description'),
                date: favorite.get('date'),
                startTime: favorite.get('startTime'),
                endTime: favorite.get('endTime')
            };
        } 
    });
    
    return item;
}

function searchItem(items, id) {
    return eventData.agenda_details[id];
}