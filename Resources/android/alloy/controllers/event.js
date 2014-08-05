function __processArg(obj, key) {
    var arg = null;
    if (obj) {
        arg = obj[key] || null;
        delete obj[key];
    }
    return arg;
}

function Controller() {
    function addEventMenuItem(item) {
        var button = Titanium.UI.createButton({
            title: item.label,
            width: Ti.UI.FILL,
            height: 40,
            textAlign: "left",
            backgroundColor: "transparent",
            borderColor: "transparent",
            borderWidth: 0,
            color: eventData.styles.button_foreground,
            top: 0,
            left: 5
        });
        var icon = Ti.UI.createImageView({
            image: "/icons/" + item.icon + ".png",
            width: 30,
            height: 30,
            left: 10,
            top: 5
        });
        var view = Titanium.UI.createView({
            layout: "horizontal",
            top: 1,
            width: "100%",
            height: 40,
            backgroundColor: eventData.styles.button_background
        });
        view.add(icon);
        view.add(button);
        item.onClick ? button.addEventListener("click", item.onClick) : item.window && button.addEventListener("click", function() {
            item.window.open({
                modal: true
            });
        });
        $.eventView.add(view);
    }
    function createEventWindow(title, backgroundColor) {
        return Titanium.UI.createWindow({
            backgroundColor: backgroundColor,
            layout: "vertical",
            title: title
        });
    }
    function createSectionView(title) {
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
    }
    function createAccommodationDetailWindow(item) {
        var window = Titanium.UI.createWindow({
            backgroundColor: eventData.styles.background,
            layout: "vertical",
            title: item.title
        });
        var scrollView = Ti.UI.createScrollView({
            contentWidth: "auto",
            contentHeight: "auto",
            showVerticalScrollIndicator: true,
            layout: "vertical",
            height: Ti.UI.FILL,
            width: "100%"
        });
        var sectionView = createSectionView(eventData.accommodations_label + " - " + item.title);
        var titleLabel = Ti.UI.createLabel({
            color: eventData.styles.forecolor,
            font: {
                fontSize: 12
            },
            text: item.title,
            textAlign: "left",
            top: 10,
            left: 10,
            width: Titanium.Platform.displayCaps.platformWidth,
            height: Ti.UI.SIZE
        });
        var descriptionLabel = Ti.UI.createLabel({
            color: eventData.styles.forecolor,
            font: {
                fontSize: 12
            },
            text: item.description,
            top: 10,
            left: 10,
            width: "95%",
            height: Ti.UI.SIZE
        });
        scrollView.add(sectionView);
        scrollView.add(titleLabel);
        scrollView.add(descriptionLabel);
        window.add(scrollView);
        return window;
    }
    function createAgendaDetailWindow(item) {
        var window = Titanium.UI.createWindow({
            backgroundColor: eventData.styles.background,
            title: item.title
        });
        window.add(createAgendaShareView());
        var scrollView = Ti.UI.createScrollView({
            contentWidth: "auto",
            contentHeight: "auto",
            layout: "vertical",
            showVerticalScrollIndicator: true,
            height: Ti.UI.FILL,
            width: "100%",
            top: 0,
            left: 0
        });
        var sectionView = createSectionView(eventData.agenda_label + " " + item.date + " " + item.startTime);
        var titleLabel = Ti.UI.createLabel({
            color: eventData.styles.forecolor,
            font: {
                fontSize: 12
            },
            text: item.title,
            textAlign: "left",
            top: 10,
            left: 10,
            width: Titanium.Platform.displayCaps.platformWidth,
            height: Ti.UI.SIZE
        });
        var titleLabel = Ti.UI.createLabel({
            color: eventData.styles.forecolor,
            font: {
                fontSize: 12
            },
            text: item.title,
            textAlign: "left",
            top: 10,
            left: 10,
            width: Titanium.Platform.displayCaps.platformWidth,
            height: Ti.UI.SIZE
        });
        var timeText = item.endTime ? "De " + item.startTime + " a " + item.endTime + " horas" : item.startTime + " horas";
        var timeLabel = Ti.UI.createLabel({
            color: eventData.styles.forecolor,
            font: {
                fontSize: 12
            },
            text: timeText,
            left: 10,
            width: Ti.UI.SIZE,
            height: Ti.UI.SIZE
        });
        var descriptionLabel = Ti.UI.createLabel({
            color: eventData.styles.forecolor,
            font: {
                fontSize: 12
            },
            text: item.description,
            top: 10,
            left: 10,
            width: "95%",
            height: Ti.UI.SIZE
        });
        scrollView.add(sectionView);
        scrollView.add(titleLabel);
        scrollView.add(timeLabel);
        scrollView.add(descriptionLabel);
        window.add(scrollView);
        return window;
    }
    function createAgendaShareView() {
        var shareView = Ti.UI.createView({
            layout: "horizontal",
            backgroundColor: eventData.styles.share_background,
            width: "100%",
            height: "74px",
            left: 0,
            bottom: 0
        });
        var favorite = Ti.UI.createImageView({
            image: "/icons/favorite.png",
            width: "64px",
            height: "64px",
            top: "5px",
            left: 10
        });
        var tweet = Ti.UI.createImageView({
            image: "/icons/twitter.png",
            width: "64px",
            height: "64px",
            top: "5px",
            left: 10
        });
        shareView.add(favorite);
        shareView.add(tweet);
        return shareView;
    }
    function searchItem(items, id) {
        var item = null;
        for (var i in items) {
            if ("object" != typeof items[i]) continue;
            if (isNaN(parseInt(i))) {
                item = searchItem(items[i], id);
                if (item) return item;
            } else if (items[i].id && items[i].id == id) return items[i];
        }
        return null;
    }
    require("alloy/controllers/BaseController").apply(this, Array.prototype.slice.call(arguments));
    this.__controllerPath = "event";
    if (arguments[0]) {
        __processArg(arguments[0], "__parentSymbol");
        __processArg(arguments[0], "$model");
        __processArg(arguments[0], "__itemTemplate");
    }
    var $ = this;
    var exports = {};
    $.__views.eventNavigationWindow = Ti.UI.createWindow({
        id: "eventNavigationWindow"
    });
    $.__views.eventNavigationWindow && $.addTopLevelView($.__views.eventNavigationWindow);
    $.__views.eventView = Ti.UI.createView({
        height: Ti.UI.FILL,
        layout: "vertical",
        top: 0,
        id: "eventView"
    });
    $.__views.eventNavigationWindow.add($.__views.eventView);
    exports.destroy = function() {};
    _.extend($, $.__views);
    arguments[0] || {};
    var piApi = require("pi");
    var data = require("data");
    var loading = require("loadingWindow");
    var eventData = null;
    data.get("event");
    loading.open();
    piApi.getEventDetail(function(event) {
        event = JSON.parse('{"title":"Congreso Internacional de Prueba","address":"Vicente Gil 446","logo":"http://piprestaciones.com/resources/mobile/events/1.jpg","hashtag":"#congresoDePrueba","styles":{"background":"black","forecolor":"#e5e5e5","button_background":"#3b7183","button_foreground":"white"},"information_label":"Presentación","information":"Lots of static text about this event. Lots of static text about this event. Lots of static text about this event. Lots of static text about this event. ","agenda_label":"Programa","agenda":{"headerTitle":"Especialidades","Psiquiatría":{"headerTitle":"Días","Lunes 28":[{"id":"12","date":"2014-07-28","startTime":"12:00","endTime":"13:00","title":"Lunch","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"},{"id":"11","date":"2014-07-28","startTime":"12:00","endTime":"13:00","title":"Charla de algo","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"}],"Martes 29":[{"id":"10","date":"2014-07-29","startTime":"14:00","endTime":"17:00","title":"Lunch","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"},{"id":"9","date":"2014-07-29","startTime":"15:00","endTime":"16:00","title":"Charla de algo","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"}],"Miércoles 30":[{"id":"8","date":"2014-07-30","startTime":"15:00","endTime":"16:00","title":"Lunch","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"},{"id":"7","date":"2014-07-30","startTime":"17:00","endTime":"18:00","title":"Charla de algo","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"}]},"Cirujía":{"Lunes 28":[{"id":"1","date":"2014-07-28","startTime":"12:00","endTime":"13:00","title":"Lunch","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"},{"id":"2","date":"2014-07-28","startTime":"12:00","endTime":"13:00","title":"Charla de algo","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"}],"Martes 29":[{"id":"3","date":"2014-07-29","startTime":"14:00","endTime":"17:00","title":"Lunch","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"},{"id":"4","date":"2014-07-29","startTime":"15:00","endTime":"16:00","title":"Charla de algo","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"}],"Miércoles 30":[{"id":"5","date":"2014-07-30","startTime":"15:00","endTime":"16:00","title":"Lunch","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"},{"id":"6","date":"2014-07-30","startTime":"17:00","endTime":"18:00","title":"Charla de algo","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"}]}},"accommodations_label":"Alojamientos recomendados","accommodations":[{"id":"1","title":"Hyatt","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"},{"id":"2","title":"Park Suites","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"},{"id":"3","title":"Aconcagua NH","description":"Lots of static text about this event. Lots of static textLots of static text about this event. Lots of static text"}],"form_label":"Inscripción","form":"http://piprestaciones.com/f/fvenoso2014","certificate_label":"Descargá tu certificado","certificate":"http://piprestaciones.com/certificate/bys/","map_label":"Lugar del evento","map":{"lat":"-32.896958","lng":"-68.857484"}}');
        if (!event) {
            $.eventNavigationWindow.close();
            return;
        }
        eventData = event;
        var windowReference = null;
        $.eventNavigationWindow.setTitle(event.title);
        $.eventNavigationWindow.setBackgroundColor(event.styles.background);
        var image = Ti.UI.createImageView({
            image: event.logo,
            width: "100%",
            top: "0dp"
        });
        $.eventView.add(image);
        var label = "";
        addEventMenuItem({
            icon: "home",
            label: "Inicio",
            onClick: function() {
                $.eventNavigationWindow.close();
            }
        });
        if (event.information) {
            label = event.information_label || "Presentación";
            var informationWindow = createEventWindow(label, event.styles.background);
            var informationScrollView = Ti.UI.createScrollView({
                contentWidth: "auto",
                contentHeight: "auto",
                showVerticalScrollIndicator: true,
                layout: "vertical",
                height: Ti.UI.FILL,
                width: "100%"
            });
            var informationLabel = Ti.UI.createLabel({
                color: event.styles.forecolor,
                font: {
                    fontSize: 12
                },
                text: event.information,
                textAlign: "left",
                top: 10,
                left: 10,
                width: Ti.UI.SIZE,
                height: Ti.UI.SIZE
            });
            var informationSectionView = createSectionView(label);
            informationScrollView.add(informationSectionView);
            informationScrollView.add(informationLabel);
            informationWindow.add(informationScrollView);
            addEventMenuItem({
                icon: "information",
                label: label,
                window: informationWindow
            });
        }
        if (event.agenda) {
            label = event.agenda_label || "Agenda";
            var agendaOnclick = function(id) {
                var detailWindow = createAgendaDetailWindow(searchItem(event.agenda, id));
                detailWindow.open({
                    modal: true
                });
            };
            var calendar = require("listNavigation");
            var agendaWindow = calendar.add(label, event.agenda, agendaOnclick, windowReference, event.styles.background);
            addEventMenuItem({
                icon: "agenda",
                label: label,
                window: agendaWindow
            });
        }
        if (event.form) {
            label = event.form_label || "Inscripción online";
            var formWindow = createEventWindow(label, event.styles.background);
            var formWebView = Titanium.UI.createWebView({
                url: event.form
            });
            formWindow.add(formWebView);
            addEventMenuItem({
                icon: "form",
                label: label,
                window: formWindow
            });
        }
        if (event.certificate) {
            label = event.certificate_label || "Certificación web";
            var cwWindow = createEventWindow(label, event.styles.background);
            var cwWebView = Titanium.UI.createWebView({
                url: event.certificate
            });
            cwWindow.add(cwWebView);
            addEventMenuItem({
                icon: "certificate",
                label: label,
                window: cwWindow
            });
        }
        if (event.map) {
            label = event.map_label || "Ubicación";
            var mapWindow = createEventWindow(label, event.styles.background);
            var MapModule = require("ti.map");
            event.map.lat = parseFloat(event.map.lat);
            event.map.lng = parseFloat(event.map.lng);
            var marker = MapModule.createAnnotation({
                latitude: event.map.lat,
                longitude: event.map.lng,
                pincolor: MapModule.ANNOTATION_PURPLE,
                title: event.title,
                subtitle: event.address,
                leftButton: Ti.UI.iPhone.SystemButton.INFO_DARK
            });
            var map = MapModule.createView({
                userLocation: true,
                mapType: MapModule.NORMAL_TYPE,
                animate: true,
                region: {
                    latitude: event.map.lat,
                    longitude: event.map.lng,
                    latitudeDelta: .05,
                    longitudeDelta: .05
                },
                height: "100%",
                top: 0,
                width: Ti.UI.FILL,
                annotations: [ marker ]
            });
            mapWindow.add(map);
            addEventMenuItem({
                icon: "map",
                label: label,
                window: mapWindow
            });
        }
        if (event.accommodations) {
            label = event.accommodations_label || "Agenda";
            var accommodationOnclick = function(id) {
                var detailWindow = createAccommodationDetailWindow(searchItem(event.accommodations, id));
                detailWindow.open({
                    modal: true
                });
            };
            var accommodationNavigation = require("listNavigation");
            var accommodationWindow = accommodationNavigation.add(label, event.accommodations, accommodationOnclick, windowReference, event.styles.background);
            addEventMenuItem({
                icon: "accommodation",
                label: label,
                window: accommodationWindow
            });
        }
        loading.close();
    });
    _.extend($, exports);
}

var Alloy = require("alloy"), Backbone = Alloy.Backbone, _ = Alloy._;

module.exports = Controller;