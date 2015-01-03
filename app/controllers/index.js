var piApi       = require('pi');
var data        = require('data');
var loading     = require('loadingWindow');
var cachedImage = require('cachedImage');
var eventList   = null;

$.index.open();

loading.open();

piApi.loadEvents(function (events) {
    
    if (events === false) {
        alert('Error de conexión');
    }
    
    eventList = events;
    
    if (! events.length) {
        
        var emptyLabel = Ti.UI.createLabel({
            text: 'No se encontraron eventos.',
            top: '5dp',
            font: {
                fontSize: '12dp'
            },
            color: 'white',
            textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
            width: '100%'
        });
        
        $.eventsView.add(emptyLabel);
        
        return;
    }
    
    var  buttonOptions  = null,
         relativeHeight = null,
         relativeWidth  = null,
         buttonData     = null,
         image          = null,
         imageInfo      = null;
         
    if (events.length == 1) {
        $.index.remove($.logoContainer);
        $.index.remove($.congressTitle);
        $.index.remove($.eventsScrollView);
        
        image       = events[0].image_full;
        imageInfo   = events[0].image_full_info;
        
        if (Titanium.Platform.osname == 'android') {
            relativeHeight = Math.round(Ti.Platform.displayCaps.platformWidth * imageInfo.height / imageInfo.width) + 'px';
        } else {
            relativeHeight = Math.round(Ti.Platform.displayCaps.platformWidth * imageInfo.height / imageInfo.width);        
        }
        
        buttonData = {
            height: relativeHeight,
            event: events[0]
        }
        
        cachedImage.load(image, function (imagePath, data) {
            loading.close();
            
            addButton(data.event, {
                backgroundImage: imagePath,
                top: 0,
                left: 0,
                width: '100%',
                height: data.height,
                style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN,        
            }, $.index);
            
        }, $.index, buttonData);
    }
    else if (events.length == 2) {
        $.index.remove($.logoContainer);
        $.index.remove($.congressTitle);
        $.index.remove($.eventsScrollView);
        
        for (var i = 0; i < events.length; i++) {
            image       = events[i].image_half;
            imageInfo   = events[i].image_half_info;;
            
            if (Titanium.Platform.osname == 'android') {
                relativeHeight = Math.round(Ti.Platform.displayCaps.platformHeight / 2);
                
                relativeWidth = Math.round(relativeHeight * imageInfo.width / imageInfo.height) + 'px';
                
                relativeHeight = relativeHeight + 'px';
            } else {
                relativeHeight = Math.round(Ti.Platform.displayCaps.platformHeight / 2);
                
                relativeWidth = Math.round(relativeHeight * imageInfo.width / imageInfo.height);        
            }
            
            buttonData = {
                height: relativeHeight,
                width: relativeWidth,
                event: events[i]
            }
            
            cachedImage.load(image, function (imagePath, data) {
                
                loading.close();
                
                addButton(data.event, {
                    backgroundImage: imagePath,
                    width: data.width,
                    height: data.height,
                    style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN,        
                }, $.index);
                    
            }, $.index, buttonData);
            
        }
        
    }
    else {
        
        for (var i = 0; i < events.length; i++) {
            
            if (Titanium.Platform.osname == 'android') {
                relativeHeight = Math.round(Ti.Platform.displayCaps.platformWidth * events[i].image_info.height / events[i].image_info.width) + 'px';
            } else {
                relativeHeight = Math.round(Ti.Platform.displayCaps.platformWidth * events[i].image_info.height / events[i].image_info.width);        
            }
            
            buttonOptions = {
                backgroundImage: events[i].image,
                borderRadius: 15,
                top: 10,
                left: '5%',
                width: '90%',
                height: relativeHeight,
                style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN,        
            };
            
            addButton(events[i], buttonOptions);
        }
    }
});

function addButton(event, buttonOptions, appendTo) {
    
    var button = null;
    
    buttonOptions.idEvent = event.id; 
    
    button = Ti.UI.createButton(buttonOptions);
    
    button.addEventListener('click', function (e) {
        var selectedEvent = null;
        
        //this.idEvent
        for (var i in eventList) {
            if (eventList[i].id == this.idEvent) {
                selectedEvent = eventList[i];
                break; 
            }
        }
        
        data.set('event', selectedEvent);
        
        if (eventDetailLoaded == false) {
    		loading.open();
    	}
        
        piApi.getEventDetail(selectedEvent.id, function (eventData) {
        	if (eventDetailLoaded == false) {
        		loading.close();
        	}
            
            eventDetailLoaded = true;
            
            data.set('eventData', eventData);
            
            var win = Alloy.createController('event').getView();
            
            win.open({
                animated: true
            });                
        });
    });
    
    var containerView = Ti.UI.createView({
        width: '100%',
        height: Ti.UI.SIZE,
        backgroundColor: 'white',
        top: 0,
        left: 0
    });
    
    containerView.add(button);
    
    if (typeof appendTo != 'undefined') {
        appendTo.add(containerView);
    } else {
        $.eventsView.add(containerView);
    }
}

var eventDetailLoaded = false;

