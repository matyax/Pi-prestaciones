var Alloy = require("alloy"), _ = require("alloy/underscore")._, model, collection;

exports.definition = {
    config: {
        columns: {
            id: "integer",
            title: "string",
            logo: "string",
            information_label: "string",
            information: "string"
        },
        adapter: {
            type: "sql",
            collection_name: "event"
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

model = Alloy.M("event", exports.definition, []);

collection = Alloy.C("event", exports.definition, model);

exports.Model = model;

exports.Collection = collection;