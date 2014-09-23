var args = arguments[0] || {};

var data = require('data'),
    page = data.get('page'),
    eventData = data.get('eventData');

$.pageView.setBackgroundColor(page.background_color);

for (var i in page.items) {
    
    if (page.items[i].type == 'paragraph') {
        
        $.pageScrollView.add(
            createParagraph(page.items[i])
        );
        
    } else if (page.items[i].type == 'title') {
        
        $.pageScrollView.add(
            createTitle(page.items[i])
        );
        
    } else if (page.items[i].type == 'image') {
        $.pageScrollView.add(
            createImage(page.items[i])
        );
    }
}

function createParagraph(item) {
    
    var textAlign = Ti.UI.TEXT_ALIGNMENT_LEFT; 
    
    if (item.style_align == 'right') {
        textAlign = Ti.UI.TEXT_ALIGNMENT_RIGHT;
    } else if (item.style_align == 'center') {
        textAlign = Ti.UI.TEXT_ALIGNMENT_CENTER;
    }
    
    var width = Ti.Platform.displayCaps.platformWidth - 40;
    
    if (Titanium.Platform.osname == 'android') {
        width = width + 'px';
    }
    
    return Ti.UI.createLabel({
        text: item.value,
        color: item.style_foreground,
        font: {
            fontSize: item.style_font_size
        },
        width: width,
        top: 10,
        left: 10,
        textAlign: textAlign
    });
}

function createTitle(item) {
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
        top: 10
    });
    
    view.add(Ti.UI.createView({
        width: '100%',
        height: 5
    }));
    
    var labelWidth = Ti.Platform.displayCaps.platformWidth - 40;
    if (Ti.Platform.osname == 'android') {
        labelWidth = labelWidth + 'px';
    }
    
    view.add(Ti.UI.createLabel({
        text: item.value,
        color: item.style_foreground,
        font: {
            fontSize: item.style_font_size
        },
        top: 0,
        left: 20,
        textAlign: textAlign,
        width: labelWidth
    }));
    
    view.add(Ti.UI.createView({
        width: '100%',
        height: 5
    }));
    
    return view;
}

function createImage(item) {
    
    var view = Ti.UI.createView({
        width: '100%',
        height: Ti.UI.SIZE,
        top: 10
    });
    
    view.add(Ti.UI.createImageView({
        image: item.value,
    }));
    
    return view;
}
