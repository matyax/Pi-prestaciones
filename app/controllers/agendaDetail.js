var args = arguments[0] || {};

var data        = require('data'),
    eventData   = data.get('eventData'),
    item        = data.get('agendaItem'),
    ui          = require('ui');
    
/* Agenda detail */
    
var window = $.agendaDetail;

window.setBackgroundColor(item.style_background);
window.setTitle(item.title);

var paragraphWidth 		= Ti.Platform.displayCaps.platformWidth;
var scrollViewHieght	= Ti.Platform.displayCaps.platformHeight;

if (Titanium.Platform.osname == 'android') {
    paragraphWidth 		= pxToDP(paragraphWidth);
    scrollViewHieght 	= pxToDP(scrollViewHieght);
}

paragraphWidth 		-= 40;
scrollViewHieght	-= 75;
    
var scrollView =  Ti.UI.createScrollView({
    contentWidth: 'auto',
    contentHeight: 'auto',
    layout: 'vertical',
    showVerticalScrollIndicator: true,
    height: scrollViewHieght,
    width: '100%',
    top: 0,
    left: 0,
    zIndex: 1
});

window.add(
    createAgendaShareView(item)
);

/* Title of section */
var sectionView = ui.createSectionView(
    eventData,
    eventData.agenda_label + ' ' + item.date + ' ' + item.startTime
);

function pxToDP(px) {
    return (px / (Titanium.Platform.displayCaps.dpi / 160));
}

/* Event title */
var titleLabel = Ti.UI.createLabel({
    color: item.style_foreground,
    font: { fontSize: 15 },
    text: item.title,
    textAlign: 'left',
    top: 20,
    left: 20,
    width: paragraphWidth,
    height: Ti.UI.SIZE
});

var timeText = item.endTime ? 'De ' + item.startTime + ' a ' + item.endTime + ' horas' : item.startTime + ' horas';

var timeLabel = Ti.UI.createLabel({
    color: item.style_foreground,
    font: { fontSize: 15 },
    text: timeText,
    left: 20,
    width: Ti.UI.SIZE, height: Ti.UI.SIZE
});

var descriptionLabel = Ti.UI.createLabel({
    color: item.style_foreground,
    font: { fontSize: 15 },
    text: item.description,
    top: 20,
    left: 20,
    width: paragraphWidth,
    height: Ti.UI.SIZE
});

scrollView.add(sectionView);

scrollView.add(titleLabel);
scrollView.add(timeLabel);
scrollView.add(descriptionLabel);

window.add(scrollView);
 

function createAgendaShareView(item) {
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
    shareView.add(tweet);
    shareView.add(tweetLabel);
    
    return shareView;
}
