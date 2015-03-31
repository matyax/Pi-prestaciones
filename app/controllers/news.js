var args = arguments[0] || {};

var data        = require('data'),
    ui          = require('ui'),
    eventData   = data.get('eventData'),
    news        = eventData.news;
    
$.newsWindow.setTitle(eventData.news_label);
$.newsWindow.setBackgroundColor(eventData.styles.background);

$.newsContainer.setWidth(ui.screenWidth() - 40);

for (var i in news) {
    addNews(news[i]);
}

function addNews(news) {
    var title = news.textual_date;
    
    if (news.time) {
        title += ' ' + news.time;
    }
    
    var newsView = Ti.UI.createView({
        layout: 'vertical',
        width: '100%',
        height: Ti.UI.SIZE,
        top: 20            
    });
    
    var title = Ti.UI.createLabel({
        font: {
            fontSize: 14
        },
        color: eventData.styles.foreground,
        text: title,
        textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER
    });
    
    var content = Ti.UI.createLabel({
        top: 10,
        font: {
            fontSize: 12
        },
        color: eventData.styles.foreground,
        text: news.content,
        textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT
    });
    
    var line = Ti.UI.createView({
        backgroundColor: '#666666',
        layout: 'vertical',
        width: '100%',
        height: 1,
        top: 10          
    });
    
    newsView.add(title);
    newsView.add(content);
    newsView.add(line);
    
    $.newsContainer.add(newsView);
}