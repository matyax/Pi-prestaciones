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
        width: labelWidth
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
    }));
    
    return view;
};
