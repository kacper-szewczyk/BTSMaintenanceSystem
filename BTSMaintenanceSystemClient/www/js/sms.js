$(document).ready(function() {
    var SearchModule = (function () {

        var state = 0;
        return {
            init: function () {
                document.getElementById("telephoneNumber").innerHTML = "505 125 640";

                $("#editNumberButton").click(function(){
                    alert("Nie zmienisz numeru kosika");
                });

                $("#lookUpButton").click(function(){
                    alert("Nie wiem co to miało robić");
                });

            }
        };
    })();
    SearchModule.init();
});