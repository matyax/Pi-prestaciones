exports.createSectionView = function(eventData, title) {
    var sectionView = Ti.UI.createView({
        backgroundColor: eventData.styles.button_background,
        width: "100%",
        height: 30,
        top: 0,
        left: 0
    });
    var sectionLabel = Ti.UI.createLabel({
        color: eventData.styles.button_foreground,
        font: {
            fontSize: 14
        },
        text: title,
        textAlign: "left",
        top: 5,
        left: 10
    });
    sectionView.add(sectionLabel);
    return sectionView;
};