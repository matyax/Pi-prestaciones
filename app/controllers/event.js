var args = arguments[0] || {};

var piApi = require('pi');
var data = require('data');

var eventData = data.get('eventData'), selectedEvent = data.get('event');

function generateEventWindow(event) {
    if (Titanium.Platform.osname == 'android') {
        event = JSON.parse('{"title":"Congreso Internacional de Prueba","address":"Vicente Gil 446","logo":"http:\/\/piprestaciones.com\/resources\/mobile\/events\/1.jpg","hashtag":"#congresoDePrueba","styles":{"background":"black","forecolor":"#e5e5e5","button_background":"#3b7183","button_foreground":"white"},"information_label":"Presentaci\u00f3n","information":"Lots of static text about this event. Lots of static text about this event. Lots of static text about this event. Lots of static text about this event. ","agenda_label":"Programa","agenda":{"headerTitle":"Especialidades","Psiquiatr\u00eda":{"headerTitle":"D\u00edas","Lunes 28":[{"id":"12","date":"2014-07-28","startTime":"12:00","endTime":"13:00","title":"Lunch","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"},{"id":"11","date":"2014-07-28","startTime":"12:00","endTime":"13:00","title":"Charla de algo","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"}],"Martes 29":[{"id":"10","date":"2014-07-29","startTime":"14:00","endTime":"17:00","title":"Lunch","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"},{"id":"9","date":"2014-07-29","startTime":"15:00","endTime":"16:00","title":"Charla de algo","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"}],"Mi\u00e9rcoles 30":[{"id":"8","date":"2014-07-30","startTime":"15:00","endTime":"16:00","title":"Lunch","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"},{"id":"7","date":"2014-07-30","startTime":"17:00","endTime":"18:00","title":"Charla de algo","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"}]},"Ciruj\u00eda":{"Lunes 28":[{"id":"1","date":"2014-07-28","startTime":"12:00","endTime":"13:00","title":"Lunch","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"},{"id":"2","date":"2014-07-28","startTime":"12:00","endTime":"13:00","title":"Charla de algo","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"}],"Martes 29":[{"id":"3","date":"2014-07-29","startTime":"14:00","endTime":"17:00","title":"Lunch","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"},{"id":"4","date":"2014-07-29","startTime":"15:00","endTime":"16:00","title":"Charla de algo","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"}],"Mi\u00e9rcoles 30":[{"id":"5","date":"2014-07-30","startTime":"15:00","endTime":"16:00","title":"Lunch","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"},{"id":"6","date":"2014-07-30","startTime":"17:00","endTime":"18:00","title":"Charla de algo","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"}]}},"accommodations_label":"Alojamientos recomendados","accommodations":[{"id":"1","title":"Hyatt","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"},{"id":"2","title":"Park Suites","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"},{"id":"3","title":"Aconcagua NH","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"}],"form_label":"Inscripci\u00f3n","form":"http:\/\/piprestaciones.com\/f\/fvenoso2014","certificate_label":"Descarg\u00e1 tu certificado","certificate":"http:\/\/piprestaciones.com\/certificate\/bys\/","map_label":"Lugar del evento","map":{"lat":"-32.896958","lng":"-68.857484"}}');
    }
    
    if (! event) {
        $.eventNavigationWindow.close();
        
        return;
    }
    
    eventData = event;
    
    var windowReference = null;
    
    /*
     * Set general styles
     */
    if (Titanium.Platform.osname == 'android') {
        $.eventNavigationWindow.setTitle(event.title);
        $.eventNavigationWindow.setBackgroundColor(event.styles.background);
                
    } else {
        $.eventWindow.setTitle(event.title);
        $.eventWindow.setBackgroundColor(event.styles.background);
        
        windowReference = $.eventNavigationWindow;
    }
    
    data.set('windowReference', windowReference);
   
    /*
     * Add Logo
     */
    var image = Ti.UI.createImageView({
       image: event.logo,
       width: '100%',
       top: '0dp'
    });
    
    $.eventView.add(image);
    
    /*
     * Add menu items
     */
    var label = '';
    
    /*
     * Home button
     */
    addEventMenuItem({
        icon: 'home',
        label: 'Inicio',
        onClick: function () {
            $.eventNavigationWindow.close();
        }
    });
    
    /*
     * Information
     */
    if (event.information) {
        label = event.information_label || 'Presentación';
        
        var informationWindow = createEventWindow(label, event.styles.background);
        
        var informationScrollView =  Ti.UI.createScrollView({
            contentWidth: 'auto',
            contentHeight: 'auto',
            showVerticalScrollIndicator: true,
            layout: 'vertical',
            height: Ti.UI.FILL,
            width: '100%'
        });
        
        var informationLabel = Ti.UI.createLabel({
            color: event.styles.forecolor,
            font: { fontSize: 12 },
            text: event.information,
            textAlign: 'left',
            top: 10,
            left: 10,
            width: Ti.UI.SIZE, height: Ti.UI.SIZE
        });
        
        var informationSectionView = createSectionView(label);
        
        informationScrollView.add(informationSectionView);
        informationScrollView.add(informationLabel);
        
        informationWindow.add(informationScrollView);
        
        addEventMenuItem({
            icon: 'information',
            label: label,
            window: informationWindow
        });
    }
    
    /*
     * Agenda
     */
    if (event.agenda) {
        label = event.agenda_label || 'Agenda';
        
        var agendaOnclick = function (id, title) {
            var detailWindow = createAgendaDetailWindow(searchItem(event.agenda, id));
            
            if (Titanium.Platform.osname == 'android') {
                detailWindow.open({
                    modal: true
                });
            } else {
                $.eventNavigationWindow.openWindow(detailWindow, { animated:true });
            }
        };
        
        var calendar = require('listNavigation');
        
        var agendaWindow = calendar.add(
            label,
            event.agenda,
            agendaOnclick,
            windowReference,
            event.styles.background
        );
        
        addEventMenuItem({
            icon: 'agenda',
            label: label,
            window: agendaWindow
        });
    }
    
    /*
     * Form
     */
    if (event.form) {
        label = event.form_label || 'Inscripción online';
        
        var formWindow = createEventWindow(label, event.styles.background);
        
        var formWebView = Titanium.UI.createWebView({
            url: event.form
        });
        
        formWindow.add(formWebView);
        
        addEventMenuItem({
            icon: 'form',
            label: label,
            window: formWindow
        });
    }
    
    /*
     * Form
     */
    if (event.certificate) {
        label = event.certificate_label || 'Certificación web';
        
        var cwWindow = createEventWindow(label, event.styles.background);
        
        var cwWebView = Titanium.UI.createWebView({
            url: event.certificate
        });
        
        cwWindow.add(cwWebView);
        
        addEventMenuItem({
            icon: 'certificate',
            label: label,
            window: cwWindow
        });
    }
    
    /*
     * Map
     */
    if (event.map) {
        label = event.map_label || 'Ubicación';
        
        var mapWindow = createEventWindow(label, event.styles.background);
        
        var MapModule = require('ti.map');
        
        event.map.lat = parseFloat(event.map.lat);
        event.map.lng = parseFloat(event.map.lng);
        
        var marker = MapModule.createAnnotation({
            latitude: event.map.lat,
            longitude: event.map.lng,
            pincolor: MapModule.ANNOTATION_PURPLE,   
            title: event.title,
            subtitle: event.address,
            leftButton: Ti.UI.iPhone.SystemButton.INFO_DARK
        });
        
        var map = MapModule.createView({
            userLocation: true,
            mapType: MapModule.NORMAL_TYPE,
            animate: true,
            region: {latitude: event.map.lat, longitude: event.map.lng, latitudeDelta: 0.05, longitudeDelta: 0.05 },
            height: '100%',
            top: 0,
            width: Ti.UI.FILL,
            annotations: [ marker ]
        });
        
        mapWindow.add(map);
        
        addEventMenuItem({
            icon: 'map',
            label: label,
            window: mapWindow
        });
    }
    
    /*
     * Favorites
     */
    if (event.agenda) {
        label = event.favorites_label || 'Favoritos';
        
        addEventMenuItem({
            icon: 'favorite',
            label: label,
            controller: 'favorite'
        });
    }
    
    /*
     * Accommodations
     */
    if (event.accommodations) {
        label = event.accommodations_label || 'Agenda';
        
        var accommodationOnclick = function (id, title) {
            var detailWindow = createAccommodationDetailWindow(searchItem(event.accommodations, id));
            
            if (Titanium.Platform.osname == 'android') {
                detailWindow.open({
                    modal: true
                });
            } else {
                $.eventNavigationWindow.openWindow(detailWindow, { animated:true });
            }
        };
        
        var accommodationNavigation = require('listNavigation');
        
        var accommodationWindow = accommodationNavigation.add(
            label,
            event.accommodations,
            accommodationOnclick,
            windowReference, 
            event.styles.background
        );
        
        addEventMenuItem({
            icon: 'accommodation',
            label: label,
            window: accommodationWindow
        });
    }
};

generateEventWindow(eventData);

function addEventMenuItem(item) {
    var button = Titanium.UI.createButton({
        title: item.label,
        width: Ti.UI.FILL,
        height: 40,
        textAlign: 'left',
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderWidth: 0,
        color: eventData.styles.button_foreground,
        top: 0,
        left: 5
    });
    
    var icon = Ti.UI.createImageView({
        image: '/icons/' + item.icon + '.png',
        width: 30,
        height: 30,
        left: 10,
        top: 5
    });
    
    var view = Titanium.UI.createView({
        layout: 'horizontal',
        top: 1,
        width: '100%',
        height: 40,
        backgroundColor: eventData.styles.button_background,   
    });
    
    view.add(icon);
    view.add(button);
    
    if (item.controller) {
        item.window = Alloy.createController('favorite').getView();
    }
    
    if (item.onClick) {
        button.addEventListener('click', item.onClick);
    } else if (item.window){
        button.addEventListener('click', function () {
            if (Titanium.Platform.osname == 'android') {
                item.window.open({
                    modal: true
                });
            } else {
                $.eventNavigationWindow.openWindow(item.window, { animated:true });
            }
        });
    }
    
    $.eventView.add(view);
}

/* Event UI reusable functions */
function createEventWindow(title, backgroundColor) {
    return Titanium.UI.createWindow({
        backgroundColor: backgroundColor,
        layout: 'vertical',
        title: title
    });
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

/* Accommodations detail */
function createAccommodationDetailWindow(item) {
    
    var window = Titanium.UI.createWindow({
        backgroundColor: eventData.styles.background,
        layout: 'vertical',
        title: item.title
    });
    
    var scrollView =  Ti.UI.createScrollView({
        contentWidth: 'auto',
        contentHeight: 'auto',
        showVerticalScrollIndicator: true,
        layout: 'vertical',
        height: Ti.UI.FILL,
        width: '100%'
    });
    
    var sectionView = createSectionView(
        eventData.accommodations_label + ' - ' + item.title        
    );
    
    var titleLabel = Ti.UI.createLabel({
        color: eventData.styles.forecolor,
        font: { fontSize: 12 },
        text: item.title,
        textAlign: 'left',
        top: 10,
        left: 10,
        width: Titanium.Platform.displayCaps.platformWidth, height: Ti.UI.SIZE
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
    scrollView.add(descriptionLabel);
    
    window.add(scrollView);
    
    return window; 
}

/* Agenda detail */
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
    });
    
    shareView.add(favoriteButton);
    shareView.add(tweet);
    
    return shareView;
}

function searchItem(items, id) {
    var item = null;
    
    for (var i in items) {
        if (typeof items[i] != 'object') {
            continue;
        } else if (isNaN(parseInt(i))) {
            item = searchItem(items[i], id);
            
            if (item) {
                return item;
            }
        } else {
            if ((items[i].id) && (items[i].id == id)) {
                return items[i];
            }
        }
    }
    
    return null;
}
