

function getRecordsFromDatabase(searchPhrase, filteringElem) {
    var records = ["1", "2", "3", "4", "5"];
    return records;
}
function createTableOfRecords(records) {
    var recordsText = createInvocation();
    var record = ["1","2","3asflkj","4","5","6"];
    recordsText = recordsText + createRecord(record) +
        createClosure();
    return recordsText;
}

function createRecord(record) {
    return '<tr><td><button id="record" onclick="callRecordPage()">' +
        '<div id="imageDiv"><img src="../img/towericon.gif" id="towerIco">' +
        '<div id="paramsId">' +
        '<a align="left"> Miasto: </a><b align="right">' + record[0] + '</b><br>' +
        '<a align="left"> Ulica: </a><b align="right">' + record[1] + '</b><br>' +
        '<a align="left"> Koordynaty x: </a><b align="right">' + record[2] + '</b><br>' +
        '<a align="left"> Koordynaty y: </a><b align="right">' + record[3] + '</b><br>' +
        '<a align="left"> Nazwa PTC: </a><b align="right">' + record[4] + '</b><br>' +
        '<a align="left"> Nazwa PTK: </a><b align="right">' + record[5] + '</b><br>';
}
function createInvocation() {
    return '<table class="table" cellspacing="0" width="100%" id="tableId">' +
        '<thead><tr><th><strong>Znalezione rekordy</strong></th></tr>' +
        '</thead><tbody id="recordsTable">';
}

function createClosure() {
    return '</div></div></button></td></tr></tbody></table>';
}