var typeOfMessage = 1;

$(document).ready(function() {
    var SearchModule = (function () {
        //cleanDatabase();
        //checkDatabase();
        initializeDatabase();
        //checkDatabase();
        initializeVariables();
        return {
            init: function () {
                $("#editNumberButton").click(function(){
                    var value = document.getElementById("telephoneNumber").value;
                    if( value.length != 11 ){
                        alert("Zły numer");
                    }
                    else {
                        db = window.openDatabase("SmsDB", "1.0", "Smses", 200000);
                        db.transaction(updateNumber, errorCB);
                    }
                });

                $("#lookUpButton").click(function(){
                    alert(document.getElementById('message').value);
                });

                $("#typeOfMessageSelect").change(function () {
                    $( "#typeOfMessageSelect option:selected").each(function() {
                        switch($(this).text()) {
                            case "Wejściówka":
                                getEntryText();
                                document.getElementById('message').value = entryMessage;
                                typeOfMessage = 1;
                                break;
                            case "Wyjściówka":
                                getExitText();
                                document.getElementById('message').value = exitMessage;
                                typeOfMessage = 2;
                                break;
                            case "Alarm":
                                getAlarmText();
                                document.getElementById('message').value = alarmMessage;
                                typeOfMessage = 3;
                                break;
                        }
                    });
                });

                $("#typeOfTemplateSelect").change(function () {
                    var options = document.getElementById('message');
                    $( "#typeOfTemplateSelect option:selected").each(function() {
                        switch($(this).text()) {
                            case 'Numer stacji':
                                options.value =
                                    options.value.concat(' ', tableOfMapping[0]);
                                break;
                            case 'Numer NetWorks':
                                options.value =
                                    options.value.concat(' ', tableOfMapping[1]);
                                break;
                            case 'Numer PTC':
                                options.value =
                                    options.value.concat(' ', tableOfMapping[2]);
                                break;
                            case 'Numer PTK':
                                options.value =
                                    options.value.concat(' ', tableOfMapping[3]);
                                break;
                        }
                        document.getElementById('changingText').text = $(this).text();
                    });
                });

                $('#saveSmsButton').click(function(){
                    updateMessage();
                });

            }
        };

    })();
    SearchModule.init();
});

function updateMessage(){

    db = window.openDatabase(nameOfDatabaseFile, "1.0", "Smses", 200000);
    db.transaction(updateRecord, errorCB);
}

function updateRecord(tx){
    var message = document.getElementById('message').value;
    var sentence = "UPDATE ".concat(nameOfDatabase, " SET sentence = '", message, "' WHERE id = ", typeOfMessage);
    console.log(sentence);
    tx.executeSql(sentence, [],querySuccess,errorCB);
}

function updateNumber(tx){
    var value = document.getElementById("telephoneNumber").value;
    var sentence = "UPDATE ".concat(nameOfDatabase, " SET sentence = '", value, "' WHERE id = ", 4);
    tx.executeSql(sentence, [],querySuccess,errorCB);
}