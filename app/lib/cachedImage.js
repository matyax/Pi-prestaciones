exports.load = function(imageUrl, callback, tempContainer, callbackData) {
    var image = null;

    function doRemote(imageUrl) {
        
        var file = Ti.Filesystem.getFile('cache/' + localFileName(imageUrl));

        if(! file.exists()) {
            image = Ti.UI.createImageView({
                visible: false
            });
            
            image.addEventListener("load", saveImageOnLoad);
            
            image.setImage(imageUrl);
            
            tempContainer.add(image);
        } else {
           callback(file.nativePath, callbackData);
        }
    };

    function saveImageOnLoad(e) {
        //var file = Ti.Filesystem.getFile('cache/' + localFileName(imageUrl));
        
        //file.write(e.source.toBlob());
        
        tempContainer.remove(image);
        
        callback(imageUrl, callbackData);
    };

    function localFileName(imageUrl) {
        hashedSource = Ti.Utils.md5HexDigest(imageUrl + '');
        
        return hashedSource;
    };
    
    doRemote(imageUrl);    
};