var rest = require("rest");

var API_DOMAIN = "http://192.168.0.102";

var eventsResponse = null;

exports.loadEvents = function(callback) {
    if (eventsResponse) {
        callback(eventsResponse);
        return;
    }
    rest.get(API_DOMAIN + "/congressApi/events", {
        success: function(response) {
            eventsResponse = response;
            callback(response);
        }
    });
};

var eventResponse = {};

exports.getEventDetail = function(idEvent, callback) {
    if (eventResponse[idEvent]) {
        callback(eventResponse[idEvent]);
        return;
    }
    rest.get(API_DOMAIN + "/congressApi/eventDetail?id=" + idEvent, {
        success: function(response) {
            eventResponse[idEvent] = response;
            callback(response);
        }
    });
};