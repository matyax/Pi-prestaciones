exports.transformData = transformData;
exports.findStand 	  = findStand;

var data      = require('data'),
    eventData = data.get('eventData');

function transformData(exhibition) {
	var pavilions = {
		headerTitle: eventData.pavilion_label
	};
	
	exhibition.forEach(function (pavilion) {
		pavilions[pavilion.title] = trasnformPavilion(pavilion);
	});
	
	return pavilions;
}

function trasnformPavilion(pavilion) {
	return pavilion.children;
}

function findStand(id) {
	var foundStand = null;
	
	eventData.exhibitions.forEach(function (pavilion) {
		pavilion.children.forEach(function (stand) {
			if (foundStand) {
				return;
			}
			
			if (stand.id == id) {
				foundStand = stand;
			}
		});
	});
	
	return foundStand;
}
