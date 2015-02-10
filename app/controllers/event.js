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
    
    // General styles
    if (Titanium.Platform.osname == 'android') {
        $.eventNavigationWindow.setTitle(event.title);
        $.eventScrollView.setBackgroundColor(event.styles.background);
                
    } else {
        $.eventWindow.setTitle(event.title);
        $.eventScrollView.setBackgroundColor(event.styles.background);
        
        windowReference = $.eventNavigationWindow;
    }
    
    data.set('windowReference', windowReference);
    
    var image = Ti.UI.createImageView({
       image: event.image,
       width: '100%'
    });
    
    $.logoContainer.add(image);
    
    eventData.logoImageView = image;
    
    image.addEventListener("load", initEventLayout);
    
    var label 	= '';
    	pageId 	= 0,
    	j 		= null;
    	
    	
    var buttonQuantity = 0;
    
    if (event.favorites_label) {
    	buttonQuantity++;
    } 
    
    if (event.form) {
    	buttonQuantity++;
    }
    
    if (event.agenda_label) {
    	buttonQuantity++;
    }
    
    /* Menu */
    
    for (var item in event.order) {
    	if (event.order[item].substring(0, 5) == 'page_') {
    		pageId = event.order[item].match('[0-9]+')[0];
    		
    		for (j in event.pages) {
    			
    			if (event.pages[j].id != pageId) {
    				continue;
    			}
    			
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
    	}
    	
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
                    }, buttonQuantity);
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
                    }, buttonQuantity);
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
            
            case "agenda":
                if (event.agenda_label) {
                    label = event.agenda_label || 'Agenda';
                    
                    addEventMenuItem({
                        icon: event.agenda_icon,
                        label: label,
                        controller: 'agenda'
                    }, buttonQuantity);
                }
            break;
        }
    }
    
    /* Tabs */
    
    for (var item in event.tabs_order) {
    	if (event.tabs_order[item].substring(0, 5) == 'page_') {
    		pageId = event.tabs_order[item].match('[0-9]+')[0];
    		
    		for (j in event.pages) {
    			
    			if (event.pages[j].id != pageId) {
    				continue;
    			}
    			
                addEventTabItem({
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
    	}
    	
        switch (event.tabs_order[item]) {
            case "home":
            
	            addEventTabItem({
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
                    
                    addEventTabItem({
                        icon: event.form_icon,
                        label: label,
                        controller: 'form'
                    }, buttonQuantity);
                }
            break;
            
            case "certificate":
                if (event.certificate) {
                    label = event.certificate_label || 'Certificación web';
                    
                    addEventTabItem({
                        icon: event.certificate_icon,
                        label: label,
                        'controller': 'certificate'
                    });
                }
            break;
            
            case "favorites":
                if (event.agenda_label) {
                    label = event.favorites_label || 'Favoritos';
                    
                    addEventTabItem({
                        icon: event.favorites_icon,
                        label: label,
                        controller: 'favorite'
                    }, buttonQuantity);
                }
            break;
            
            case "link":
                if (event.link_url) {
                    label = event.link_label || 'Link';
                    
                    addEventTabItem({
                        icon: event.link_icon,
                        label: label,
                        'controller': 'link'
                    });
                }
            break;
            
            case "accommodations":
                if (event.accommodations_label) {
                    label = event.accommodations_label || 'Alojamientos';
                    
                    addEventTabItem({
                        icon: event.accommodations_icon,
                        label: label,
                        controller: 'accommodations'
                    });
                }
            break;
            
            case "map":
                if (event.map_label) {
                    label = event.map_label || 'Ubicación';
                    
                    addEventTabItem({
                        icon: event.map_icon,
                        label: label,
                        controller: 'map'
                    });
                }
            break;
            
            case "agenda":
                if (event.agenda_label) {
                    label = event.agenda_label || 'Agenda';
                    
                    addEventTabItem({
                        icon: event.agenda_icon,
                        label: label,
                        controller: 'agenda'
                    }, buttonQuantity);
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
}

var isFirstButton = true;

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
        left: 0
    });
    
    var icon = Ti.UI.createImageView({
        image: '/icons' + item.icon,
        width: 30,
        height: 30,
        left: 10,
        top: 5
    });
    
    var viewWidth   = toDP(Titanium.Platform.displayCaps.platformWidth) - 40,
        viewLeft    = 20;
    
    var topPosition = (isFirstButton == true) ? 20 : 10;
    
    isFirstButton = false;
    
    var view = Titanium.UI.createView({
        borderRadius: 5,
        layout: 'horizontal',
        top: topPosition,
        left: viewLeft,
        width: viewWidth,
        height: 40,
        backgroundColor: eventData.styles.button_background
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

function initEventLayout() {
	var event 		= eventData,
		height 		= toDP(Ti.Platform.displayCaps.platformHeight),
		width 		= toDP(Ti.Platform.displayCaps.platformWidth),
		logoHeight	= 0,
		blob 		= null;
		
	var headerHeight = 60;
	
	blob = eventData.logoImageView.toBlob();
    if (blob) {
    	
    	logoHeight = (width - 40) * pxToDP(blob.height) / pxToDP(blob.width);
        
        eventData.logoImageView.setWidth( width - 40);
        eventData.logoImageView.setHeight( logoHeight);
    }
	
	if (event.tabs_order.length > 0) {
		$.eventScrollView.setHeight(
			height - logoHeight - 120 - headerHeight
		);
		
		$.tabContainer.setBackgroundColor(event.styles.tab_background);
	} else {
		$.eventScrollView.setHeight(
			height - logoHeight - 40 - headerHeight
		);
		
		$.tabContainer.hide();	
	}
	
	$.eventScrollView.setTop( logoHeight + 40 );
}

var fistButtonAdded = false;

function addEventTabItem(item, buttonQuantity) {
	var width = Math.floor(toDP(Ti.Platform.displayCaps.platformWidth) /  buttonQuantity) - (buttonQuantity - 1);
	
	var button = Titanium.UI.createView({
		layout: 'vertical',
        width: width,
        height: 80,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        borderWidth: 0
    });
    
    var icon = Ti.UI.createImageView({
        image: '/icons' + item.icon,
        width: 30,
        height: 30,
        top: 15
    });
    
    var view = Titanium.UI.createView({
        layout: 'composite',
        top: 0,
        width: '100%',
        height: Ti.UI.SIZE,
        backgroundColor: 'transparent'
    });
    
    var label = Ti.UI.createLabel({
    	text: item.label,
    	width: '100%',
    	textAlign: 'center',
    	color: eventData.styles.tab_forecolor,
    	top: 5,
    	font: {
    		fontSize: 12
    	} 
    });
    
    view.add(icon);
    
    button.add(view);
    button.add(label);
    
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
    
    if (fistButtonAdded) {
    	var line = Titanium.UI.createView({
			layout: 'vertical',
	        width: 1,
	        top: 5,
	        height: 70,
	        backgroundColor: '#eeeeee',
	    });
	    
	    $.tabContainer.add(line);
    }
    
    fistButtonAdded = true;
    
    $.tabContainer.add(button);
}

function toDP(dp) {
    if (Titanium.Platform.osname == 'android') {
        return pxToDP(dp);
    }
    
    return dp;   
}

function pxToDP(px) {
    return (px / (Titanium.Platform.displayCaps.dpi / 160));
}


// Event UI reusable functions
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
