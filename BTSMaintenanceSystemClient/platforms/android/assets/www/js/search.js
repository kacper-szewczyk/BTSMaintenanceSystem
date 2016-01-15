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
               /* $('.filterElements a').click(function() {
                    var type = $(this).data('type');
                    self.chooseNavElement(type)
                });*/
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
      /*      chooseNavElement : function(type) {
                if (type === null) {
                    return;
                }
                alert('Clicked on element '+ type );
            },*/
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

     if(device.platform=="Android"){
               var dbobj = window.sqlitePlugin.openDatabase({name: "databasename"});
    }
    else{
       // dbobj = window.openDatabase("databasename", "<version>", "<display_name>",'<size>');
      var dbobj = window.openDatabase("databasename", "4", "Cordova Demo",'');
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
