var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            idAgendaItem: "INTEGER",
            title: "TEXT",
            startTime: "TEXT",
            endTime: "TEXT",
            date: "TEXT"
        },
        adapter: {
            type: "sql",
            collection_name: "favorite"
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

model = Alloy.M("favorite", exports.definition, []);

collection = Alloy.C("favorite", exports.definition, model);

exports.Model = model;

exports.Collection = collection;