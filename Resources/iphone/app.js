function setupAndroidPushNotifications() {
    function deviceTokenSuccess(e) {
        deviceToken = e.deviceToken;
        subscribleToChannels();
    }
    function deviceTokenError(e) {
        console.log("Failed to register for push notifications! " + e.error);
    }
    var CloudPush = require("ti.cloudpush");
    CloudPush.retrieveDeviceToken({
        success: deviceTokenSuccess,
        error: deviceTokenError
    });
    CloudPush.addEventListener("callback", function(evt) {
        alert("Notification received: " + evt.payload);
    });
}

function setupIosPushNotifications() {
    function receivePush(e) {
        alert("Received push: " + JSON.stringify(e));
    }
    function deviceTokenSuccess(e) {
        deviceToken = e.deviceToken;
        subscribleToChannels();
    }
    function deviceTokenError(e) {
        console.log("Failed to register for push notifications! " + e.error);
    }
    if (true && parseInt(Ti.Platform.version.split(".")[0]) >= 8) {
        Ti.App.iOS.addEventListener("usernotificationsettings", function registerForPush() {
            Ti.App.iOS.removeEventListener("usernotificationsettings", registerForPush);
            Ti.Network.registerForPushNotifications({
                success: deviceTokenSuccess,
                error: deviceTokenError,
                callback: receivePush
            });
        });
        Ti.App.iOS.registerUserNotificationSettings({
            types: [ Ti.App.iOS.USER_NOTIFICATION_TYPE_ALERT, Ti.App.iOS.USER_NOTIFICATION_TYPE_SOUND, Ti.App.iOS.USER_NOTIFICATION_TYPE_BADGE ]
        });
    } else Ti.Network.registerForPushNotifications({
        types: [ Ti.Network.NOTIFICATION_TYPE_BADGE, Ti.Network.NOTIFICATION_TYPE_ALERT, Ti.Network.NOTIFICATION_TYPE_SOUND ],
        success: deviceTokenSuccess,
        error: deviceTokenError,
        callback: receivePush
    });
}

function subscribleToChannels() {
    var Cloud = require("ti.cloud");
    Cloud.PushNotifications.subscribeToken({
        device_token: deviceToken,
        channel: "news_alerts",
        type: "ios"
    }, function(e) {
        e.success || console.log("Error:\n" + (e.error && e.message || JSON.stringify(e)));
    });
}

var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

var IOS = "iphone" === Ti.Platform.osname || "ipad" === Ti.Platform.osname;

var ANDROID = "android" === Ti.Platform.osname;

ANDROID ? setupAndroidPushNotifications() : IOS && setupIosPushNotifications();

var deviceToken = null;

Alloy.createController("index");