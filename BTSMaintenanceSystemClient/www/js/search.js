/**
 *
 */



$(document).ready(function() {
    var SearchModule = (function () {

        var state = 0,
            searchPhrase = "",
            $navigation,
            db = null;
        return {
            init: function () {
                //db = window.sqlitePlugin.openDatabase({name: "base.db"});
                $navigation = $('#popupMenuHandlerDiv');
                var self = this;
                console.log($navigation);
                $navigation.click(function () {
                    self.openDialogBox();

                });
                $('.filterElements a').click(function() {
                    var type = $(this).data('type');
                    self.chooseNavElement(type)
                });
                $('#navigation .close').click(function() {
                    self.closeDialogBox();
                });
                $('#navigation #nameOfStation').click(function() {
                    self.updateHeader('Nazwa stacji');
                });
                $('#navigation #nameOfPTC').click(function() {
                    self.updateHeader('Nazwa PTC');
                });
                $('#searchIcoDiv').click(function() {
                    searchPhrase = $('#keyWord').val();
                    alert(searchPhrase);
                    self.printFoundItems(searchPhrase, 0);
                });


            },
            openDialogBox: function () {
                if (state === 1) {
                    state = 0;
                    $('#navigation').fadeOut();
                } else {
                    state = 1;
                    $('#navigation').fadeIn();
                }


            },
            closeDialogBox: function () {
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
            },
            updateHeader: function(headerName) {
                $('#search_parameter').html(headerName);
                self.printFoundItems(searchPhrase);
                $('#navigation').fadeOut();
                state = 0;
            },
            printFoundItems: function(searchPhrase, filteringElem) {
                var elem = document.getElementsByClassName('.wrapper');
                if(elem != null){
                    $('.wrapper #tableId').unwrap();
                    $('#tableId').remove();
                }
                /*var records = getRecordsFromDatabase(searchPhrase, filteringElem, db);*/
                var records = ["Kosik1","Kosik2","Kosik3","Kosik4","Kosik5","Kosik6"];
                var tableText = createTableOfRecords(records);
                $('#data_id').append(tableText);

            }

        };
    })();
    SearchModule.init();
});

function callAnotherPage() {
    console.log("callAnotherPage");
    window.location = "html/search.html";
}

function callRecordPage(id) {
    console.log("callAnotherPage");
    window.location = "record.html#"+id;
}

//myObject = updateHeader.call(myObject, "search.html#12");     // Will return 20
