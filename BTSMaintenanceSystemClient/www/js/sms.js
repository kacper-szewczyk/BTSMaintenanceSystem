$(document).ready(function() {
    var SearchModule = (function () {

        var state = 0;
        return {
            init: function () {
                document.getElementById("telephoneNumber").innerHTML = "+48693112193";
                //document.getElementById("telephoneNumber").innerHTML = "+48693948562";
                $("#editNumberButton").click(function(){
                    alert("Nie zmienisz numeru kosika ");

                });

                $("#lookUpButton").click(function(){
                    alert("Nie wiem co to miało robić");
                    var telephoneNumber = document.getElementById('telephoneNumber').innerHTML;
                    telephoneNumber = reduceWhitespaces(telephoneNumber);
                    var message = document.getElementById('message').innerHTML;
                    console.log(message);
                    sendSms(telephoneNumber,message);
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
    if(SMS) {
        SMS.sendSMS(number, message, function(){}, function(){});
    }
}