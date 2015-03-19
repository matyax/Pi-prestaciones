var args = arguments[0] || {};

var data        = require('data'),
    eventData   = data.get('eventData'),
    item        = data.get('agendaItem'),
    ui          = require('ui'),
    pageWindow  = require('pageWindow');
    
/* Agenda detail */
    
var window = $.agendaDetail;

window.setBackgroundColor(item.style_background);
window.setTitle(item.title);

var scrollViewHeight = ui.screenHeight() - 75;
    
var scrollView =  Ti.UI.createScrollView({
    contentWidth: 'auto',
    contentHeight: 'auto',
    layout: 'vertical',
    showVerticalScrollIndicator: true,
    height: scrollViewHeight,
    width: '100%',
    top: 0,
    left: 0,
    zIndex: 1
});

for (var i in item.items) {
    
    if (item.items[i].type == 'paragraph') {
        
        scrollView.add(
            pageWindow.createParagraph(item.items[i])
        );
        
    } else if (item.items[i].type == 'title') {
        
        scrollView.add(
            pageWindow.createTitle(item.items[i])
        );
        
    } else if (item.items[i].type == 'image') {
        scrollView.add(
            pageWindow.createImage(item.items[i])
        );
    }
}

window.add(
	pageWindow.createAgendaShareView(item, eventData)
);

window.add(scrollView);