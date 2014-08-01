var piApi = require('pi');

var loading = require('loadingWindow');

$.index.open();

loading.open();

piApi.loadEvents(function (events) {
    loading.close();
     
    if (Titanium.Platform.osname == 'android') { //todo remove
        events = JSON.parse('[{"id":1,"name":"AAOC","image":"http:\/\/piprestaciones.com\/resources\/mobile\/events\/1.jpg"},{"id":2,"name":"IX Congreso el forum venoso latinoamericano","image":"http:\/\/piprestaciones.com\/resources\/mobile\/events\/2.png"},{"id":3,"name":"XIII Jornadas nacionales de Mastolog\u00eda","image":"http:\/\/piprestaciones.com\/resources\/mobile\/events\/3.jpg"}]');
    }
    
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
            top: 10,
            width: '100%',
            height: relativeHeight,
            style: Titanium.UI.iPhone.SystemButtonStyle.PLAIN,
            idEvent: events[i].id       
        });
        
        button.addEventListener('click', function (e) {
            //this.idEvent
            var win = Alloy.createController('event').getView();
            win.open({
                animated: true
            });
        });
        
        $.eventsView.add(button);
        
        quantity++;
    }
});

