/**
 *
 */
$(document).ready(function() {
    var SearchModule = (function () {

        var state = 0,
            $navigation;
        return {
            init: function () {
                $navigation = $('#popupMenuHandlerDiv');
                var self = this;
                console.log($navigation);
                $navigation.click(function () {
                    self.openHamburger();

                });

                $('.filterElements a').click(function() {
                    var type = $(this).data('type');
                    self.chooseNavElement(type)
                });
                $('#navigation .close').click(function() {
                    self.closeHamburger();
                });

            },
            openHamburger: function () {
                state = 1;
                $('#navigation').fadeIn();

            },
            closeHamburger: function () {
              if (state === 1) {
                  $('#navigation').fadeOut();
                  state = 0;
              }
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
