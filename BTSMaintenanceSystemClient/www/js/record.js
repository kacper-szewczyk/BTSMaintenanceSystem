var recordData;
$(document).ready(function() {
    var SearchModule = (function () {
        checkDatabase();
        initializeVariablesWithoutChanging();
        initializeRecordPage();
        return {
            init: function () {

                $("#smsEntryButton").click(function(){
                    sendEntrySms();
                });

                $("#smsExitButton").click(function(){
                    sendExitSms();
                });

                $("#smsAlarmButton").click(function(){
                    sendAlarmSms();
                });

                $("#navButton").click(function(){
                    navigate();
                });

                $("#callButton").click(function(){
                    makeCall();
                });
            }

        };
    })();
    SearchModule.init();
});

function sendEntrySms() {
    getTelephoneNumberWithoutChanging();
    getEntryTextWithoutChanging();
    var messageToSend = fillMessageWithData(entryMessage);
    sendSms(telephoneNumber,messageToSend);
    alert('Wysłano sms o treści: '.concat(messageToSend));
}


function sendExitSms() {
    getTelephoneNumberWithoutChanging();
    getExitTextWithoutChanging();
    var messageToSend = fillMessageWithData(exitMessage);
    sendSms(telephoneNumber,messageToSend);
    alert('Wysłano sms o treści: '.concat(messageToSend));
}


function sendAlarmSms() {
    getTelephoneNumberWithoutChanging();
    getAlarmTextWithoutChanging();
    var messageToSend = fillMessageWithData(alarmMessage);
    sendSms(telephoneNumber,messageToSend);
    alert('Wysłano sms o treści: '.concat(messageToSend));
}

function navigate() {
    alert("Not implemented in current version");
}

function makeCall() {
    alert("Not implemented in current version");
}

function fillMessageWithData(message) {
    console.log(actualRecord);
    message = replaceElem(message,tableOfMapping[0], actualRecord.nrStacji);
    message = replaceElem(message,tableOfMapping[1], actualRecord.nrNetWorks);
    message = replaceElem(message,tableOfMapping[2], actualRecord.nrPTC);
    message = replaceElem(message,tableOfMapping[3], actualRecord.nrPTK);
    return message;
}