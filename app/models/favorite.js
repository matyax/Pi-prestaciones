    exports.definition = {
	config: {
		columns: {
		    "idAgendaItem": "INTEGER",
		    "title": "TEXT",
		    "startTime": "TEXT",
		    "endTime": "TEXT",
		    "date": "TEXT"
		},
		adapter: {
			type: "sql",
			collection_name: "favorite"
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