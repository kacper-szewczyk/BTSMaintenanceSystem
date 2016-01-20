/**
 *
 */
$(document).ready(function() {

    var SearchModule = (function () {
        initializeDatabaseWithRecords();
        var state = 0,
            searchPhrase = "",
            filteringElem = "",
            $navigation;
        return {
            init: function () {
                //db = window.sqlitePlugin.openDatabase({name: "base.db"});
                $navigation = $('#popupMenuHandlerDiv');
                var self = this;
                $navigation.click(function () {
                    self.openDialogBox();

                });
                $('#navigation .close').click(function() {
                    self.closeDialogBox();
                });
                $('#navigation #nameOfStation').click(function() {
                    self.updateHeader('Nazwa stacji');
                    filteringElem = 'nazwaStacji';
                });
                $('#navigation #nameOfPTC').click(function() {
                    self.updateHeader('Nazwa PTC');
                    filteringElem = 'nazwaPTC';
                });
                $('#navigation #city').click(function() {
                    self.updateHeader('Miasto');
                    filteringElem = 'miasto';
                });
                $('#navigation #region').click(function() {
                    self.updateHeader('Region');
                    filteringElem = 'region';
                });
                $('#searchIcoDiv').click(function() {
                    searchPhrase = $('#keyWord').val().toLowerCase();
                    self.printFoundItems();
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
            updateHeader: function(headerName) {
                $('#search_parameter').html(headerName);
                $('#navigation').fadeOut();
                state = 0;
            },
            printFoundItems: function() {
                var elem = document.getElementsByClassName('.wrapper');
                if(elem != null){
                    $('.wrapper #tableId').unwrap();
                    $('#tableId').remove();
                }
                getRecordsFromDatabase(searchPhrase,filteringElem);
                /*var tableText = createTableOfRecords(records);
                $('#data_id').append(tableText);*/
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
    console.log(id);
    window.location = "record.html#"+id;
}

//myObject = updateHeader.call(myObject, "search.html#12");     // Will return 20
