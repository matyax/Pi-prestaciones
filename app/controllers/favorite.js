var args = arguments[0] || {};

var data            = require('data'),
	listSearch		= require('listSearch'),
    eventData       = data.get('eventData'),
    title           = eventData.favorites_label || 'Favoritos',
    windowReference = data.get('windowReference'),
    section         = null;
    
$.favoriteWindow.setTitle(title);
$.favoriteWindow.setBackgroundColor(eventData.styles.background);

$.list.setBackgroundColor(eventData.styles.button_background);

listSearch.setListView($.list);
listSearch.setClickHandler(itemClicked);

refreshList();

function refreshList(clear) {
    if (clear == true) {
        $.list.setSections([]);
    }
    
    var favorites = favorites = Alloy.createCollection('favorite');
        
    favorites.fetch();
    
    var results = [];
    
    favorites.map(function (favorite) {
        if (! favorite.get('idAgendaItem')) {
            favorite.destroy();
            
            return;
        }
        
        results.push(
        	searchItem(eventData.agenda, favorite.get('idAgendaItem'))
        );
    }); 
        
    listSearch.displayResults(results);
}

function itemClicked(id, title) {
    var agendaItem = searchItem(eventData.agenda, id);
    
    if (agendaItem == null) {
        var favorites = Alloy.createCollection('favorite');
        
        favorites.fetch();
        
        favorites.map(function (favorite) {
            if (favorite.get('idAgendaItem') == id) {
                favorite.destroy();
                
                return;
            }
        });
        
        refreshList(); 
        
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