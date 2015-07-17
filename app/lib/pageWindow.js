var ui = require('ui');

var screenWidth = ui.screenWidth();

exports.createParagraph = function (item) {
    
    var textAlign = Ti.UI.TEXT_ALIGNMENT_LEFT; 
    
    if (item.style_align == 'right') {
        textAlign = Ti.UI.TEXT_ALIGNMENT_RIGHT;
    } else if (item.style_align == 'center') {
        textAlign = Ti.UI.TEXT_ALIGNMENT_CENTER;
    }
    
    var width = screenWidth - 40;
    
    var foreColor = item.style_foreground || 'black';
    
    return Ti.UI.createLabel({
        text: item.value,
        color: foreColor,
        font: {
            fontSize: item.style_font_size
        },
        width: width,
        height: Ti.UI.SIZE,
        top: 20,
        left: 20,
        textAlign: textAlign
    });
};

exports.createTitle = function (item) {
    var textAlign = Ti.UI.TEXT_ALIGNMENT_LEFT; 
    
    if (item.style_align == 'right') {
        textAlign = Ti.UI.TEXT_ALIGNMENT_RIGHT;
    } else if (item.style_align == 'center') {
        textAlign = Ti.UI.TEXT_ALIGNMENT_CENTER;
    }
    
    var view = Ti.UI.createView({
        layout: 'vertical',
        backgroundColor: item.style_background,
        width: '100%',
        height: Ti.UI.SIZE,
        top: 20
    });
    
    view.add(Ti.UI.createView({
        width: '100%',
        height: 5
    }));
    
    var labelWidth = screenWidth - 40;
    
    view.add(Ti.UI.createLabel({
        text: item.value,
        color: item.style_foreground,
        font: {
            fontSize: item.style_font_size
        },
        top: 0,
        left: 20,
        textAlign: textAlign,
        width: labelWidth,
        height: Ti.UI.SIZE
    }));
    
    view.add(Ti.UI.createView({
        width: '100%',
        height: 5
    }));
    
    return view;
};

exports.createImage = function (item) {
    
    var view = Ti.UI.createView({
        width: '100%',
        height: Ti.UI.SIZE,
        top: 20
    });
    
    view.add(Ti.UI.createImageView({
        image: item.value,
        width:  Ti.UI.SIZE,
        height: Ti.UI.SIZE
    }));
    
    return view;
};

exports.createAgendaShareView = function (item, eventData) {
    var shareView = Ti.UI.createView({
        layout: 'horizontal',
        backgroundColor: eventData.styles.share_background,
        width: '100%',
        height: 35,
        left: 0,
        bottom: 0,
        zIndex: 2
    });
    
    var favoriteButton = Titanium.UI.createButton({
        backgroundImage: '/icons' + eventData.favorites_icon,
        width: 25,
        height: 25,
        top: 5,
        left: 20
    });
    
    var favoriteLabel = Titanium.UI.createLabel({
        text: eventData.favorites_label,
        color: eventData.styles.share_foreground,        
        font: {
            fontSize: 12
        },
        top: 9,
        left: 10
    });
    
    if (eventData.hashtag) {
        var tweet = Ti.UI.createImageView({
            image: '/icons/dark/1410146719_f099-128.png',
            width: 19,
            height: 25,
            top: 5,
            left: 70
        });
        
        var tweetLabel = Titanium.UI.createLabel({
            text: 'Twittear',
            color: eventData.styles.share_foreground,
            font: {
                fontSize: 12
            },
            top: 9,
            left: 10
        });
        
        tweet.addEventListener('click', function (e) {
            var social = require('social');
            
            social.tweet(eventData, item);        
        });
        
        tweetLabel.addEventListener('click', function (e) {
            var social = require('social');
            
            social.tweet(eventData, item);        
        });
    }
    
    favoriteButton.addEventListener('click', function(e) {
        var favorites = require('favorites');
        
        favorites.toggle(eventData.id_event, item, eventData.favorites_label);
    });
    
    favoriteLabel.addEventListener('click', function(e) {
        var favorites = require('favorites');
        
        favorites.toggle(eventData.id_event, item, eventData.favorites_label);
    });
    
    shareView.add(favoriteButton);
    shareView.add(favoriteLabel);
    
    if (eventData.hashtag) {
        shareView.add(tweet);
        shareView.add(tweetLabel);
    }
    
    return shareView;
};
