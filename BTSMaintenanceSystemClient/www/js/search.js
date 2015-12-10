/**
 *
 */
$(document).ready(function() {
    var SearchModule = (function () {

        var state = 0,
            $navigation;
        return {
            init: function () {
                $navigation = $('#popupMenuHandler');
                var self = this;
                console.log($navigation);
                $navigation.click(function () {
                    alert('sdfsdf');
                    self.openHamburger();

                });

                $('.filterElements a').click(function() {
                    var type = $(this).data('type');
                    console.log($(this));
                    self.chooseNavElement(type)
                });

            },
            openHamburger: function () {
                state = 1;
                alert('test');
            },
            chooseNavElement : function(type) {
                if (type === null) {
                    return;
                }
                alert('Clicked on element '+ type );
            }
        };
    })();
    console.log(SearchModule);
    SearchModule.init();
});


function callAnotherPage() {
    console.log("callAnotherPage");
    window.location = "html/search.html";
}

function updateHeader(url) {
    var website = "search.html";
    var index = url.indexOf(website);

    return url.substring(index + website.length, url.length);
}
//myObject = updateHeader.call(myObject, "search.html#12");     // Will return 20
