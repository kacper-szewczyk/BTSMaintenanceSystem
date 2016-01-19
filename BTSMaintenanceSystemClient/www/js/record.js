var recordData;
$(document).ready(function() {
    var SearchModule = (function () {
        checkDatabase();
        initializeVariables();
        return {
            init: function () {
                var record = ["1","2","3asflkj","4","5","6"];
                var record2 = ["1","2","3asflkj","4","5","6","7","8","Kosik"]
                recordData = record.concat(record2);
                $('#bannerId').append(createRecord(record));
                $('#main').append(createMoreInfo(record2));

                $("#smsEntryButton").click(function(){
                    sendEntrySms();
                });

                $("#smsExitButton").click(function(){
                    sendExitSms();
                });

                $("#smsAlarmButton").click(function(){
                    sendEntrySms();
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
    alert(messageToSend);
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
    message = replaceElem(message,tableOfMapping[0],'stacja');
    message = replaceElem(message,tableOfMapping[1],'netWorks');
    message = replaceElem(message,tableOfMapping[2],'ptc');
    message = replaceElem(message,tableOfMapping[3],'ptk');
    return message;
}