exports.toggle = toggleFavorite;

function toggleFavorite(idEvent, item, title) {
    var favorites   = Alloy.createCollection('favorite'),
        favorite    = null;
        
    //console.log('Toggling: ' + item.id);

    favorites.fetch();

    var exists = false;

    favorites.map(function(favorite) {
        if (favorite.get('idAgendaItem') == item.id) {
            //console.log('Destroying: ' + favorite.get('idAgendaItem'));
            
            favorite.destroy();
            
            exists = true;
        }
    });

    if (exists) {
        var dialog = Ti.UI.createAlertDialog({
            message: 'Actividad removida de ' + title,
            ok: 'OK',
            title: title
        });
        
        dialog.show();
        
        return false;
    }

    favorite = Alloy.createModel('favorite', {
        idAgendaItem    : item.id,
        'idEvent'       : idEvent,
        title           : item.title,
        description     : item.description,
        date            : item.date,
        startTime       : item.startTime,
        endTime         : item.endTime
    });

    favorite.save();
    
    var dialog = Ti.UI.createAlertDialog({
        message: 'Actividad agregada a ' + title,
        ok: 'OK',
        title: title
    });
    
    dialog.show();
    
    return true;
}
