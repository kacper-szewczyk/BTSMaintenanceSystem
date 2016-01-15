$(document).ready(function() {
    var SearchModule = (function () {

        var state = 0;
        return {
            init: function () {
                document.getElementById("telephoneNumber").value = "48693112193";
                //document.getElementById("telephoneNumber").innerHTML = "+48693948562";
                document.getElementById('message').value = "Gejem się jest tylko dwa razy";
                $("#editNumberButton").click(function(){
                    var value = document.getElementById("telephoneNumber").value;
                    if( value.length != 11 ){
                        alert("Zły numer");
                    }
                });

                $("#lookUpButton").click(function(){
                    var telephoneNumber = document.getElementById('telephoneNumber').innerHTML;
                    telephoneNumber = reduceWhitespaces(telephoneNumber);
                    telephoneNumber = '+' + reduceWhitespaces(telephoneNumber);
                    var message = document.getElementById('message').value;
                    console.log(message);
                    sendSms(telephoneNumber,message);
                });

                $("#typeOfMessageSelect").change(function () {
                    $( "#typeOfMessageSelect option:selected").each(function() {
                        switch($(this).text()) {
                            case "Wejściówka":
                                document.getElementById('message').value = getEntryText();
                                break;
                            case "Wyjściówka":
                                document.getElementById('message').value = getExitText();
                                break;
                            case "Alarm":
                                document.getElementById('message').value = getAlarmText();
                                break;
                        }
                    });
                });
            }
        };
    })();
    SearchModule.init();
});

function reduceWhitespaces(number) {
    var oldNumber = "111";
    while(oldNumber.localeCompare(number) != 0){
        oldNumber = number;
        number = oldNumber.replace(" ","");
    }
    return number;
}

function sendSms(number, message) {
    if(SMS) {
        SMS.sendSMS(number, message, function(){}, function(){});
    }
}

function getEntryText() {
    return "Gejem się jest tylko dwa razy";
}

function getExitText() {
    return "Raz dwa trzy Kosik patrzy";
}

function getAlarmText() {
    return "No Jarosław";
}