var args = arguments[0] || {};

var piApi = require('pi');

var eventData = null;

piApi.getEventDetail(function (event) {
    if (Titanium.Platform.osname == 'android') {
        event = JSON.parse('{"title":"Congreso Internacional de Prueba","address":"Vicente Gil 446","logo":"http:\/\/dev.congresstools.com\/resources\/mobile\/events\/1.jpg","hashtag":"#congresoDePrueba","styles":{"background":"black","forecolor":"#e5e5e5","button_background":"#3b7183","button_foreground":"white"},"information_label":"Presentaci\u00f3n","information":"Lots of static text about this event. Lots of static text about this event. Lots of static text about this event. Lots of static text about this event. ","agenda_label":"Programa","agenda":{"headerTitle":"Especialidades","Psiquiatr\u00eda":{"headerTitle":"D\u00edas","Lunes 28":[{"id":"12","date":"2014-07-28","startTime":"12:00","endTime":"13:00","title":"Lunch","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"},{"id":"11","date":"2014-07-28","startTime":"12:00","endTime":"13:00","title":"Charla de algo","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"}],"Martes 29":[{"id":"10","date":"2014-07-29","startTime":"14:00","endTime":"17:00","title":"Lunch","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"},{"id":"9","date":"2014-07-29","startTime":"15:00","endTime":"16:00","title":"Charla de algo","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"}],"Mi\u00e9rcoles 30":[{"id":"8","date":"2014-07-30","startTime":"15:00","endTime":"16:00","title":"Lunch","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"},{"id":"7","date":"2014-07-30","startTime":"17:00","endTime":"18:00","title":"Charla de algo","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"}]},"Ciruj\u00eda":{"Lunes 28":[{"id":"1","date":"2014-07-28","startTime":"12:00","endTime":"13:00","title":"Lunch","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"},{"id":"2","date":"2014-07-28","startTime":"12:00","endTime":"13:00","title":"Charla de algo","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"}],"Martes 29":[{"id":"3","date":"2014-07-29","startTime":"14:00","endTime":"17:00","title":"Lunch","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"},{"id":"4","date":"2014-07-29","startTime":"15:00","endTime":"16:00","title":"Charla de algo","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"}],"Mi\u00e9rcoles 30":[{"id":"5","date":"2014-07-30","startTime":"15:00","endTime":"16:00","title":"Lunch","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"},{"id":"6","date":"2014-07-30","startTime":"17:00","endTime":"18:00","title":"Charla de algo","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"}]}},"accommodations_label":"Alojamientos recomendados","accommodations":[{"id":"1","title":"Hyatt","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"},{"id":"2","title":"Park Suites","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"},{"id":"3","title":"Aconcagua NH","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"}],"form_label":"Inscripci\u00f3n","form":"http:\/\/dev.congresstools.com\/f\/fvenoso2014","certificate_label":"Descarg\u00e1 tu certificado","certificate":"http:\/\/dev.congresstools.com\/certificate\/bys\/","map_label":"Lugar del evento","map":{"lat":"-32.896958","lng":"-68.857484"}}');
    }
    
    if (! event) {
        $.event.close();
        
        return;
    }
    
    eventData = event;
    
    /*
     * Set general styles
     */
    $.eventWindow.setTitle(event.title);
    
    
    $.eventWindow.setBackgroundColor(event.styles.background);
   
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
     * Information
     */
    if (event.information) {
        label = event.information_label || 'Presentación';
        
        var informationWindow = createEventWindow(label, event.styles.background);
        
        var informationScrollView =  Ti.UI.createScrollView({
            contentWidth: 'auto',
            contentHeight: 'auto',
            showVerticalScrollIndicator: true,
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
        
        informationWindow.add(informationScrollView);
        
        informationScrollView.add(informationLabel);
        
        addEventMenuItem({
            label: label,
            onClick: function () {
                $.eventNavigationWindow.openWindow(informationWindow, { animated:true });
            }            
        });
    }
    
    /*
     * Agenda
     */
    if (event.agenda) {
        label = event.agenda_label || 'Agenda';
        
        var agendaOnclick = function (id, title) {
            var detailWindow = createAgendaDetailWindow(searchItem(event.agenda, id));
            
            $.eventNavigationWindow.openWindow(detailWindow, { animated:true });
        };
        
        var calendar = require('listNavigation');
        
        var agendaWindow = calendar.add(
            label,
            event.agenda,
            agendaOnclick,
            $.eventNavigationWindow,
            event.styles.background
        );
        
        addEventMenuItem({
            label: label,
            onClick: function () {
                $.eventNavigationWindow.openWindow(agendaWindow, {animated:true});
            }
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
            label: label,
            onClick: function () {
                $.eventNavigationWindow.openWindow(formWindow, { animated:true });
            }
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
            label: label,
            onClick: function () {
                $.eventNavigationWindow.openWindow(cwWindow, { animated:true });
            }
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
            label: label,
            onClick: function () {
                $.eventNavigationWindow.openWindow(mapWindow, { animated:true });
            }
        });
    }
    
    /*
     * Accommodations
     */
    if (event.accommodations) {
        label = event.accommodations_label || 'Agenda';
        
        var accommodationOnclick = function (id, title) {
            var detailWindow = createAccommodationDetailWindow(searchItem(event.accommodations, id));
            
            $.eventNavigationWindow.openWindow(detailWindow, { animated:true });
        };
        
        var accommodationNavigation = require('listNavigation');
        
        var accommodationWindow = accommodationNavigation.add(
            label,
            event.accommodations,
            accommodationOnclick,
            $.eventNavigationWindow, 
            event.styles.background
        );
        
        addEventMenuItem({
            label: label,
            onClick: function () {
                $.eventNavigationWindow.openWindow(accommodationWindow, {animated:true});
            }
        });
    }
    
});

function addEventMenuItem(item) {
    var button = Titanium.UI.createButton({
        title: item.label,
        top: 1,
        width: '100%',
        height: 40,
        textAlign: 'left',
        borderWidth: 0,
        backgroundColor: eventData.styles.button_background,
        color: eventData.styles.button_foreground
    });
    
    button.addEventListener('click', item.onClick);
    
    $.eventView.add(button);
}

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
        width: Ti.UI.SIZE, height: Ti.UI.SIZE
    });
    
    scrollView.add(titleLabel);
    scrollView.add(descriptionLabel);
    
    window.add(scrollView);
    
    return window; 
}

function createAgendaDetailWindow(item) {
    
    var window = Titanium.UI.createWindow({
        backgroundColor: eventData.styles.background,
        layout: 'vertical',
        title: item.title
    });
    
    
    var scrollView =  Ti.UI.createScrollView({
        contentWidth: 'auto',
        contentHeight: 'auto',
        layout: 'vertical',
        showVerticalScrollIndicator: true,
        height: Ti.UI.FILL,
        width: '90%'
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
    
    var timeText = item.endTime ? item.startTime + ' - ' + item.endTime : item.startTime;
    
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
        width: Ti.UI.SIZE, height: Ti.UI.SIZE
    });
    
    scrollView.add(titleLabel);
    scrollView.add(timeLabel);
    scrollView.add(descriptionLabel);
    
    window.add(scrollView);
    
    return window; 
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

function createEventWindow(title, backgroundColor) {
    return Titanium.UI.createWindow({
        backgroundColor: backgroundColor,
        layout: 'vertical',
        title: title
    });
}
