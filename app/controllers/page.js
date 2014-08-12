var args = arguments[0] || {};

var data = require('data'),
    page = data.get('page'),
    eventData = data.get('eventData');

$.sectionView.setBackgroundColor(eventData.styles.button_background);
    
$.title.setText(page.title);
$.title.setColor(eventData.styles.button_foreground);

$.content.setText(page.content);
$.content.setColor(eventData.styles.forecolor);

$.pageView.setBackgroundColor(eventData.styles.background);

if (page.image) {
    if (page.image_position == 'before') {
        $.imageBefore.setImage(
            page.image
        );
        
        $.imageBefore.setVisible(true);
    } else if (page.image_position == 'after') {
        $.imageAfter.setImage(
            page.image
        );
        
        $.imageAfter.setVisible(true);
    }
}
