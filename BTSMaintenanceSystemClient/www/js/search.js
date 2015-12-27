/**
 *
 */
$(document).ready(function() {
    var SearchModule = (function () {

        var state = 0,
            searchPhrase = "",
            $navigation;
        return {
            init: function () {
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
                    console.log("Here");
                    $('.wrapper #tableId').unwrap();
                    $('#tableId').remove();
                }
                var records = getRecordsFromDatabase(searchPhrase, filteringElem);
                var tableText = createTableOfRecords(records);
                $('#data_id').append(tableText);

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

function callRecordPage() {
    console.log("callAnotherPage");
    window.location = "record.html";
}


function getRecordsFromDatabase(searchPhrase, filteringElem) {
    var records = ["1", "2", "3", "4", "5"];
    return records;
}
function createTableOfRecords(records) {
    var recordsText = createInvocation();
    var record = ["1","2","3","4","5","6"];
    recordsText = recordsText + createRecord(record) +
               createClosure();
    return recordsText;
}

function createRecord(record) {
    return '<tr><td><button id="record" onclick="callRecordPage()">' +
        '<div id="imageDiv"><img src="../img/towericon.gif" id="towerIco">' +
        '<div id="paramsId">' +
        '<a> Miasto: </a>' + record[0] + '<br>' +
        '<a> Ulica: </a>' + record[1] + '<br>' +
        '<a> Koordynaty x: </a>' + record[2] + '<br>' +
        '<a> Koordynaty y: </a>' + record[3] + '<br>' +
        '<a> Nazwa PTC: </a>' + record[4] + '<br>' +
        '<a> Nazwa PTK: </a>' + record[5] + '<br>';
}
function createInvocation() {
    return '<table class="table" cellspacing="0" width="100%" id="tableId">' +
    '<thead><tr><th><strong>Znalezione rekordy</strong></th></tr>' +
    '</thead><tbody id="recordsTable">';
}

function createClosure() {
    return '</div></div></button></td></tr></tbody></table>';
}
//myObject = updateHeader.call(myObject, "search.html#12");     // Will return 20
