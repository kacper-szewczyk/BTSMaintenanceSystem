$(document).ready(function() {
    var SearchModule = (function () {

        checkDatabase();
        return {
            init: function () {
                var record = ["1","2","3asflkj","4","5","6"];
                var record2 = ["1","2","3asflkj","4","5","6","7","8","Kosik"]
                $('#bannerId').append(createRecord(record));
                $('#main').append(createMoreInfo(record2));

            }
        };
    })();
    SearchModule.init();
});

function sendEntrySms() {
    getTelephoneNumber();
    getEntryText();
    sendSms(telephoneNumber,entryMessage);
}


function sendExitSms() {
    getTelephoneNumber();
    getExitText();
    sendSms(telephoneNumber,exitMessage);
}


function sendAlarmSms() {
    getTelephoneNumber();
    getAlarmText();
    sendSms(telephoneNumber,alarmMessage);
}

function navigate() {
    alert("Not implemented in current version");
}

function makeCall() {
    alert("Not implemented in current version");
}

