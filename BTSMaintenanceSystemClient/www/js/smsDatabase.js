
var nameOfDatabase = 'MessagesAndNumber';
var db;
var entryMessage = '';
var exitMessage = '';
var alarmMessage = '';
var telephoneNumber = "";

var nameOfDatabaseFile = 'smsDB';

var tableOfMapping = ['#Nr_Stacji','#Nr_NetWorks','#Nr_PTC','#Nr_PTK'];

function replaceElem(data, toReplace, replacer) {
    var oldData = " ";
    while(oldData.localeCompare(data) != 0){
        oldData = data;
        data = oldData.replace(toReplace,replacer);
    }
    return data;
}

function sendSms(number, message) {
    if(SMS) {
        SMS.sendSMS(number, message, function(){}, function(){});
    }
}

function cleanDatabase() {
    db = window.openDatabase(nameOfDatabaseFile, "1.0", "Smses", 200000);
    db.transaction(function (tx) {
        var sentence = 'DROP TABLE '.concat(nameOfDatabase,';');
        tx.executeSql(sentence, [], function (tx, results) {
            var len = results.rows.length, i;
            msg = "<p>Found rows: " + len + "</p>";
            console.log(msg);

            for (i = 0; i < len; i++) {
                console.log(results.rows.item(i).sentence);
            }

        }, null);
    });
}

function checkDatabase() {
    db = window.openDatabase(nameOfDatabaseFile, "1.0", "Smses", 200000);
    db.transaction(function (tx) {
        var sentence = 'SELECT * FROM '.concat(nameOfDatabase,';');
        tx.executeSql(sentence, [], function (tx, results) {
            var len = results.rows.length, i;
            msg = "<p>Found rows: " + len + "</p>";
            console.log(msg);

            for (i = 0; i < len; i++) {
                console.log(results.rows.item(i).sentence);
            }

        }, null);
    });

    //db.transaction(getElems, errorCB, successCB);
}

function initializeDatabase() {
    db = window.openDatabase(nameOfDatabaseFile, "1.0", "Smses", 200000);
    db.transaction(function (tx) {
        var sentence = 'SELECT * FROM '.concat(nameOfDatabase,';');
        tx.executeSql(sentence, [], function (tx, results) {
            var len = results.rows.length;
            msg = "<p>Found rows: " + len + "</p>";
            console.log(msg);
        }, function(tx) {
            var sentence = 'CREATE TABLE IF NOT EXISTS '.concat(nameOfDatabase);
            sentence = sentence.concat(' (id INTEGER PRIMARY KEY AUTOINCREMENT, typeOfData TEXT NOT NULL, sentence TEXT NOT NULL)',';');
            tx.executeSql(sentence);
            sentence = 'INSERT INTO '.concat(nameOfDatabase,' (typeOfData, sentence) VALUES ("Wejsciowka", "Wchodzę na stację")',';');
            tx.executeSql(sentence);
            sentence = 'INSERT INTO '.concat(nameOfDatabase,' (typeOfData, sentence) VALUES ("Wyjsciowka", "Wychodzę na stację")',';');
            tx.executeSql(sentence);
            sentence = 'INSERT INTO '.concat(nameOfDatabase,' (typeOfData, sentence) VALUES ("Alarm", "Alarm")',';');
            tx.executeSql(sentence);
            sentence = 'INSERT INTO '.concat(nameOfDatabase,' (typeOfData, sentence) VALUES ("Numer", "48693112193")',';');
            tx.executeSql(sentence);
        });

    });
}

function checkDB(tx) {
    //var sentence = 'DROP TABLE '.concat(nameOfDatabase);
    //tx.executeSql(sentence);
    var sentence = 'SELECT * FROM '.concat(nameOfDatabase,';');
    tx.executeSql(sentence,[],testDBSuccess,testDBerror);

}
function getElems(tx) {
    var sentence = 'SELECT * FROM '.concat(nameOfDatabase,';');
    tx.executeSql(sentence,[],testDBSuccess,testDBerror);
}

function initializeVariables() {
    getEntryText();
    getExitText();
    getAlarmText();
    getTelephoneNumber();
}

function defaultDB(tx) {
    //if()
    var sentence = 'CREATE TABLE IF NOT EXISTS '.concat(nameOfDatabase);
    sentence = sentence.concat(' (id INTEGER PRIMARY KEY AUTOINCREMENT, typeOfData TEXT NOT NULL, sentence TEXT NOT NULL)',';');
    tx.executeSql(sentence);
    sentence = 'INSERT INTO '.concat(nameOfDatabase,' (typeOfData, sentence) VALUES ("Wejsciowka", "Wchodzę na stację")',';');
    tx.executeSql(sentence);
    sentence = 'INSERT INTO '.concat(nameOfDatabase,' (typeOfData, sentence) VALUES ("Wyjsciowka", "Wychodzę na stację")',';');
    tx.executeSql(sentence);
    sentence = 'INSERT INTO '.concat(nameOfDatabase,' (typeOfData, sentence) VALUES ("Alarm", "Alarm")',';');
    tx.executeSql(sentence);
    sentence = 'INSERT INTO '.concat(nameOfDatabase,' (typeOfData, sentence) VALUES ("Numer", "48693112193")',';');
    tx.executeSql(sentence);
}

function testDBSuccess(tx, result) {
    console.log('table exist');
    var rows = result.rows;
    if(rows.length == 0) {
        db = window.openDatabase(nameOfDatabaseFile, "1.0", "Smses", 200000);
        db.transaction(defaultDB,errorCB);
    }
}

function testDBerror(err) {
    db = window.openDatabase(nameOfDatabaseFile, "1.0", "Smses", 200000);
    db.transaction(defaultDB,errorCB);
}

function errorCB(err) {
    alert("Error processing SQL: "+err.code);
}

function successCB() {
    alert("success!");
    db = window.openDatabase(nameOfDatabaseFile, "1.0", "Smses", 200000);
    db.transaction(queryDB,errorCB);
}

function queryDB(tx){
    var sentence = 'SELECT * FROM '.concat(nameOfDatabase);
    tx.executeSql(sentence,[],querySuccess,errorCB);
}

function querySuccess(tx,result){
    alert("Another success");
    var rows=result.rows;
    for(var i=0;i<rows.length;i++){
        var row = rows.item(i);
        console.log("type "+row.typeOfData +" : "+row.sentence);
        if(row.typeOfData.localeCompare('Wejsciowka')){
            entryMessage = row.sentence;
            break;
        }
        else if(row.typeOfData.localeCompare('Wyjsciowka')){
            exitMessage = row.sentence;
            break;
        }
        else if(row.typeOfData.localeCompare('Alarm')){
            alarmMessage = row.sentence;
            break;
        }
        else if(row.typeOfData.localeCompare('Numer')){
            telephoneNumber = '+'.concat(row.sentence);
            console.log(telephoneNumber);
            break;
        }

    }

}

function getEntryText() {
    db = window.openDatabase(nameOfDatabaseFile, "1.0", "Smses", 200000);
    db.transaction(function (tx) {
        var sentence = 'SELECT * FROM '.concat(nameOfDatabase,' WHERE id=1;');
        tx.executeSql(sentence, [], function (tx, results) {
            entryMessage = results.rows.item(0).sentence;
            document.getElementById('message').value = entryMessage;
        })
    });
}

function getExitText() {
    db = window.openDatabase(nameOfDatabaseFile, "1.0", "Smses", 200000);
    db.transaction(function (tx) {
        var sentence = 'SELECT * FROM '.concat(nameOfDatabase,' WHERE id=2;');
        tx.executeSql(sentence, [], function (tx, results) {
            exitMessage = results.rows.item(0).sentence;
            document.getElementById('message').value = exitMessage;
        })
    });
}

function getAlarmText() {
    db = window.openDatabase(nameOfDatabaseFile, "1.0", "Smses", 200000);
    db.transaction(function (tx) {
        var sentence = 'SELECT * FROM '.concat(nameOfDatabase,' WHERE id=3;');
        tx.executeSql(sentence, [], function (tx, results) {
            alarmMessage = results.rows.item(0).sentence;
            document.getElementById('message').value = alarmMessage;
        })
    });
}

function getTelephoneNumber() {
    db = window.openDatabase(nameOfDatabaseFile, "1.0", "Smses", 200000);
    db.transaction(function (tx) {
        var sentence = 'SELECT * FROM '.concat(nameOfDatabase,' WHERE id=4;');
        tx.executeSql(sentence, [], function (tx, results) {
            telephoneNumber = results.rows.item(0).sentence;
            document.getElementById("telephoneNumber").value = telephoneNumber;
        })
    });
}


function getEntryTextWithoutChanging() {
    db = window.openDatabase(nameOfDatabaseFile, "1.0", "Smses", 200000);
    db.transaction(function (tx) {
        var sentence = 'SELECT * FROM '.concat(nameOfDatabase,' WHERE id=1;');
        tx.executeSql(sentence, [], function (tx, results) {
            entryMessage = results.rows.item(0).sentence;
        })
    });
}

function getExitTextWithoutChanging() {
    db = window.openDatabase(nameOfDatabaseFile, "1.0", "Smses", 200000);
    db.transaction(function (tx) {
        var sentence = 'SELECT * FROM '.concat(nameOfDatabase,' WHERE id=2;');
        tx.executeSql(sentence, [], function (tx, results) {
            exitMessage = results.rows.item(0).sentence;
        })
    });
}

function getAlarmTextWithoutChanging() {
    db = window.openDatabase(nameOfDatabaseFile, "1.0", "Smses", 200000);
    db.transaction(function (tx) {
        var sentence = 'SELECT * FROM '.concat(nameOfDatabase,' WHERE id=3;');
        tx.executeSql(sentence, [], function (tx, results) {
            alarmMessage = results.rows.item(0).sentence;
        })
    });
}

function getTelephoneNumberWithoutChanging() {
    db = window.openDatabase(nameOfDatabaseFile, "1.0", "Smses", 200000);
    db.transaction(function (tx) {
        var sentence = 'SELECT * FROM '.concat(nameOfDatabase,' WHERE id=4;');
        tx.executeSql(sentence, [], function (tx, results) {
            telephoneNumber = results.rows.item(0).sentence;
        })
    });
}