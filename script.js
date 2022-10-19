// KEEP
var DateTime = luxon.DateTime;

function readAndConvertEventDate() {
    // reads in the input
    var eventName = document.getElementById("name").value;
    var eventDate = document.getElementById("when").value;
    var eventTime = document.getElementById("whenTime").value;
    var eventZone = document.getElementById("whenZone").value;

    //gets the utc offset for user submitted timezone
    var timezone = getUTCOffset(eventZone);

    document.getElementById("eventName").value = eventName;

    let leadingZeroDate = eventDate.padStart(2, '0');

    let concattedDate = leadingZeroDate + 'T' + eventTime + timezone;

    let convertedDate = new Date(concattedDate);

    document.getElementById("convertedDate").value = convertedDate.getFullYear() + '-' + String(convertedDate.getMonth() + 1) .padStart(2, '0') + '-' + convertedDate.getDate();

    const convertedHours = String(convertedDate.getHours()).padStart(2, '0');
    const ConvertedMinutes = String(convertedDate.getMinutes()).padStart(2, '0');

    document.getElementById("convertedTime").value = convertedHours + ':' + ConvertedMinutes;
  
}

function sendEmail(){
    
    var name = document.getElementById('eventName').value;
    var date = document.getElementById('convertedDate').value;
    var time = document.getElementById('convertedTime').value;
    var addr = document.getElementById('address').value;

    var message = "Hi there! " + "\n" + "Your event called " + name + "\n" + " Is On " + date + " At "+ time;

    console.log(message)

    var email = document.createElement("a");
    email.href = "mailto:"+ addr + "?subject=" + name + " Reminder&body=" + message;
    email.click();
}


// function getUTCOffset(zone) {
//     if (zone === "PST") 
//         { return "-08:00"
//     } else if (zone === "MST") {
//         return "-07:00"
//     } else if (zone === "CST") {
//         return "-6:00"
//     } else if (zone === "EST") {
//         return "-04:00"
//     } else if (zone === "KST") {
//         return "+09:00"
//     } else if (zone === "JST") {
//         return "+09:00"
//     }
// }

function getUTCOffset(){
    var eventZone = document.getElementById("whenZone").value;

    var local = DateTime.local();
    var event = local.setZone(eventZone);

    eventTimeString = event.toString();
    offsetString = eventTimeString.slice(-6)
    //console.log(eventTimeString.slice(-6));

    return offsetString;
}


// var d = new Date("2022-10-20 Japan");
// var n = d.getTimezoneOffset(); // Returns UTC Offset in Minutes

// console.log(n)

// i believe this function is working
function changeTimezone() {
    //const localTime = new Date(2022, 10, 19, 8, 0, 0);
    let localDate = new Date();

    let localDateString = localDate.toString();
    //let localDateString = localDate.toDateString() + " " + localDate.toLocaleTimeString();
    //let localTimeString = localTime.toUTCString();

    console.log("Local Date and Time is: " + localDateString);
    //console.log(typeof(localTime));

    let formatter = new Intl.DateTimeFormat('en-US', {  weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    //fractionalSecondDigits: 3,
    //hour12: true,
    timeZone: "Asia/Seoul" 
    });

    let koreaTime = formatter.format(localDate);
    let koreatimeString = koreaTime.toString();
    //let koreatimeString = koreaTime.toUTCString();
    console.log('Date and Time in Korea is: ' + koreatimeString);

    localHours = localDate.getHours();
    console.log(localHours); 

    koreaHours = koreaTime.getHours();
    console.log(koreaHours);

    return [localHours, koreaHours];
}

// honestly i cqant tell if this one is working or not
function changeToUTCTimezone() {
    //const localTime = new Date(2022, 10, 19, 8, 0, 0);
    const localTime = new Date();

    //let localTimeString = localTime.toString();
    let localTimeString = localTime.toUTCString();

    console.log("Local Date and Time is: " + localTimeString);

    let formatter = new Intl.DateTimeFormat('en-US', {  weekday: 'long',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    fractionalSecondDigits: 3,
    //hour12: true,
    timeZone: "Asia/Seoul" 
    });

    let koreaTime = new Date(formatter.format(localTime));
    //let koreatimeString = koreaTime.toString();
    let koreatimeString = koreaTime.toUTCString();
    console.log('Date and Time in Korea is: ' + koreatimeString);

    localHours = localTime.getHours();
    console.log(localHours); 

    koreaHours = koreaTime.getHours();
    console.log(koreaHours);

    return [localHours, koreaHours];
}

function changeTimezoneFlipped() {
const localTime = new Date();
let localTimeString = localTime.toUTCString();
console.log(localTimeString);

}

// this function might not be needed but im writing it just in case
function getTimeDifference() {
    changeToUTCTimezone();
    console.log(localHours);
    console.log(koreaHours);



}

// this function  also might not be needed
function getOffset() {
    var date = new Date();

    console.log(date);

    var localOffset = date.getTimezoneOffset();
    console.log(localOffset/-60);
}

//changeTimezone();
// getOffset();
//changeToUTCTimezone();
//changeTimezoneFlipped();
//getTimeDifference();

let timezones = Intl.supportedValuesOf('timeZone');

var select = document.getElementById("whenZone");
var options = timezones;

for(var i = 0; i < options.length; i++) {
    var opt = options[i];
    var el = document.createElement("option");
    el.textContent = opt;
    el.value = opt;
    select.appendChild(el);
}