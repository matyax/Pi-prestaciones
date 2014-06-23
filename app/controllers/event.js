var args = arguments[0] || {};

var piApi = require('pi');

piApi.getEventDetail(function (event) {
    if (! event) {
        $.event.close();
        
        return;
    }
    
   $.eventWindow.setTitle(event.title); 
});
