exports.load = function(imageUrl, callback, tempContainer) {
    function doRemote(imageUrl) {
        var file = Ti.Filesystem.getFile("cache/" + localFileName(imageUrl));
        if (file.exists()) callback(file.nativePath); else {
            image = Ti.UI.createImageView({
                visible: false
            });
            image.addEventListener("load", saveImageOnLoad);
            image.setImage(imageUrl);
            tempContainer.add(image);
        }
    }
    function saveImageOnLoad() {
        tempContainer.remove(image);
        callback(imageUrl);
    }
    function localFileName(imageUrl) {
        hashedSource = Ti.Utils.md5HexDigest(imageUrl + "");
        return hashedSource;
    }
    var image = null;
    doRemote(imageUrl);
};