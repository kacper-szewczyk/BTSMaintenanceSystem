$(document).ready(function() {
    var SearchModule = (function () {

        var typeOfMessage = 1;
        checkDatabase();
        return {
            init: function () {
                document.getElementById("telephoneNumber").value = "48693112193";
                //document.getElementById("telephoneNumber").innerHTML = "+48693948562";
                document.getElementById('message').value = "Wchodzę na stację";
                $("#editNumberButton").click(function(){
                    var value = document.getElementById("telephoneNumber").value;
                    if( value.length != 11 ){
                        alert("Zły numer");
                    }
                    else {
                        db = window.openDatabase("SmsDB", "1.0", "Smses", 200000);
                        db.transaction(updateRecord(value,4), errorCB());
                    }
                });

                $("#lookUpButton").click(function(){
                    var telephoneNumber = document.getElementById('telephoneNumber').value;
                    telephoneNumber = "+".concat(replaceElem(telephoneNumber," ", ""));
                    var message = document.getElementById('message').value;
                    sendSms(telephoneNumber,message);
                });

                $("#typeOfMessageSelect").change(function () {
                    $( "#typeOfMessageSelect option:selected").each(function() {
                        switch($(this).text()) {
                            case "Wejściówka":
                                var row = getEntryText();
                                document.getElementById('message').value = row.sentence;
                                typeOfMessage = 1;
                                break;
                            case "Wyjściówka":
                                document.getElementById('message').value = getExitText();
                                typeOfMessage = 2;
                                break;
                            case "Alarm":
                                document.getElementById('message').value = getAlarmText();
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
                                console.log($(this).text());
                                options.value =
                                    options.value.concat(' ', tableOfMapping[0]);
                                break;
                            case 'Numer NetWorks':
                                console.log($(this).text());
                                options.value =
                                    options.value.concat(' ', tableOfMapping[1]);
                                $(this).selected = false;
                                //options.selectedIndex = 0;
                                break;
                            case 'Numer PTC':
                                console.log($(this).text());
                                options.value =
                                    options.value.concat(' ', tableOfMapping[2]);
                               // $(this).selected = false;
                                break;
                            case 'Numer PTK':
                                console.log($(this).text());
                                options.value =
                                    options.value.concat(' ', tableOfMapping[3]);
                               // $(this).selected = false;
                                break;
                        }
                        document.getElementById('changingText').text = $(this).text();
                    });
                });

                $('#saveSmsButton').click(function(){
                    updateMessage(typeOfMessage);
                });

            }
        };

    })();
    SearchModule.init();
});

function updateMessage(typeOfMessage){
    var message = document.getElementById('message').value;
    db = window.openDatabase("SmsDB", "1.0", "Smses", 200000);
    db.transaction(updateRecord(message,typeOfMessage), errorCB());
}

function updateRecord(tx, message,typeOfMessage){
    var sentence = "UPDATE ".concat(nameOfDatabase, " SET sentence = '", message, "' WHERE id = ", typeOfMessage);
    tx.executeSql(sentence);
}