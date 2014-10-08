var style;
if (Ti.Platform.name === 'iPhone OS') {
    style = Ti.UI.iPhone.ActivityIndicatorStyle.BIG;
} else {
    style = Ti.UI.ActivityIndicatorStyle.BIG;
}

var activityIndicator = Ti.UI.createActivityIndicator({
    style : style,
    height : Ti.UI.SIZE,
    width : Ti.UI.SIZE
});

$.loadingWindow.add(activityIndicator);

activityIndicator.show();