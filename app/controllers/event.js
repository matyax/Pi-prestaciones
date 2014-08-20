var args = arguments[0] || {};

var piApi   = require('pi'),
    data    = require('data'),
    ui      = require('ui');

var eventData = data.get('eventData'), selectedEvent = data.get('event');

function generateEventWindow(event) {
    //if (Titanium.Platform.osname == 'android') {
    //    event = JSON.parse('{"title":"Congreso Internacional de Prueba","address":"Vicente Gil 446","logo":"http:\/\/piprestaciones.com\/resources\/mobile\/events\/1.jpg","hashtag":"#congresoDePrueba","styles":{"background":"black","forecolor":"#e5e5e5","button_background":"#3b7183","button_foreground":"white"},"information_label":"Presentaci\u00f3n","information":"Lots of static text about this event. Lots of static text about this event. Lots of static text about this event. Lots of static text about this event. ","agenda_label":"Programa","agenda":{"headerTitle":"Especialidades","Psiquiatr\u00eda":{"headerTitle":"D\u00edas","Lunes 28":[{"id":"12","date":"2014-07-28","startTime":"12:00","endTime":"13:00","title":"Lunch","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"},{"id":"11","date":"2014-07-28","startTime":"12:00","endTime":"13:00","title":"Charla de algo","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"}],"Martes 29":[{"id":"10","date":"2014-07-29","startTime":"14:00","endTime":"17:00","title":"Lunch","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"},{"id":"9","date":"2014-07-29","startTime":"15:00","endTime":"16:00","title":"Charla de algo","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"}],"Mi\u00e9rcoles 30":[{"id":"8","date":"2014-07-30","startTime":"15:00","endTime":"16:00","title":"Lunch","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"},{"id":"7","date":"2014-07-30","startTime":"17:00","endTime":"18:00","title":"Charla de algo","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"}]},"Ciruj\u00eda":{"Lunes 28":[{"id":"1","date":"2014-07-28","startTime":"12:00","endTime":"13:00","title":"Lunch","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"},{"id":"2","date":"2014-07-28","startTime":"12:00","endTime":"13:00","title":"Charla de algo","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"}],"Martes 29":[{"id":"3","date":"2014-07-29","startTime":"14:00","endTime":"17:00","title":"Lunch","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"},{"id":"4","date":"2014-07-29","startTime":"15:00","endTime":"16:00","title":"Charla de algo","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"}],"Mi\u00e9rcoles 30":[{"id":"5","date":"2014-07-30","startTime":"15:00","endTime":"16:00","title":"Lunch","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"},{"id":"6","date":"2014-07-30","startTime":"17:00","endTime":"18:00","title":"Charla de algo","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"}]}},"accommodations_label":"Alojamientos recomendados","accommodations":[{"id":"1","title":"Hyatt","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"},{"id":"2","title":"Park Suites","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"},{"id":"3","title":"Aconcagua NH","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"}],"form_label":"Inscripci\u00f3n","form":"http:\/\/piprestaciones.com\/f\/fvenoso2014","certificate_label":"Descarg\u00e1 tu certificado","certificate":"http:\/\/piprestaciones.com\/certificate\/bys\/","map_label":"Lugar del evento","map":{"lat":"-32.896958","lng":"-68.857484"}}');
    //}
    
    if (! event) {
        $.eventNavigationWindow.close();
        
        return;
    }
    
    eventData = event;
    
    var windowReference = null;
    
    /* General styles */
    if (Titanium.Platform.osname == 'android') {
        $.eventNavigationWindow.setTitle(event.title);
        $.eventNavigationWindow.setBackgroundColor(event.styles.background);
                
    } else {
        $.eventWindow.setTitle(event.title);
        $.eventWindow.setBackgroundColor(event.styles.background);
        
        windowReference = $.eventNavigationWindow;
    }
    
    data.set('windowReference', windowReference);
   
    /* LOGO */
    var image = Ti.UI.createImageView({
       image: event.logo,
       width: '100%',
       top: '0dp'
    });
    
    $.eventView.add(image);
    
    var label = '';
    
    /* HOME BUTTON */
    addEventMenuItem({
        icon: 'home',
        label: 'Inicio',
        onClick: function () {
            $.eventNavigationWindow.close();
        }
    });
    
    /* PAGES */
    for (var j in event.pages) {
        addEventMenuItem({
            icon: 'page',
            label: event.pages[j].title,
            onClick: function(e) {
                var page    = null,
                    title   = e.source.getTitle();
                    
                for (var i in eventData.pages) {
                    if (eventData.pages[i].title == title) {
                        page = eventData.pages[i];
                        
                        break;
                    }
                }
                
                data.set('page', page);
                
                var window = Alloy.createController('page').getView();
                
                if (Titanium.Platform.osname == 'android') {
                    window.open({
                        modal: true
                    });
                } else {
                    $.eventNavigationWindow.openWindow(window, { animated:true });
                }
            }
        });
    }
    
    /* AGENDA */
    if (event.agenda) {
        label = event.agenda_label || 'Agenda';
        
        addEventMenuItem({
            icon: 'agenda',
            label: label,
            controller: 'agenda'
        });
    }
    
    /* FORM */
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
    
    /* CERTIFICATE */
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
    
    /* MAP */
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
        
        addEventMenuItem({
            icon: 'accommodation',
            label: label,
            controller: 'accommodations'
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
        button.addEventListener('click', function () {
            var window = Alloy.createController(item.controller).getView();
            
            if (Titanium.Platform.osname == 'android') {
                window.open({
                    modal: true
                });
            } else {
                $.eventNavigationWindow.openWindow(window, { animated:true });
            }
        });
    }    
    else if (item.onClick) {
        button.addEventListener('click', item.onClick);
    } else if (item.window) {
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
