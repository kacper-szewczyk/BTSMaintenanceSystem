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
            console.log(" search init");
            prepareDatabase();

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






    //create table and insert some record
    function populateDB(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS MyFriends (id INTEGER PRIMARY KEY AUTOINCREMENT, autor TEXT NOT NULL, sentence TEXT NOT NULL)');
        tx.executeSql('INSERT INTO MyFriends(autor,sentence) VALUES ("Kosik ", "Raz w dupe to nie pedal")');
        tx.executeSql('INSERT INTO MyFriends(autor,sentence) VALUES ("Kosik", "10 razy w dupe")');
        tx.executeSql('INSERT INTO MyFriends(autor,sentence) VALUES ("Kosik", "Gejem siejest tylko raz")');

    }



       function errorCB(err) {
            alert("Error processing SQL: "+err.code);
        }

        //function will be called when process succeed
        function successCB() {
            alert("success!");
            var db = window.openDatabase("KosikBase", "1.0", "myfriends", 200000);
                    db.transaction(queryDB,errorCB);

        }
         function queryDB(tx){
                 console.log("queryDB start")
                tx.executeSql('SELECT * FROM MyFriends',[],querySuccess,errorCB);
                 console.log("queryDB end")
            }

               function querySuccess(tx,result){

                    console.log("result "+result);
                    var rows=result.rows;
                    console.log("rows "+rows);
                    console.log("len "+rows.length);
                    for(i=0;i<rows.length;i++){
                        var row = rows.item(i);
                        console.log("autor "+row.autor +" : "+row.sentence);
                    }

               }




function prepareDatabase() {

    // if(device.platform=="Android"){
      //      alert("if android");
    //           var dbobj = window.sqlitePlugin.openDatabase({name: "databasename"});
     //           alert("otworzylem android");
   // }
   // else{
       // dbobj = window.openDatabase("databasename", "<version>", "<display_name>",'<size>');
       console.log(" inna platforma");
      var db = window.openDatabase("KosikBase", "1.0", "myfriends", 200000);
       console.log("base opened");
      db.transaction(populateDB, errorCB, successCB);
      console.log("transaction done");


   // }

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
