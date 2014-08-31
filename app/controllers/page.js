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
    return Ti.UI.createLabel({
        text: item.value,
        color: item.style_foreground,
        font: {
            fontSize: item.style_font_size
        },
        width: '95%',
        top: 10,
        left: 0
    });
}

function createTitle(item) {
    var view = Ti.UI.createView({
        backgroundColor: item.style_background,
        width: '100%',
        height: (item.style_font_size * 2),
        top: 10     
    });
    
    view.add(Ti.UI.createLabel({
        text: item.value,
        color: item.style_foreground,
        font: {
            fontSize: item.style_font_size
        },
        top: Math.round(item.style_font_size / 2),
        left: 10
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
