$.index.open();

var piApi = require('pi');

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
    
    var relativeHeight = Math.round(Ti.Platform.displayCaps.platformWidth * 200 / 800);
    
    var quantity = 0, top = 0, image = null;
    for (var i in events) {
        
        top = (quantity * relativeHeight) + (10 * quantity);
        
        image = Ti.UI.createButton({
            image: events[i].image,
            'top': top,
            width: '100%',
            height: relativeHeight,
            style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN            
        });
        
        $.eventsView.add(image);
        
        quantity++;
    }
    
    $.eventsView.setHeight((events.length * relativeHeight) + (events.length * 10));
});
