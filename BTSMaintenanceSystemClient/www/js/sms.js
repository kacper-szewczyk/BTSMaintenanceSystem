$(document).ready(function() {
    var SearchModule = (function () {

        var state = 0;
        return {
            init: function () {
                document.getElementById("telephoneNumber").innerHTML = "505 125 640";
            }
        };
    })();
    SearchModule.init();
});