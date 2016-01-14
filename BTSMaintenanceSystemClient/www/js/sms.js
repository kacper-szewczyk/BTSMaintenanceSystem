$(document).ready(function() {
    var SearchModule = (function () {

        var state = 0;
        return {
            init: function () {
                document.getElementById("telephoneNumber").innerHTML = "693948562";

                $("#editNumberButton").click(function(){
                    alert("Nie zmienisz numeru kosika ");

                });

                $("#lookUpButton").click(function(){
                    alert("Nie wiem co to miało robić");
                    var telephoneNumber = document.getElementById('telephoneNumber').innerHTML;
                    telephoneNumber = reduceWhitespaces(telephoneNumber);
                    sendSms(telephoneNumber,"No jarosław");
                });
                
                $("#typeOfMessageSelect").change(function () {
                    $( "#typeOfMessageSelect option:selected").each(function() {
                        alert($(this).text());
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
    //CONFIGURATION
    var options = {
        replaceLineBreaks: false, // true to replace \n by a new line, false by default
        android: {
            intent: 'INTENT'  // send SMS with the native android SMS messaging
            //intent: '' // send SMS without open any other app
        }
    };

    var success = function () { alert('Message sent successfully'); };
    var error = function (e) { alert('Message Failed:' + e); };
    sms.send(number, message, options, success, error);
}