function readAndConvertEventDate() {
    // reads in the input
    var eventDate = document.getElementById("when").value;
    var eventTime = document.getElementById("whenTime").value;
    var eventZone = document.getElementById("whenZone").value;

    //gets the utc offset for user submitted timezone
    var timezone = getUTCOffset(eventZone);

    // console.log(eventDate);
    // console.log(eventTime);
    // console.log(timezone);

    let concattedDate = eventDate + 'T' + eventTime + timezone;
    //console.log(concattedDate)

    let convertedDate = new Date(concattedDate);
    //console.log(convertedDate);

    document.getElementById("convertedDate").value = convertedDate.getFullYear() + '-' + (convertedDate.getMonth() + 1)+ '-' + convertedDate.getDate();

    const convertedHours = String(convertedDate.getHours()).padStart(2, '0');
    const ConvertedMinutes = String(convertedDate.getMinutes()).padStart(2, '0');

    document.getElementById("convertedTime").value = hours + ':' + minutes;
  
}

function getUTCOffset(zone) {
    if (zone === "KST") {
        return "+09:00";
    }
}
