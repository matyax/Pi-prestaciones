var rest = require('rest');
var API_DOMAIN = 'http://pi.pizzaenelhorno.com.ar';

var eventsResponse = null,
	defaultLang    = Titanium.Locale.currentLanguage;

exports.loadEvents = function (callback, lang) {
	lang = lang || defaultLang;
	
    if (eventsResponse) {
        callback(eventsResponse);
        
        return;
    }
    
    rest.get(API_DOMAIN + '/congressApi/events?lang=' + lang, {
        success: function (response) {
            eventsResponse = response;
            
            callback(response);
        }
    });
};

var eventResponse = {
    
};

exports.getEventDetail = function (idEvent, callback) {
    if (eventResponse[idEvent]) {
        callback(eventResponse[idEvent]);
        
        return;
    }
    
    rest.get(API_DOMAIN + '/congressApi/eventDetail?id=' + idEvent, {
        success: function (response) {
            eventResponse[idEvent] = response;
            
            callback(response);
        }
    });
};
