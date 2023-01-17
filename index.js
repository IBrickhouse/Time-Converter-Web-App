// KEEP
var DateTime = luxon.DateTime;

const SUPABASE_URL = 'https://zbrjiavyonirzvqxxwos.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpicmppYXZ5b25pcnp2cXh4d29zIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjE5MTIwNDgsImV4cCI6MTk3NzQ4ODA0OH0.96Pz1SXA4pVD38tafalrT5Z2J8MZlNEXXnZ0CGGkLKw'

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// This could be refactored as it does more than one thing
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

    document.getElementById("convertedDate").value = convertedDate.getFullYear() + '-' + String(convertedDate.getMonth() + 1) .padStart(2, '0') + '-' + String(convertedDate.getDate()) .padStart(2, '0');

    const convertedHours = String(convertedDate.getHours()).padStart(2, '0');
    const ConvertedMinutes = String(convertedDate.getMinutes()).padStart(2, '0');

    document.getElementById("convertedTime").value = convertedHours + ':' + ConvertedMinutes;
}

function getUTCOffset(){
    var eventZone = document.getElementById("whenZone").value;

    var local = DateTime.local();
    var event = local.setZone(eventZone);

    eventTimeString = event.toString();
    offsetString = eventTimeString.slice(-6)

    return offsetString;
}

async function addEvent() {
    const { data, error } = await _supabase
            .from('events')
            .insert([
            { name: document.getElementById("name").value, 
            description: document.getElementById("eventDescription").value,
            date: document.getElementById("when").value,
            time: document.getElementById("whenTime").value,
            timezone: document.getElementById("whenZone").value,
        },
        ])

    const yesButton = document.getElementById("addButton");

    yesButton.replaceWith("Thanks!")
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

// I dont think this function is even being called?
// I'm drunk so i dont feel good enough to remove it
// but i think i will later.
function changeTimezone() {
    let localDate = new Date();

    let localDateString = localDate.toString();

    console.log("Local Date and Time is: " + localDateString);

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
    console.log('Date and Time in Korea is: ' + koreatimeString);

    localHours = localDate.getHours();
    console.log(localHours); 

    koreaHours = koreaTime.getHours();
    console.log(koreaHours);

    return [localHours, koreaHours];
}

// This creates the timezone dropdown on the page.
// could be moved into a function or script tag 
// but needs to be kept.
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