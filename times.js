// KEEP
var DateTime = luxon.DateTime;

function changeTimezone() {
    var eventName = document.getElementById("name").value;
    var eventDate = document.getElementById("when").value;
    var eventTime = document.getElementById("whenTime").value;
    var eventZone = document.getElementById("whenZone").value;


    var local = DateTime.local();
    var rezoned = local.setZone(eventZone);

    // different local times with different offsets
    console.log(local.toString(DateTime.DATE_FULL)); //=> '2017-09-13T18:30:51.141-04:00'
    console.log(rezoned.toString()); //=> '2017-09-13T15:30:51.141-07:00'

    // but actually the same time
    local.valueOf() === rezoned.valueOf(); //=> true

    console.log(local.zoneName);
    console.log(rezoned.zoneName);
}

function getUTCOffset(){
    var eventZone = document.getElementById("whenZone").value;

    var local = DateTime.local();
    var event = local.setZone(eventZone);

    eventTimeString = event.toString();
    offsetString = eventTimeString.slice(-6)
    //console.log(eventTimeString.slice(-6));

    return offsetString;
}

//getUTCOffset();
//changeTimezone();

// Asia/Seoul