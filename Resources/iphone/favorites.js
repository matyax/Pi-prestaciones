function toggleFavorite(idEvent, item) {
    var favorites = Alloy.createCollection("favorite"), favorite = null;
    console.log("Toggling: " + item.id);
    favorites.fetch();
    var exists = false;
    favorites.map(function(favorite) {
        if (favorite.get("idAgendaItem") == item.id) {
            console.log("Destroying: " + favorite.get("idAgendaItem"));
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
    console.log("Saved: " + item.id);
    alert("Agregado a favoritos.");
    return true;
}

exports.toggle = toggleFavorite;