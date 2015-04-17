var args = arguments[0] || {};

var data        = require('data'),
    ui          = require('ui'),
    eventData   = data.get('eventData'),
    news        = eventData.news,
    newsWidth   = ui.screenWidth() - 60;
    
$.newsWindow.setTitle(eventData.news_label);
$.newsWindow.setBackgroundColor(eventData.styles.background);

$.newsContainer.setWidth(ui.screenWidth());

var contentFont = (ANDROID) ? 'DroidSerif' : 'Georgia',
    titleFont   = (ANDROID) ? 'DroidSans' : 'Helvetica';
    
ui.setLastUnreadNews(news[0].id);

for (var i in news) {
    addNews(news[i]);
}

function addNews(news) {
    var title = news.textual_date;
        
    var newsView = Ti.UI.createView({
        layout: 'vertical',
        width: newsWidth,
        height: Ti.UI.SIZE,
        top: 30,
        left: 30            
    });
    
    var title = Ti.UI.createLabel({
        font: {
            fontSize: 14,
            fontWeight: 'bold',
            fontFamily: titleFont
        },
        color: eventData.styles.foreground,
        text: title,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
        width: '100%'
    });
    
    var subtitle = null;
    
    if (news.time) {
        subtitle = Ti.UI.createLabel({
            font: {
                fontSize: 10,
                fontWeight: 'bold',
                fontFamily: titleFont
            },
            color: eventData.styles.foreground,
            text: news.time + ' HS',
            textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
            width: '100%'
        });
    }
    
    var content = Ti.UI.createLabel({
        top: 15,
        font: {
            fontSize: 12,
            fontFamily: contentFont
        },
        color: eventData.styles.foreground,
        text: news.content,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
    });
    
    var line = Ti.UI.createView({
        backgroundColor: '#999999',
        layout: 'vertical',
        width: '100%',
        height: 1,
        top: 30          
    });
    
    newsView.add(title);
    
    if (subtitle) {
        newsView.add(subtitle);
    }
    
    newsView.add(content);
    
    $.newsContainer.add(newsView);
    $.newsContainer.add(line);
}