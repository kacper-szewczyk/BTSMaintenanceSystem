
var nameOfDatabase = 'Messages';
var db;
var entryMessage = 'Wchodzę na stację';
var exitMessage = 'Wychodzę ze stację';
var alarmMessage = 'Alarm';
var telephoneNumber = "48693112193";

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


function checkDatabase() {
    db = window.openDatabase("SmsDB", "1.0", "Smses", 200000);
    db.transaction(checkDB, errorCB, successCB);
}

function checkDB(tx) {
    var sentence = 'DROP TABLE '.concat(nameOfDatabase);
    tx.executeSql(sentence,[],testDBSuccess,testDBerror);
    sentence = 'SELECT * FROM '.concat(nameOfDatabase);
    tx.executeSql(sentence,[],testDBSuccess,testDBerror);

}
//create table and insert records
function defaultDB(tx) {
    var sentence = 'CREATE TABLE IF NOT EXISTS '.concat(nameOfDatabase);
    sentence = sentence.concat(' (id INTEGER PRIMARY KEY AUTOINCREMENT, type TEXT NOT NULL, sentence TEXT NOT NULL)');
    tx.executeSql(sentence);
    sentence = 'INSERT INTO '.concat(nameOfDatabase,'(type,sentence) VALUES ("Wejsciowka ", "Wchodzę na stację")');
    tx.executeSql(sentence);
    sentence = 'INSERT INTO '.concat(nameOfDatabase,'(type,sentence) VALUES ("Wyjsciowka ", "Wychodzę na stację")');
    tx.executeSql(sentence);
    sentence = 'INSERT INTO '.concat(nameOfDatabase,'(type,sentence) VALUES ("Alarm", "Alarm")');
    tx.executeSql(sentence);
    sentence = 'INSERT INTO '.concat(nameOfDatabase,'(type,sentence) VALUES ("Numer", "48693112193")');
    tx.executeSql(sentence);
    //tx.executeSql("UPDATE Messages SET sentence = 'Edited text' WHERE id = 1");

}

function testDBSuccess(tx, result) {
    console.log('table exist');
    var rows = result.rows;
    if(rows.length == 0) {
        db = window.openDatabase("SmsDB", "1.0", "Smses", 200000);
        db.transaction(defaultDB,errorCB);
    }
}

function testDBerror(err) {
    db = window.openDatabase("SmsDB", "1.0", "Smses", 200000);
    db.transaction(defaultDB,errorCB);
}

function errorCB(err) {
    alert("Error processing SQL: "+err.code);
}

//function will be called when process succeed
function successCB() {
    alert("success!");
    db = window.openDatabase("SmsDB", "1.0", "Smses", 200000);
    db.transaction(queryDB,errorCB);

}
function queryDB(tx){
    console.log("queryDB start");
    var sentence = 'SELECT * FROM '.concat(nameOfDatabase);
    tx.executeSql(sentence,[],querySuccess,errorCB);
    console.log("queryDB end");
}

function querySuccess(tx,result){
    var rows=result.rows;
    for(var i=0;i<rows.length;i++){
        var row = rows.item(i);
        console.log("type "+row.type +" : "+row.sentence);
        if(row.type == 'Wejsciowka'){
            entryMessage = row.sentence;
            break;
        }
        else if(row.type == 'Wyjsciowka'){
            exitMessage = row.sentence;
            break;
        }
        else if(row.type == 'Alarm'){
            alarmMessage = row.sentence;
            break;
        }
        else if(row.type == 'Numer'){
            telephoneNumber = row.sentence;
            break;
        }
    }

}

function getEntryText() {
    db = window.openDatabase("SmsDB", "1.0", "Smses", 200000);
    db.transaction(getEntryMessage(), errorCB());
}

function getExitText() {
    db = window.openDatabase("SmsDB", "1.0", "Smses", 200000);
    db.transaction(getExitMessage(), errorCB());
}

function getAlarmText() {
    db = window.openDatabase("SmsDB", "1.0", "Smses", 200000);
    db.transaction(getAlarmMessage(), errorCB());
}

function getTelephoneNumber() {
    db = window.openDatabase("SmsDB", "1.0", "Smses", 200000);
    db.transaction(getNumber(), errorCB());
}

function getEntryMessage(tx) {
    var sentence = 'SELECT * FROM '.concat(nameOfDatabase);
    sentence = sentence.concat(' WHERE type="Wejsciowka"');
    tx.executeSql(sentence,[],querySuccess,errorCB);
}

function getExitMessage(tx) {
    var sentence = 'SELECT * FROM '.concat(nameOfDatabase);
    sentence = sentence.concat(' WHERE type="Wyjsciowka"');
    tx.executeSql(sentence,[],querySuccess,errorCB);
}

function getAlarmMessage(tx) {
    var sentence = 'SELECT * FROM '.concat(nameOfDatabase);
    sentence = sentence.concat(' WHERE type="Alarm"');
    tx.executeSql(sentence,[],querySuccess,errorCB);
}

function getNumber(tx) {
    var sentence = 'SELECT * FROM '.concat(nameOfDatabase);
    sentence = sentence.concat(' WHERE type="Number"');
    tx.executeSql(sentence,[],querySuccess,errorCB);
}