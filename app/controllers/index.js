var piApi = require('pi');
var data = require('data');
var loading = require('loadingWindow');

$.index.open();

loading.open();

piApi.loadEvents(function (events) {
    loading.close();
    
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
    
    var relativeHeight = null;
    
    if (Titanium.Platform.osname == 'android') {
        relativeHeight = Math.round(Ti.Platform.displayCaps.platformWidth * 200 / 800) + 'px';
    } else {
        relativeHeight = Math.round(Ti.Platform.displayCaps.platformWidth * 200 / 800);        
    }
    
    var quantity = 0, top = 0, button = null;
    for (var i in events) {
        
        button = Ti.UI.createButton({
            backgroundImage: events[i].image,
            borderRadius: 15,
            top: 10,
            left: '5%',
            width: '90%',
            height: relativeHeight,
            style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
            idEvent: events[i].id       
        });
        
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
        
        quantity++;
    }
});

