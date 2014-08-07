var args = arguments[0] || {};

var data            = require('data'),
    eventData       = data.get('eventData'),
    title           = eventData.favorites_label || 'Favoritos',
    windowReference = data.get('windowReference'),
    section         = null;
    
$.favoriteWindow.setTitle(title);

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
    
    favorites.map(function (favorite) {
        dataSet.push({ 
            properties: { 
                title: favorite.get('title'), 
                id: favorite.get('idAgendaItem') 
            } 
        });
    });
    
    console.log(dataSet);
    
    section = Ti.UI.createListSection(), 
        
    section.setItems(dataSet);
    sections.push(section);
    
    $.list.setSections(sections);
    
    $.list.addEventListener('itemclick', itemClicked);
}

function itemClicked(e) {
        var item = section.getItemAt(e.itemIndex);
        
        var item = getFavorite(item.properties.id);
        
        var window = createAgendaDetailWindow(item);
        
        if (Titanium.Platform.osname == 'android') {
            window.open({
                modal: true
            });
        } else {
            windowReference.openWindow(window, { animated:true });
        }
    }

function getFavorite(id) {
    var favorites   = favorites = Alloy.createCollection('favorite');
        
    favorites.fetch();
    
    var item = null;
    
    favorites.map(function (favorite) {
        if (favorite.get('idAgendaItem') == id) {
            item = {
                idAgendaItem: favorite.get('idAgendaItem'),
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

/* -------------- REPLICATED METHODS -------------- */
function createAgendaDetailWindow(item) {
    
    var window = Titanium.UI.createWindow({
        backgroundColor: eventData.styles.background,
        title: item.title
    });
    
    var scrollView =  Ti.UI.createScrollView({
        contentWidth: 'auto',
        contentHeight: 'auto',
        layout: 'vertical',
        showVerticalScrollIndicator: true,
        height: Ti.UI.FILL,
        width: '100%',
        top: 0,
        left: 0,
        zIndex: 1
    });
    
    window.add(
        createAgendaShareView(item)
    );
    
    /* Title of section */
    var sectionView = createSectionView(
        eventData.agenda_label + ' ' + item.date + ' ' + item.startTime
    );
    
    /* Event title */
    var titleLabel = Ti.UI.createLabel({
        color: eventData.styles.forecolor,
        font: { fontSize: 12 },
        text: item.title,
        textAlign: 'left',
        top: 10,
        left: 10,
        width: Titanium.Platform.displayCaps.platformWidth, height: Ti.UI.SIZE
    });
    
    var titleLabel = Ti.UI.createLabel({
        color: eventData.styles.forecolor,
        font: { fontSize: 12 },
        text: item.title,
        textAlign: 'left',
        top: 10,
        left: 10,
        width: Titanium.Platform.displayCaps.platformWidth, height: Ti.UI.SIZE
    });
    
    var timeText = item.endTime ? 'De ' + item.startTime + ' a ' + item.endTime + ' horas' : item.startTime + ' horas';
    
    var timeLabel = Ti.UI.createLabel({
        color: eventData.styles.forecolor,
        font: { fontSize: 12 },
        text: timeText,
        left: 10,
        width: Ti.UI.SIZE, height: Ti.UI.SIZE
    });
    
    var descriptionLabel = Ti.UI.createLabel({
        color: eventData.styles.forecolor,
        font: { fontSize: 12 },
        text: item.description,
        top: 10,
        left: 10,
        width: '95%', height: Ti.UI.SIZE
    });

    scrollView.add(sectionView);
    
    scrollView.add(titleLabel);
    scrollView.add(timeLabel);
    scrollView.add(descriptionLabel);
    
    window.add(scrollView);
    
    return window; 
}

function createAgendaShareView(item) {
    var shareView = Ti.UI.createView({
        layout: 'horizontal',
        backgroundColor: eventData.styles.share_background,
        width: '100%',
        height: '74px',
        left: 0,
        bottom: 0,
        zIndex: 2
    });
    
    var favoriteButton = Titanium.UI.createButton({
        backgroundImage: '/icons/favorite.png',
        width: '64px',
        height: '64px',
        top: '5px',
        left: 10
    });
    
    var tweet = Ti.UI.createImageView({
        image: '/icons/twitter.png',
        width: '64px',
        height: '64px',
        top: '5px',
        left: 10
    });
    
    tweet.addEventListener('click', function (e) {
        Titanium.API.info("You clicked the button");        
    });
    
    favoriteButton.addEventListener('click', function(e) {
        var favorites = require('favorites');
        
        favorites.toggle(eventData.id_event, item);
        
        refreshList(true);
    });
    
    shareView.add(favoriteButton);
    shareView.add(tweet);
    
    return shareView;
}

function createSectionView(title) {
    var sectionView = Ti.UI.createView({
        backgroundColor: eventData.styles.button_background,
        width: '100%',
        height: 30,
        top: 0,
        left: 0
    });
    
    var sectionLabel = Ti.UI.createLabel({
        color: eventData.styles.button_foreground,
        font: { fontSize: 14 },
        text: title,
        textAlign: 'left',
        top: 5,
        left: 10,
    });
    
    sectionView.add(sectionLabel);
    
    return sectionView;
}