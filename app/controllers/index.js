$.index.open();

var piApi = require('pi');

piApi.loadEvents(function (events) {
    if (events === false) {
        alert('Error de conexión');
    }
        
    for (var i in events) {
        alert(events[i].image);
        
        var image = Ti.UI.createImageView({
            image: events[i].image
        });
        
        $.index.add(image);
    }
});
