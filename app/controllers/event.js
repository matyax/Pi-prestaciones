var args = arguments[0] || {};

var piApi = require('pi');

var eventData = null;

piApi.getEventDetail(function (event) {
    if (! event) {
        $.event.close();
        
        return;
    }
    
    eventData = event;
    
    /*
     * Set general styles
     */
    $.eventWindow.setTitle(event.title);
    
    if (event.background_color) {
        $.eventWindow.setBackgroundColor(event.background_color);
    }
   
    /*
     * Add Logo
     */
    var image = Ti.UI.createImageView({
       image: event.logo,
       width: '100%',
       top: '0dp'
    });
    
    $.eventView.add(image);
    
    /*
     * Add menu items
     */
    var label = '';
    
    if (event.information) {
        label = event.information_label || 'Presentación';
        
        addEventMenuItem({
            label: label,
            onClick: function () {
                alert('Clicked');
            }            
        });
    }
    
    if (event.agenda) {
        label = event.agenda_label || 'Agenda';
        
        addEventMenuItem({
            label: label,
            onClick: function () {
                alert('Clicked');
            }            
        });
    }
});

function addEventMenuItem(item) {
    var button = Titanium.UI.createButton({
        title: item.label,
        top: '0dp',
        width: '100%',
        height: 40,
        textAlign: 'left',
        borderWidth: 1,
        borderColor: 'black'
    });
    
    button.addEventListener('click', item.onClick);
    
    $.eventView.add(button);
}
