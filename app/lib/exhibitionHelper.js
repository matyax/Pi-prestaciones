exports.transformData = transformData;
exports.findStand 	  = findStand;

var data      = require('data'),
    eventData = data.get('eventData');

function transformData(exhibition) {
	var pavilions = {
		headerTitle: eventData.pavilion_label
	};
	
	if (exhibition.length === 1) {
		pavilions.headerTitle = eventData.stand_label;
		
		exhibition[0].children.forEach(function (stand) {
			pavilions[stand.title] = stand;
		});
		
		return [pavilions];
	}
	
	exhibition.forEach(function (pavilion) {
		pavilions[pavilion.title] = trasnformPavilion(pavilion);
	});
	
	return [pavilions];
}

function trasnformPavilion(pavilion) {
	pavilion.children.forEach(function (child) {
		child.startTime = eventData.stand_label; //hack alert
	});
	
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
