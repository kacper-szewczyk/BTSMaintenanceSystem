
function getPosition() {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

function onSuccess(position) {
    var element = document.getElementById('geolocation');
    element.innerHTML = 'Latitude: '           + position.coords.latitude              + '<br />' +
        'Longitude: '          + position.coords.longitude             + '<br />' +
        'Altitude: '           + position.coords.altitude              + '<br />' +
        'Accuracy: '           + position.coords.accuracy              + '<br />' +
        'Altitude Accuracy: '  + position.coords.altitudeAccuracy      + '<br />' +
        'Heading: '            + position.coords.heading               + '<br />' +
        'Speed: '              + position.coords.speed                 + '<br />' +
        'Timestamp: '          +                                   position.timestamp          + '<br />';

    printFoundItems("a",0);

}

function onError(error) {
    alert('code: '    + error.code    + '\n' +
        'message: ' + error.message + '\n');
}


function printFoundItems(searchPhrase, filteringElem) {
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