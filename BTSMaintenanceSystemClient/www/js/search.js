/**
 *
 */
var db;
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
                    console.log("tu");
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
                alert("Przed kopiowaniem");
                dbcopy();
                alert("Po kopiowaniu");
                db.executeSql('SELECT * FROM Bts WHERE id="2"', [], function (tx, results) {
                    alert("results.rows.item(1).uppertext: " + results.rows.item(1).uppertext);
                }, error);
            }

        };
    })();
    SearchModule.init();

});

function prepareDatabase(ready, error) {
    try {
        alert("tu1");
        console.trace();
        if(device.platform=="Android") {
            console.log("Android Kosik");
            db = window.sqlitePlugin.openDatabase({name: 'base.db'});
        }
        else {
            console.log("Inny Kosik");
            db = window.sqlitePlugin.openDatabase("base.db", "1.0", "DB",'7 * 1024 * 1024');
        }
        /*db.executeSql('SELECT * FROM Bts WHERE id="2"', [], function (tx, results) {
         console.log("results.rows.item(1).uppertext: " + results.rows.item(1).uppertext);
         }, error);
         console.log(error);*/
        db.executeSql('DROP TABLE IF EXISTS test_table');
        db.executeSql('CREATE TABLE IF NOT EXISTS test_table (id integer primary key, data text, data_num integer)');
        db.transaction(function(tx) {
            return tx.executeSql(["INSERT INTO test_table (data, data_num) VALUES (?,?)", "test", 100], function(res) {
                alert("Kosik");
                console.log("insertId: " + res.insertId + " -- probably 1");
                console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");
                return db.executeSql("select count(id) as cnt from test_table;", function(res) {
                    console.log("rows.length: " + res.rows.length + " -- should be 1");
                    return console.log("rows[0].cnt: " + res.rows[0].cnt + " -- should be 1");
                });
            }, function(e) {
                return console.log("ERROR: " + e.message);
            });
            /* console.log("Kosik0.5");
             db.transaction(function(tx) {
             tx.executeSql('CREATE TABLE docids (id, name)', function () {
             console.log("No jaroslaw");
             }, error);*/
        });

    }
    catch(e) {
        console.log(e);
    }

}

function showDocCount(db, span) {
    db.readTransaction(function (t) {
        t.executeSql('SELECT COUNT(*) AS c FROM docids', [], function (t, r) {
            span.textContent = r.rows[0].c;
            console.log("Kosik2");
        }, function (t, e) {
            // couldn't read database
            span.textContent = '(unknown: ' + e.message + ')';
            console.log("Kosik3");
        });
    });
}

function dbcopy()
{
    //Database filename to be copied is demo.db

    //location = 0, will copy the db to default SQLite Database Directory
    window.plugins.sqlDB.copy("../base.db", 0, copysuccess,copyerror);
}

function removeDB()
{
    var location = 1;
    window.plugins.sqlDB.remove("base.db", location, rmsuccess,rmerror);
}

function copysuccess()
{
    alert("Copied");
    //open db and run your queries
    db = window.sqlitePlugin.openDatabase({name: "base.db"});
}

function copyerror(e)
{
    alert("Error");
    //db already exists or problem in copying the db file. Check the Log.
    console.log("Error Code = "+JSON.stringify(e));
    //e.code = 516 => if db exists
}

function callAnotherPage() {
    console.log("callAnotherPage");
    window.location = "html/search.html";
}

function callRecordPage(id) {
    console.log("callAnotherPage");
    window.location = "record.html#"+id;
}

//myObject = updateHeader.call(myObject, "search.html#12");     // Will return 20
