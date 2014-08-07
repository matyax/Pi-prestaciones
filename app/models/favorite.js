    exports.definition = {
	config: {
		columns: {
		    "id": "INTEGER PRIMARY KEY AUTOINCREMENT",
		    "idEvent": "INTEGER",
		    "idAgendaItem": "INTEGER",
		    "title": "TEXT",
		    "startTime": "TEXT",
		    "endTime": "TEXT",
		    "date": "TEXT"
		},
		adapter: {
			type: "sql",
			collection_name: "favorite",
			idAttribute: "id"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};