migration.up = function(migrator) {
    migrator.dropTable();
    
    migrator.createTable({
        columns: {
            "id": "INTEGER PRIMARY KEY AUTOINCREMENT",
            "idAgendaItem": "INTEGER",
            "title": "TEXT",
            "startTime": "TEXT",
            "endTime": "TEXT",
            "date": "TEXT"
        }
    });

};

migration.down = function(migrator) {
    migrator.dropTable();
};
