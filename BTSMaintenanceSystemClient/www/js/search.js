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
                $('#navigation .nameOfStation').click(function() {
                    self.updateHeader('Nazwa stacji');
                });
                $('#navigation .nameOfPTC').click(function() {
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
                var records = getRecordsFromDatabase(searchPhrase, filteringElem);
                var tableText = createTableOfRecords(records);
                console.log(tableText);
                $('#data_id').append(tableText);
               /* var div = document.createElement('div');
                div.id = "data_id";
                div.className = 'wrapper';
                div.appendChild(document. tableText);
                document.body.appendChild(div);*/
/*
                var myTableDiv = document.getElementById("tableId")
                var table = document.createElement('TABLE')
                var tableBody = document.createElement('TBODY')

                table.border = '1'
                table.appendChild(tableBody);

                var tr = document.createElement('TR');
                tableBody.appendChild(tr);
                for (i = 0; i < 2; i++) {
                    var th = document.createElement('TH')
                    th.width = '75';
                    th.appendChild(document.createTextNode("Kosik"));
                    tr.appendChild(th);

                }
                for (i = 0; i < 2; i++) {
                    var tr = document.createElement('TR');
                    for (j = 0; j < 2; j++) {
                        var td = document.createElement('TD')
                        td.appendChild(document.createTextNode("Kosik"));
                        tr.appendChild(td)
                    }
                    tableBody.appendChild(tr);
                }*/

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
    var recordsText = '<table class="table" cellspacing="0" width="100%" id="tableId">' +
        '<thead><tr><th><strong>Znalezione rekordy</strong></th></tr>' +
        '</thead><tbody id="recordsTable"><tr>' +
        '<td><button id="record" onclick="callRecordPage()">' +
        '<div id="imageDiv"><img src="../img/towericon.gif" id="towerIco">' +
        '<div id="paramsId"><a> Kosik: </a>' + records[0] + '<br>' +
        '<a> Kosik: </a>' + records[1] + '<br>' +
        '<a> Kosik: </a>' + records[2] + '<br>' +
        '<a> Kosik: </a>' + records[3] + '<br>' +
        '<a> Kosik: </a>' + records[4] + '<br>' +
        '</div></div></button></td></tr></tbody></table>';
    return recordsText;
}
//myObject = updateHeader.call(myObject, "search.html#12");     // Will return 20
