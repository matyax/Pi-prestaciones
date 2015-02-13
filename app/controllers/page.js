var args = arguments[0] || {};

var data 		= require('data'),
    page 		= data.get('page'),
    eventData 	= data.get('eventData'),
    ui 			= data.get('ui'),
    pageWindow 	= data.get('pageWindow');
    
var screenWidth = ui.screenWidth();
    
$.pageWindow.setTitle(page.title);

if (page.background_color) {
	$.pageView.setBackgroundColor(page.background_color);
}

for (var i in page.items) {
    
    if (page.items[i].type == 'paragraph') {
        
        $.pageScrollView.add(
            pageWindow.createParagraph(page.items[i])
        );
        
    } else if (page.items[i].type == 'title') {
        
        $.pageScrollView.add(
            pageWindow.createTitle(page.items[i])
        );
        
    } else if (page.items[i].type == 'image') {
        $.pageScrollView.add(
            pageWindow.createImage(page.items[i])
        );
    }
}

