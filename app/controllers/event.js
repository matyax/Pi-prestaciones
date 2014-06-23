var args = arguments[0] || {};

var piApi = require('pi');

piApi.getEventDetail(function (event) {
    if (! event) {
        $.event.close();
        
        return;
    }
    
   $.eventWindow.setTitle(event.title);
   
   var image = Ti.UI.createImageView({
      image: event.logo,
      width: '100%',
      top: '0dp'
    });
    
    $.eventView.add(image); 
});
