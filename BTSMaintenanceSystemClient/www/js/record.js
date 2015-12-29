$(document).ready(function() {
    var SearchModule = (function () {

        var state = 0,
            db = null;
        return {
            init: function () {
                //db = window.sqlitePlugin.openDatabase({name: "base.db"});
                var self = this;
                var record = ["1","2","3asflkj","4","5","6"];
                var record2 = ["1","2","3asflkj","4","5","6","7","8","Kosik"]
                $('#bannerId').append(createRecord(record));
                $('#main').append(createMoreInfo(record2));

            }
        };
    })();
    SearchModule.init();
});

function sendSms() {

}

function navigate() {

}

function makeCall() {

}

