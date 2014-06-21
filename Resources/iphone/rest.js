exports.get = function(url, options) {
    var xhr = Titanium.Network.createHTTPClient();
    xhr.open("GET", url);
    xhr.onload = function() {
        var response = this.responseText;
        options.success(JSON.parse(response));
    };
    xhr.onerror = function() {
        options.success(false);
    };
    xhr.send();
};