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
    CloudPush.addEventListener("callback", function() {
        processAndroidNotification();
    });
}

function setupIosPushNotifications() {
    function receivePush() {
        processIosNotification();
    }
    function deviceTokenSuccess(e) {
        deviceToken = e.deviceToken;
        subscribleToChannels();
    }
    function deviceTokenError(e) {
        console.log("Failed to register for push notifications! " + e.error);
    }
    Ti.Network.registerForPushNotifications({
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
        channel: "piprestaciones",
        type: "android"
    }, function(e) {
        e.success || console.log("Error:\n" + (e.error && e.message || JSON.stringify(e)));
    });
}

function processAndroidNotification() {}

function processIosNotification() {}

var Alloy = require("alloy"), _ = Alloy._, Backbone = Alloy.Backbone;

var IOS = false;

var ANDROID = true;

ANDROID ? setupAndroidPushNotifications() : IOS && setupIosPushNotifications();

var deviceToken = null;

Alloy.createController("index");