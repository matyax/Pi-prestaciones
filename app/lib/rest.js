exports.get = function (url, options) {
    var xhr = Titanium.Network.createHTTPClient({
        timeout : 10000
    });
    
    xhr.onload = function (e) {
        var response = this.responseText;
        var parsedResponse = false;
        
        try {
            parsedResponse = JSON.parse(response);
        } catch (e) {
            parsedResponse = false;
        }
        
        options.success(parsedResponse);
    };
    
    xhr.onerror = function () {
        options.success(false);        
    };
    
    xhr.open('GET', url);
    
    xhr.send();
};
