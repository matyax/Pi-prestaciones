var args = arguments[0] || {};

var data        = require('data'),
    eventData   = data.get('eventData'),
    item        = data.get('agendaItem'),
    ui          = require('ui');
    
/* Agenda detail */
    
var window = $.agendaDetail;

window.setBackgroundColor(item.style_background);
window.setTitle(item.title);
    
var scrollView =  Ti.UI.createScrollView({
    contentWidth: 'auto',
    contentHeight: 'auto',
    layout: 'vertical',
    showVerticalScrollIndicator: true,
    height: Ti.UI.FILL,
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

/* Event title */
var titleLabel = Ti.UI.createLabel({
    color: item.style_foreground,
    font: { fontSize: 12 },
    text: item.title,
    textAlign: 'left',
    top: 10,
    left: 10,
    width: Titanium.Platform.displayCaps.platformWidth, height: Ti.UI.SIZE
});

var timeText = item.endTime ? 'De ' + item.startTime + ' a ' + item.endTime + ' horas' : item.startTime + ' horas';

var timeLabel = Ti.UI.createLabel({
    color: item.style_foreground,
    font: { fontSize: 12 },
    text: timeText,
    left: 10,
    width: Ti.UI.SIZE, height: Ti.UI.SIZE
});

var descriptionLabel = Ti.UI.createLabel({
    color: item.style_foreground,
    font: { fontSize: 12 },
    text: item.description,
    top: 10,
    left: 10,
    width: '95%', height: Ti.UI.SIZE
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
        height: '74px',
        left: 0,
        bottom: 0,
        zIndex: 2
    });
    
    var favoriteButton = Titanium.UI.createButton({
        backgroundImage: '/icons/favorite.png',
        width: '64px',
        height: '64px',
        top: '5px',
        left: 10
    });
    
    var favoriteLabel = Titanium.UI.createLabel({
        text: 'Favoritos',
        color: eventData.style.share_foreground,        
        font: {
            fontSize: 12
        },
        top: 11,
        left: 10
    });
    
    var tweet = Ti.UI.createImageView({
        image: '/icons/twitter.png',
        width: '64px',
        height: '64px',
        top: '5px',
        left: 40
    });
    
    var tweetLabel = Titanium.UI.createLabel({
        text: 'Twittear',
        color: eventData.style.share_foreground,
        font: {
            fontSize: 12
        },
        top: 11,
        left: 10
    });
    
    tweet.addEventListener('click', function (e) {
        var social = require('social');
        
        social.tweet(eventData, item);        
    });
    
    favoriteButton.addEventListener('click', function(e) {
        var favorites = require('favorites');
        
        favorites.toggle(eventData.id_event, item);
    });
    
    shareView.add(favoriteButton);
    shareView.add(favoriteLabel);
    shareView.add(tweet);
    shareView.add(tweetLabel);
    
    return shareView;
}
