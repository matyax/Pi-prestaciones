exports.get = function (url, options) {
    var xhr = Titanium.Network.createHTTPClient({
        timeout : 10000
    });
    
    xhr.onload = function (e) {
        var response = this.responseText;
        
        options.success(JSON.parse(response));
    };
    
    xhr.onerror = function () {
        options.success(false);        
    };
    
    xhr.open('GET', url);
    
    xhr.send();
};
