exports.tweet = tweet;

function tweet(eventData, item) {
    
    var url = 'https://twitter.com/intent/tweet?text=';
    
    url += eventData.hashtag.replace('#', '%23');
    
    Ti.Platform.openURL(url);
}
