function pxToDP(px) {
    return px / (Titanium.Platform.displayCaps.dpi / 160);
}

exports.createSectionView = function(eventData, title) {
    var sectionView = Ti.UI.createView({
        backgroundColor: eventData.styles.button_background,
        width: "100%",
        height: 40,
        top: 0,
        left: 0
    });
    var sectionLabel = Ti.UI.createLabel({
        color: eventData.styles.button_foreground,
        font: {
            fontSize: 16
        },
        text: title,
        textAlign: "left",
        top: 10,
        left: 10
    });
    sectionView.add(sectionLabel);
    return sectionView;
};

exports.pxToDP = pxToDP;

exports.screenWidth = function() {
    if ("android" == Titanium.Platform.osname) return pxToDP(Ti.Platform.displayCaps.platformWidth);
    return Ti.Platform.displayCaps.platformWidth;
};