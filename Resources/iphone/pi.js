var rest = require("rest");

var API_DOMAIN = "http://dev.congresstools.com";

exports.loadEvents = function(callback) {
    rest.get(API_DOMAIN + "/congressApi/events", {
        success: function(response) {
            callback(response);
        }
    });
};

exports.getEventDetail = function(callback) {
    rest.get(API_DOMAIN + "/congressApi/eventDetail", {
        success: function(response) {
            callback(response);
        }
    });
};