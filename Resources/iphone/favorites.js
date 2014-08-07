function toggleFavorite(idEvent, item) {
    var favorites = Alloy.createCollection("favorite"), favorite = null;
    favorites.fetch();
    var exists = false;
    favorites.map(function(favorite) {
        if (favorite.get("idAgendaItem") == item.id) {
            favorite.destroy();
            exists = true;
        }
    });
    if (exists) {
        alert("Removido de favoritos.");
        return false;
    }
    favorite = Alloy.createModel("favorite", {
        idAgendaItem: item.id,
        idEvent: idEvent,
        title: item.title,
        description: item.description,
        date: item.date,
        startTime: item.startTime,
        endTime: item.endTime
    });
    favorite.save();
    alert("Agregado a favoritos.");
    return true;
}

exports.toggle = toggleFavorite;