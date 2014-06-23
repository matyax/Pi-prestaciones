exports.definition = {
	config: {
		columns: {
		    "id": "integer",
		    "title": "string",
		    "logo": "string",
		    "information_label": "string",
		    "information": "string"
		},
		adapter: {
			type: "sql",
			collection_name: "event"
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