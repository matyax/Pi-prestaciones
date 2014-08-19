exports.get = function(url, options) {
    var xhr = Titanium.Network.createHTTPClient({
        timeout: 1e4
    });
    xhr.onload = function() {
        var response = this.responseText;
        options.success(JSON.parse(response));
    };
    xhr.onerror = function() {
        options.success(false);
    };
    xhr.open("GET", url);
    xhr.send();
};