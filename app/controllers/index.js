var piApi       = require('pi');
var data        = require('data');
var loading     = require('loadingWindow');
var cachedImage = require('cachedImage');

$.index.open();

loading.open();

piApi.loadEvents(function (events) {
    
    if (events === false) {
        alert('Error de conexión');
    }
    
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
         relativeWidth  = null;
    
    if (events.length == 1) {
        $.index.remove($.logoContainer);
        $.index.remove($.congressTitle);
        
        $.eventsScrollView.setTop(0);
        
        if (Titanium.Platform.osname == 'android') {
            relativeHeight = Math.round(Ti.Platform.displayCaps.platformWidth * events[0].image_full_info.height / events[0].image_full_info.width) + 'px';
        } else {
            relativeHeight = Math.round(Ti.Platform.displayCaps.platformWidth * events[0].image_full_info.height / events[0].image_full_info.width);        
        }
        
        cachedImage.load(events[0].image_full, function (imagePath) {
            loading.close();
            
            addButtons(
                events,
                {
                    backgroundImage: imagePath,
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: relativeHeight,
                    style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN,        
                }                    
            );
        }, $.eventsScrollView);
    }
    else if (events.length == 2) {
        $.index.remove($.logoContainer);
        $.index.remove($.congressTitle);
        
        $.eventsScrollView.setTop(0);
        
        if (Titanium.Platform.osname == 'android') {
            relativeHeight = Math.round(Ti.Platform.displayCaps.platformHeight / 2);
            
            relativeWidth = Math.round(relativeHeight * events[0].image_full_info.width / events[0].image_full_info.height) + 'px';
            
            relativeHeight = relativeHeight + 'px';
        } else {
            relativeHeight = Math.round(Ti.Platform.displayCaps.platformHeight / 2);
            
            relativeWidth = Math.round(relativeHeight * events[0].image_full_info.width / events[0].image_full_info.height);        
        }
        
        buttonOptions = {
            backgroundImage: imagePath,
            top: 0,
            left: 0,
            width: relativeWidth,
            height: relativeHeight,
            style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN,        
        };
    }
    else {
        
        if (Titanium.Platform.osname == 'android') {
            relativeHeight = Math.round(Ti.Platform.displayCaps.platformWidth * 200 / 800) + 'px';
        } else {
            relativeHeight = Math.round(Ti.Platform.displayCaps.platformWidth * 200 / 800);        
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
    }
});

function addButtons(events, buttonOptions) {
    
    var button = null;
    
    for (var i in events) {
        
        buttonOptions.idEvent = events[i].id; 
        
        button = Ti.UI.createButton(buttonOptions);
        
        button.addEventListener('click', function (e) {
            var selectedEvent = null;
            
            //this.idEvent
            for (var i in events) {
                if (events[i].id == this.idEvent) {
                    selectedEvent = events[i];
                    break; 
                }
            }
            
            data.set('event', selectedEvent);
            
            loading.open();
            
            piApi.getEventDetail(selectedEvent.id, function (eventData) {
                loading.close();
                
                data.set('eventData', eventData);
                
                var win = Alloy.createController('event').getView();
                
                win.open({
                    animated: true
                });                
            });
        });
        
        $.eventsView.add(button);
    }
}

