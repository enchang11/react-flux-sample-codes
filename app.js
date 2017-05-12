"use strict";

var React = require('react');
window.React = React;

// Flux Components
var NwaaDemoConstants = require('./constants/NwaaDemoConstants');
var NwaaDemoUtils = require('./utils/NwaaDemoUtils');
var NwaaDemoViewHelper = require('./helpers/NwaaDemoViewHelper');
var MessageActionCreators = require('./actions/MessageActionCreators');
var ViewActionCreators = require('./actions/ViewActionCreators');

// ReactCompoents
var Auction = require('./components/Auction.react');
var Statistics = require('./components/Statistics.react');
var SuccessList = require('./components/SuccessList.react');

var stat = React.render(<Statistics />, document.getElementById("statistics"));
var successList = React.render(<SuccessList />, document.getElementById("successList"));
React.render(<Auction />, document.getElementById("container"));

// Kaazing Client
var connection, session, consumers = {};

var clientID = NwaaDemoUtils.getUniqueID();

function initChannel(placeInfo) {

    var placeElementId = NwaaDemoViewHelper.createPlaceId(placeInfo[0], placeInfo[1]);

    var newPlace = {};
    newPlace.placeElementId = placeElementId;
    newPlace.channels = [];

    for (var i = 0; i < 2; i++) {

        var rowId = NwaaDemoViewHelper.createRowId(placeInfo[0], placeInfo[1], i);

        var newChannel = {
            rowId: rowId,
            auctionID: placeInfo[0],
            placeID: placeInfo[1],
            placeName: placeInfo[2],
            channel: "-",
            carInfo: {
                entryNumber: "",
                carName: "",
                model: "",
                imageUrl: NwaaDemoViewHelper.getDefaultPlaceImage(placeElementId),
                price: "",
                year: "",
                mileage: "",
                mileageUnit: "",
                estimate: "",
                indicatorClassName: "indicator",
                status: "",
                statusClassName: "status"
            }
        };

        newPlace.channels.push(newChannel);

    }

    ViewActionCreators.addPlace(newPlace);

}

function subscribe(placeId) {

    if (!session || consumers[placeId]) {
        return;
    }

    var topic_name = NwaaDemoViewHelper.createPlaceTopicName(placeId.split("_")[0], placeId.split("_")[1]);
    var topic = session.createTopic(topic_name);
    var consumer = session.createConsumer(topic);
    consumer.setMessageListener(onMessage);
    consumers[placeId] = consumer;

}


function unsubscribe(placeId) {

    var consumer = consumers[placeId];

    if (consumer) {
        consumer.close(function () {});
        delete consumers[placeId];
    }
}


function onMessage(message) {

    stat.addCount();

    if (message.getString("entryNumber") == "90001") {
        return;
    }

    try {
        var keys = message.getMapNames();
        var obj = {};
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            var value = "";
            value = message.getString(key);
            obj[key] = value;
        }
        obj.cmdCode = obj.cmdCode.toUpperCase();
        if(obj.status) {
            obj.status = obj.status.toUpperCase();
        }

        MessageActionCreators.receiveMessage(obj);

        if (subscribeSuccessEnabled && obj.cmdCode == "BC") {
            handleSuccess(obj);
        }

    } catch (e) {
        alert(e.message);
    }
}

function handleSuccess(obj) {
    var name = "/topic/car.auction.success";
    var dest = session.createTopic(name);
    var producer = session.createProducer(dest);

    var textMsg = session.createTextMessage("Success Record Message");
    textMsg.setStringProperty("clientID", clientID);
    textMsg.setStringProperty("datetime", NwaaDemoUtils.getTodayStrHyphen());
    textMsg.setStringProperty("timestamp", new Date().getTime().toString());
    textMsg.setStringProperty("auctionID", obj.auctionID);
    textMsg.setStringProperty("placeID", obj.placeID);
    textMsg.setStringProperty("channel", obj.channel);
    textMsg.setStringProperty("entryNumber", obj.entryNumber);

    var future = producer.send(textMsg, function () {
        if (future.exception) {
            alert(future.exception);
        }
    });

    producer.close();
}

function onSuccessMessage(message) {
    var obj = {};
    obj.datetime = message.getStringProperty("datetime");
    obj.auctionID = message.getStringProperty("auctionID");
    obj.placeID = message.getStringProperty("placeID");
    obj.channel = message.getStringProperty("channel");
    obj.entryNumber = message.getStringProperty("entryNumber");
    obj.elapsedMs = new Date().getTime() - parseInt(message.getStringProperty("timestamp"));
    successList.add(obj);
}

var subscribeSuccessEnabled = false;

function subscribeSuccess() {
    var topic = session.createTopic("/topic/car.auction.success");
    var consumer = session.createConsumer(topic, "clientID='" + clientID + "'");
    consumer.setMessageListener(onSuccessMessage);
    subscribeSuccessEnabled = true;
}

function installForm() {
    var form = document.forms[0];
    form.onsubmit = function (e) {
        e.preventDefault()
    };
    form.elements['set'].onclick = function () {
        var rate = form.elements['rate'].value || 100;
        sendRateCommand(rate);
    };
}

function connectionStarted(callback) {
    stat.start();
    callback();
}

function sendRateCommand(value) {
    // Your code here
}

function beginConnection(url, username, password, callback) {
    if (connection) {
        connectionStarted(callback);
    } else {
        var factory = new JmsConnectionFactory(url);

        var credentials = new PasswordAuthentication(username, password);

        var basicHandler = new BasicChallengeHandler();
        basicHandler.loginHandler = function (callback) {
            callback(credentials);
        };

        factory.getWebSocketFactory().setChallengeHandler(basicHandler);
        factory.getWebSocketFactory().setDefaultConnectTimeout(30000);

        var future = factory.createConnection(function () {
            try {
                connection = future.getValue();
                connection.setExceptionListener(function (e) {
                    if (window.console) {
                        console.log(e.message);
                    }
                });

                session = connection.createSession(false, Session.AUTO_ACKNOWLEDGE);
                nwaa.session = session;
                
                connection.start(function () {
                    connectionStarted(callback);
                });
            } catch (e) {
                alert(e.message);
            }
        });

    }
}


function resetStat() {
    stat.reset();
}


setInterval(function () {
    stat.updateStat();
}, 1000);


var nwaa = {};
window.nwaa = nwaa;
nwaa.subscribe = subscribe;
nwaa.unsubscribe = unsubscribe;
nwaa.subscribeSuccess = subscribeSuccess;
nwaa.initChannel = initChannel;
nwaa.installForm = installForm;
nwaa.beginConnection = beginConnection;
nwaa.resetStat = resetStat;
nwaa.WebsocketUrl = NwaaDemoConstants.WebsocketUrl;
nwaa.createPlaceInfoFileUrl = NwaaDemoViewHelper.createPlaceInfoFileUrl;
nwaa.getRequestParameters = NwaaDemoViewHelper.getRequestParameters;
