var args = arguments[0] || {};

var piApi   = require('pi'),
    data    = require('data'),
    ui      = require('ui');

var eventData = data.get('eventData'), selectedEvent = data.get('event');

function generateEventWindow(event) {
    
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
       image: event.image,
       width: '100%',
       top: '0dp'
    });
    
    $.eventView.add(image);
    
    var label = '';
    
    for (var item in event.order) {
        switch (event.order[item]) {
            case "home":
            
            addEventMenuItem({
                icon: event.home_icon,
                label: 'Inicio',
                onClick: function () {
                    $.eventNavigationWindow.close();
                }
            });
            
            break;
            
            case "form":
                if (event.form) {
                    label = event.form_label || 'Inscripción online';
                    
                    addEventMenuItem({
                        icon: event.form_icon,
                        label: label,
                        controller: 'form'
                    });
                }
            break;
            
            case "certificate":
                if (event.certificate) {
                    label = event.certificate_label || 'Certificación web';
                    
                    addEventMenuItem({
                        icon: event.certificate_icon,
                        label: label,
                        'controller': 'certificate'
                    });
                }
            break;
            
            case "favorites":
                if (event.agenda_label) {
                    label = event.favorites_label || 'Favoritos';
                    
                    addEventMenuItem({
                        icon: event.favorites_icon,
                        label: label,
                        controller: 'favorite'
                    });
                }
            break;
            
            case "link":
                if (event.link_url) {
                    label = event.link_label || 'Link';
                    
                    addEventMenuItem({
                        icon: event.link_icon,
                        label: label,
                        'controller': 'link'
                    });
                }
            break;
            
            case "accommodations":
                if (event.accommodations_label) {
                    label = event.accommodations_label || 'Alojamientos';
                    
                    addEventMenuItem({
                        icon: event.accommodations_icon,
                        label: label,
                        controller: 'accommodations'
                    });
                }
            break;
            
            case "map":
                if (event.map_label) {
                    label = event.map_label || 'Ubicación';
                    
                    addEventMenuItem({
                        icon: event.map_icon,
                        label: label,
                        controller: 'map'
                    });
                }
            break;
            
            case "pages":
                for (var j in event.pages) {
                    addEventMenuItem({
                        icon: event.pages[j].icon,
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
            break;
            
            case "agenda":
                if (event.agenda) {
                    label = event.agenda_label || 'Agenda';
                    
                    addEventMenuItem({
                        icon: event.agenda_icon,
                        label: label,
                        controller: 'agenda'
                    });
                }
            break;
        }
    }
    
    $.eventView.add(Ti.UI.createView({
        height: 10,
        width: '100%',
        left: 0,
        top: 0
    }));
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
        image: '/icons' + item.icon,
        width: 30,
        height: 30,
        left: 15,
        top: 5
    });
    
    var viewWidth   = Titanium.Platform.displayCaps.platformWidth - 20
        viewLeft    = 10;
    
    if (Titanium.Platform.osname == 'android') {
        viewWidth = viewWidth + 'px'
        
        viewLeft = viewLeft + 'px' 
    }
    
    var view = Titanium.UI.createView({
        borderRadius: 15,
        layout: 'horizontal',
        top: 10,
        left: viewLeft,
        width: viewWidth,
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
