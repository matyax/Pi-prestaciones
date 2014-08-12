function tweet(eventData) {
    var url = "https://twitter.com/intent/tweet?text=";
    url += eventData.hashtag.replace("#", "%23");
    Ti.Platform.openURL(url);
}

exports.tweet = tweet;