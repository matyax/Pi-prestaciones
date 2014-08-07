var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            id: "INTEGER PRIMARY KEY AUTOINCREMENT",
            idEvent: "INTEGER",
            idAgendaItem: "INTEGER",
            title: "TEXT",
            startTime: "TEXT",
            endTime: "TEXT",
            date: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "favorite",
            idAttribute: "id"
        }
    },
    extendModel: function(Model) {
        _.extend(Model.prototype, {});
        return Model;
    },
    extendCollection: function(Collection) {
        _.extend(Collection.prototype, {});
        return Collection;
    }
};

model = Alloy.M("favorite", exports.definition, [ function(migration) {
    migration.name = "favorite";
    migration.id = "201407072230120";
    migration.up = function(migrator) {
        migrator.dropTable();
        migrator.createTable({
            columns: {
                id: "INTEGER PRIMARY KEY AUTOINCREMENT",
                idAgendaItem: "INTEGER",
                title: "TEXT",
                startTime: "TEXT",
                endTime: "TEXT",
                date: "TEXT"
            }
        });
    };
    migration.down = function(migrator) {
        migrator.dropTable();
    };
}, function(migration) {
    migration.name = "favorite";
    migration.id = "201407072234972";
    migration.up = function(migrator) {
        migrator.dropTable();
        migrator.createTable({
            columns: {
                id: "INTEGER PRIMARY KEY AUTOINCREMENT",
                idEvent: "INTEGER",
                idAgendaItem: "INTEGER",
                title: "TEXT",
                startTime: "TEXT",
                endTime: "TEXT",
                date: "TEXT"
            }
        });
    };
    migration.down = function(migrator) {
        migrator.dropTable();
    };
} ]);

collection = Alloy.C("favorite", exports.definition, model);

exports.Model = model;

exports.Collection = collection;