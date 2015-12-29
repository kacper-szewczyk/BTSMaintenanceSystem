var DEFAULT_SIZE = 5000000; // max to avoid popup in safari/ios

function getRecordsFromDatabase(searchPhrase, filteringElem,db) {
   /* var db = sqlitePlugin.openDatabase("../../database/base.db", "1.0", "Bts database", DEFAULT_SIZE);

    //openDatabase(, '1.0', 'Test DB', 2 * 1024 * 1024);
    db.transaction(function (tx) {
        tx.executeSql('SELECT * FROM Bts WHERE id="2"',[], function (tx, results) {
            console.log("results.rows.item(0).uppertext: " + results.rows.item(1).uppertext);
        });
    });
    require(['cordova-sqlite-plugin.SQLite'], function(SQLite){
        console.log("Here");
        var sqlite = new SQLite('example');

        sqlite.open(function(err) {
            if (err) throw err;
            sqlite.query('SELECT ? + ? AS solution', [2, 3], function(err, res) {
                if (err) throw err;
                console.log(res.rows[0].solution);
            });
        });
    });*/


    //var db = sqlitePlugin.openDatabase("../../database/base.db","1.0","Bts database",null);
    //db.openDB();
    // Run a query without reading the results
    //db.run("LOAD ;
    // Insert two rows: (1,111) and (2,222)
    //db.run("INSERT INTO test VALUES (?,?), (?,?)", [1,111,2,222]);
    console.log("here");
    var values = require(window.sqlitePlugin.openDatabase("base.db", "1.0", "BTS database", -1), function(tx2){
        console.log("here2");
        tx2.transaction(function (tx) {
            tx.executeSql('CREATE TABLE IF NOT EXISTS LOGS (id unique, log)');
            tx.executeSql('INSERT INTO LOGS (id, log) VALUES (1, "foobar")');
            tx.executeSql('INSERT INTO LOGS (id, log) VALUES (2, "logmsg")');
        });

        tx2.transaction(function (tx) {
            tx.executeSql('SELECT * FROM LOGS', [], function (tx, results) {
                var len = results.rows.length, i;
                msg = "<p>Found rows: " + len + "</p>";
                document.querySelector('#status').innerHTML +=  msg;

                for (i = 0; i < len; i++){
                    alert(results.rows.item(i).log );
                }

            }, null);
        });
        return tx2.transaction(function(tx) {
            console.log("here3");
            return tx.executeSql("SELECT * FROM Bts WHERE id=2;", [], function (res) {
                console.log('got stringlength: ' + res.rows.item(1).stringlength);
                values = [res.rows.item(1), res.rows.item(2), res.rows.item(3), res.rows.item(4), res.rows.item(5), res.rows.item(6)];
                return values;
            }, function(error) {
                console.log('SELECT error: ' + error.message);
            });
        });
    });



    return values;
}
function createTableOfRecords(record) {
    var recordsText = createInvocation();
    //var record = ["1","2","3asflkj","4","5","6"];
    recordsText = recordsText + createRowWithRecord(record);
    recordsText = recordsText + createRowWithRecord(record);
    recordsText = recordsText + createRowWithRecord(record);
    recordsText = recordsText + createRowWithRecord(record);
    recordsText = recordsText + createRowWithRecord(record);
    recordsText = recordsText + createRowWithRecord(record);
    recordsText = recordsText + createRowWithRecord(record);
    recordsText = recordsText + createRowWithRecord(record);


    recordsText = recordsText + createClosure();
    return recordsText;
}

function createRowWithRecord(record) {
    var id = 2;
    return '<tr><td><button id="record" onclick="callRecordPage(id)">'
        + createRecord(record) +  '</div></div></button>';
}
function createRecord(record) {
    return '<div id="imageDiv"><img src="../img/towericon.gif" id="towerIco">' +
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
    return '</td></tr></tbody></table>';
}

function createMoreInfo(record) {
    return '<div id="extraParamsId">' +
        '<a align="left"> Nrnet: </a><b>' + record[0] + '</b><br>' +
        '<a align="left"> Właściciel: </a><b>' + record[1] + '</b><br>' +
        '<a align="left"> Wysokość NPM: </a><b>' + record[2] + '</b><br>' +
        '<a align="left"> Nazwa TPK: </a><b>' + record[3] + '</b><br>' +
        '<a align="left"> Region: </a><b>' + record[4] + '</b><br>' +
        '<a align="left"> Kod pocztowy: </a><b>' + record[5] + '</b><br>' +
        '<a align="left"> Województwo: </a><b>' + record[4] + '</b><br>' +
        '<a align="left"> Wysokość budynku </a><b>' + record[5] + '</b><br>' +
        '<a align="left"> Nazwa: </a><b>' + record[4] + '</b><br>';
}
