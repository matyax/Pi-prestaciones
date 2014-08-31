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
        
        addEventMenuItem({
            icon: 'form',
            label: label,
            controller: 'form'
        });
    }
    
    /* CERTIFICATE */
    if (event.certificate) {
        label = event.certificate_label || 'Certificación web';
        
        addEventMenuItem({
            icon: 'certificate',
            label: label,
            'controller': 'certificate'
        });
    }
    
    /* MAP */
    if (event.map) {
        label = event.map_label || 'Ubicación';
        
        addEventMenuItem({
            icon: 'map',
            label: label,
            controller: 'map'
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
        left: 15,
        top: 5
    });
    
    var view = Titanium.UI.createView({
        borderRadius: 15,
        layout: 'horizontal',
        top: 10,
        left: 10,
        width: Titanium.Platform.displayCaps.platformWidth - 20,
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
