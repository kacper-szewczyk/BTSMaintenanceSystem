
var db;
var DEFAULT_SIZE = 5000000; // max to avoid popup in safari/ios
var nameOfDatabaseFile = "recordDB";
var nameOfDatabase = "Bts";
var records;
var actualRecord;

function getRecordsFromDatabase(searchPhrase, filteringElem) {
    var searchSentence = searchPhrase;
    var filterElem = filteringElem;
    db = window.openDatabase(nameOfDatabaseFile, "1.0", "Records", DEFAULT_SIZE);
    db.transaction(function (tx) {
        var sentence = 'SELECT * FROM '.concat(nameOfDatabase,' WHERE ', filterElem,"='",searchSentence,"';");
        //var sentence = 'SELECT * FROM '.concat(nameOfDatabase,' WHERE id=1;');
        console.log(sentence);
        tx.executeSql(sentence, [], function (tx, results) {
            var len = results.rows;
            msg = "Found rows: " + len;
            console.log(msg);
            records = results.rows;
            for(var i=0;i<len;i++){
                console.log(records.rows.item(i));
            }
            var tableText = createTableOfRecords(records);
            $('#data_id').append(tableText);
        });
    });

}
function createTableOfRecords(records) {
    var recordsText = createInvocation();
    var record;
    for(var i=0; i<records.length; i++){
        record = records.item(i);
        recordsText = recordsText + createRowWithRecord(record);
    }
    recordsText = recordsText + createClosure();
    return recordsText;
}

function createRowWithRecord(record) {
    var sentence = '<tr><td><button class="record" onclick="callRecordPage('+record.id+')">'
        + createRecord(record) +  '</div></div></button>';
    return sentence;
}
function createRecord(record) {
    var sentence;
    sentence = '<div class="imageDiv"><img src=';
    if(record.typ.localeCompare("komin")){
        sentence = sentence.concat('"../img/kominico.jpg" class="ico">')
    }else if(record.typ.localeCompare("kosciol")){
        sentence = sentence.concat('"../img/sacrumico.jpg" class="ico">')
    }else if(record.typ.localeCompare("budynek")){
        sentence = sentence.concat('"../img/indoorico.jpg" class="ico">')
    }

    sentence = sentence.concat('<div class="paramsId">',
        '<a align="left"> Miasto: </a><b align="right">',record.miasto,'</b><br>',
        '<a align="left"> Ulica: </a><b align="right">',record.ulica,'</b><br>',
        '<a align="left"> Koordynaty x: </a><b align="right">',record.wspX,'</b><br>',
        '<a align="left"> Koordynaty y: </a><b align="right">',record.wspY,'</b><br>',
        '<a align="left"> Nazwa PTC: </a><b align="right">',record.nazwaPTC,'</b><br>',
        '<a align="left"> Nazwa PTK: </a><b align="right">',record.nazwaPTK,'</b><br>');

    return sentence;
}
function createInvocation() {
    return '<table class="table" cellspacing="0" width="100%" id="tableId">' +
        '<thead><tr><th><strong>Znalezione rekordy</strong></th></tr>' +
        '</thead><tbody id="recordsTable">';
}

function createClosure() {
    return '</td></tr></tbody></table>';
}

function createMoreInfo(record) {
    return '<div class="extraParamsId">' +
        '<a align="left"> Nrnet: </a><b>' + record.nrNetWorks + '</b><br>' +
        '<a align="left"> Właściciel: </a><b>' + record.wlasciciel + '</b><br>' +
        '<a align="left"> Wysokość NPM: </a><b>' + record.wys + '</b><br>' +
        '<a align="left"> Nazwa PTK: </a><b>' + record.nazwaPTK + '</b><br>' +
        '<a align="left"> Region: </a><b>' + record.region + '</b><br>' +
        '<a align="left"> Kod pocztowy: </a><b>' + record.kodPocztowy + '</b><br>' +
        '<a align="left"> Województwo: </a><b>' + record.wojewodztwo + '</b><br>' +
        '<a align="left"> Wysokość budynku </a><b>' + record.wysBud + '</b><br>' +
        '<a align="left"> Opis stacji: </a><b>' + record.opisStacji + '</b><br>';
}


function initializeDatabaseWithRecords() {
    db = window.openDatabase(nameOfDatabaseFile, "1.0", "Records", DEFAULT_SIZE);
    db.transaction(function (tx) {
        var sentence = 'SELECT * FROM '.concat(nameOfDatabase,';');
        tx.executeSql(sentence, [], function (tx, results) {
            var len = results.rows.length;
            msg = "<p>Found rows: " + len + "</p>";
            console.log(msg);
            //records = results.rows;
            /*for(var i=0;i<len;i++){
                console.log(results.rows.item(i).id);
            }*/
        }, function(tx){
            var sentence = 'CREATE TABLE IF NOT EXISTS '.concat(nameOfDatabase);
            sentence = sentence.concat(" (id INTEGER PRIMARY KEY AUTOINCREMENT,",
                " nrStacji varchar(10),",
                " nrNetWorks varchar(10),",
                " nrPTC varchar(10),",
                " nrPTK varchar(10),",
                " wlasciciel varchar(20),",
                " nazwaStacji varchar(40),",
                " nazwaPTC varchar(40),",
                " nazwaPTK varchar(40),",
                " region varchar(15),",
                " obszar varchar(15),",
                " dataSkasowania varchar(15),",
                " ulica varchar(20),",
                " numer varchar(8),",
                " kodPocztowy varchar(20),",
                " miasto varchar(30),",
                " gmina varchar(30),",
                " powiat varchar(30),",
                " wojewodztwo varchar(30),",
                " typ varchar(30),",
                " kandydat varchar(30),",
                " wspX DOUBLE,",
                " wspY DOUBLE,",
                " wys REAL,",
                " wysBud REAL,",
                " opisDostepu varchar(50),",
                " opisStacji varchar(50),",
                " nrPlus varchar(20),",
                " nrPlay varchar(20),",
                " nrElektrowni varchar(20),",
                " dataAktualizacji DATE DEFAULT (DATETIME('now') ) );");
            tx.executeSql(sentence);
            sentence = 'INSERT INTO '.concat(nameOfDatabase,' (nrStacji, nrNetWorks, nrPTC,',
                ' nrPTK, wlasciciel, nazwaStacji, nazwaPTC, nazwaPTK, region, obszar, dataSkasowania, ulica,',
                ' numer, kodPocztowy, miasto, gmina, powiat, wojewodztwo, typ, kandydat, wspX, wspY, wys, wysBud,',
                ' opisDostepu, opisStacji, nrPlus, nrPlay, nrElektrowni, dataAktualizacji)',
                ' VALUES ("-99993", "", "",',
                ' "", "t-mobile", "magazyn ptc warszawa", "magazyn ptc warszawa", "---", "w", "", "", "Mokotowska",',
                ' "5", "11-111", "warszawa", "warszawa", "warszawa", "mazowiecki", "komin", " ", "0.0", "0.0", "0.0", "-1.0",',
                ' "", "magazyn ptc warszawa", "", "", "", "2016-01-19")',';');
            tx.executeSql(sentence);
            sentence = 'INSERT INTO '.concat(nameOfDatabase,' (nrStacji, nrNetWorks, nrPTC,',
                ' nrPTK, wlasciciel, nazwaStacji, nazwaPTC, nazwaPTK, region, obszar, dataSkasowania, ulica,',
                ' numer, kodPocztowy, miasto, gmina, powiat, wojewodztwo, typ, kandydat, wspX, wspY, wys, wysBud,',
                ' opisDostepu, opisStacji, nrPlus, nrPlay, nrElektrowni, dataAktualizacji)',
                ' VALUES ("-99992", "", "",',
                ' "", "t-mobile", "magazyn ptc katowice", "magazyn ptc katowice", "---", "k", "", "", "katowicka",',
                ' "5", "11-111", "katowice", "katowice", "katowice", "slaskie", "kosciol", " ", "0.0", "0.0", "0.0", "-1.0",',
                ' "", "magazyn ptc katowice", "", "", "", "2016-01-19")',';');
            tx.executeSql(sentence);
            sentence = 'INSERT INTO '.concat(nameOfDatabase,' (nrStacji, nrNetWorks, nrPTC,',
                ' nrPTK, wlasciciel, nazwaStacji, nazwaPTC, nazwaPTK, region, obszar, dataSkasowania, ulica,',
                ' numer, kodPocztowy, miasto, gmina, powiat, wojewodztwo, typ, kandydat, wspX, wspY, wys, wysBud,',
                ' opisDostepu, opisStacji, nrPlus, nrPlay, nrElektrowni, dataAktualizacji)',
                ' VALUES ("-99991", "", "",',
                ' "", "t-mobile", "magazyn ptc gdansk", "magazyn ptc gdansk", "---", "g", "", "", "pomorska",',
                ' "5", "11-111", "gdansk", "gdansk", "gdansk", "zachodnio-pomorskie", "budynek", " ", "0.0", "0.0", "0.0", "-1.0",',
                ' "", "magazyn ptc gdansk", "", "", "", "2016-01-19")',';');
            tx.executeSql(sentence);
            sentence = 'INSERT INTO '.concat(nameOfDatabase,' (nrStacji, nrNetWorks, nrPTC,',
                ' nrPTK, wlasciciel, nazwaStacji, nazwaPTC, nazwaPTK, region, obszar, dataSkasowania, ulica,',
                ' numer, kodPocztowy, miasto, gmina, powiat, wojewodztwo, typ, kandydat, wspX, wspY, wys, wysBud,',
                ' opisDostepu, opisStacji, nrPlus, nrPlay, nrElektrowni, dataAktualizacji)',
                ' VALUES ("-99990", "", "",',
                ' "", "t-mobile", "magazyn ptc poznan", "magazyn ptc poznan", "---", "p", "", "", "poznanska",',
                ' "5", "11-111", "poznan", "poznan", "poznan", "zachodnio-pomorskie", "budynek", " ", "0.0", "0.0", "0.0", "-1.0",',
                ' "", "magazyn ptc poznan", "", "", "", "2016-01-19")',';');
            tx.executeSql(sentence);
        });

    });
}


function initializeRecordPage() {
    var id = document.URL;
    var n = id.indexOf('#');
    id = id.substring(n+1);
    console.log(id);
    db = window.openDatabase(nameOfDatabaseFile, "1.0", "Records", DEFAULT_SIZE);
    console.log(db);
    db.transaction(function (tx) {
        var sentence = 'SELECT * FROM '.concat(nameOfDatabase,' WHERE id=',id,';');
        console.log(sentence);
        tx.executeSql(sentence, [], function (tx, results) {
            var len = results.rows;
            msg = "Found rows: " + len;
            console.log(msg);
            records = results.rows;
            actualRecord = records.item(0);
            //actualRecord = record;
            var tableText = createRecord(actualRecord);
            $('#bannerId').append(tableText);
            $('#main').append(createMoreInfo(actualRecord));
        },function(){alert("No jarosław");});
    });
}