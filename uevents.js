var DateTime = luxon.DateTime;

const SUPABASE_URL = 'https://zbrjiavyonirzvqxxwos.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpicmppYXZ5b25pcnp2cXh4d29zIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjE5MTIwNDgsImV4cCI6MTk3NzQ4ODA0OH0.96Pz1SXA4pVD38tafalrT5Z2J8MZlNEXXnZ0CGGkLKw'

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

async function loadData() {

    const { data, error } = await _supabase
            .from('upcomingevents')
            .select('*')

    if(!error) {

        //loop display data here
        const parent = document.getElementById('holder')

        let contents = ''
        i = 0;
        data.forEach(function(item){
            contents += 
                `<div id="upcomingEvent${+ i}"> &#8226; ${item.name} - ${item.description} on ${item.date.replaceAll('-', '/')} at ${item.time} in ${item.timezone} 
                <br>
                ${checkWhere(item)}
                <button onclick="convertedEmailReminder(upcomingEvent${i})">Remind Me!</button>
                <br><br>
                </div>`
                i++;
        })

        parent.insertAdjacentHTML('beforeend', contents)
    }
    
}

function checkWhere(item){
    if (item.where !== null) { 
        return `<a href="${item.where}">${item.where}</a><br>`;
    }
    else {
        return ``
    }  
}

async function findPastEventRecord() {

    var currentTime = new Date()
    var month = currentTime.getMonth() + 1
    var day = currentTime.getDate()
    var year = currentTime.getFullYear()
    var today =(String(year) + "-" + String(month) .padStart(2,'0')) + "-" + String(day) .padStart(2,'0');
    
    const { data, error } = await _supabase
            .from('upcomingevents')
            .select('*')
            .lt('date', today)

    if(!error) {
        // Length will only be over 0 if a past record is found.
        if(data.length > 0) {
            data.forEach(function(item){   
                insertPastRecord(item);
                removePastRecord(item);
            })
        }
        else {
            {};
        }
    }
    
}

async function insertPastRecord(pastRow) {
    const { data, error } = await _supabase
    .from('pastevents')
    .insert([
      {name: pastRow.name, description: pastRow.description, date: pastRow.date, time: pastRow.time, timezone: pastRow.timezone, reoccurring: pastRow.reoccurring},
    ])
    
}

async function removePastRecord(pastRow) {

    var currentTime = new Date()
    var month = currentTime.getMonth() + 1
    var day = currentTime.getDate()
    var year = currentTime.getFullYear()
    var today =(String(year) + "-" + String(month) .padStart(2,'0')) + "-" + String(day) .padStart(2,'0');

    const { data, error } = await _supabase
            .from('upcomingevents')
            .delete()
            .lt('date', today)
    
}

async function findReoccurringEventRecord() {
    
    const { data, error } = await _supabase
            .from('upcomingevents')
            .select('*')
            .eq('reoccurring', true)
            
    if(!error) {

        data.forEach(function(item){
            insertReoccurringRow(item);
        })
    }
    
}

async function insertReoccurringRow(reoccurringRow) {
    const { data, error } = await _supabase
    .from('reoccuringevents')
    .upsert(
      { name: reoccurringRow.name, description: reoccurringRow.description, date: reoccurringRow.date, time: reoccurringRow.time, timezone: reoccurringRow.timezone, reoccurring: reoccurringRow.reoccurring},
      { onConflict: 'name'}
    )
    
}

function convertedEmailReminder(item) {
    let upcomingEventDetails = (item.innerHTML.substring(3));
    let arrowIndex = upcomingEventDetails.indexOf("<");

    let formattedEventDetails = upcomingEventDetails.substring(0, arrowIndex).trim();


    var eventName = formattedEventDetails.substring(0, formattedEventDetails.indexOf('-')).trim();
    // this '20' is here because i dont think the year will ever go past the 2000's and i couldnt think of a different
    // split point.
    // I can potientially see some problems arise from the use of indexOf and lastIndex of if any of the strings are found in
    // the event records. i think i need to find a workaround or continue testing to find out more.
    var eventDate = formattedEventDetails.substring((formattedEventDetails.lastIndexOf('on') + 3), formattedEventDetails.indexOf("at") - 1).trim();
    var eventTime = formattedEventDetails.substring((formattedEventDetails.indexOf('at') + 3), (formattedEventDetails.lastIndexOf('in'))).trim();
    var eventZone = formattedEventDetails.substring((formattedEventDetails.lastIndexOf('in') + 3)).trim();

    var timezoneOffset = getUTCOffset(eventZone);

    let convertedDate = eventDate.replaceAll('/', '-') + 'T' + eventTime + timezoneOffset;

    var yourDate = new Date(convertedDate);


    sendEmailReminder(eventName, yourDate);
}

function getUTCOffset(eventZone){
    var eventZone = eventZone
    var local = DateTime.local();
    var event = local.setZone(eventZone);

    eventTimeString = event.toString();
    offsetString = eventTimeString.slice(-6)

    return offsetString;
}

function sendEmailReminder(eventName, yourDate){
    var addr = prompt("What email would you like to send your reminder?");
    if (addr !== null) {
        var name = eventName;
        console.log(yourDate);
        var formattedDate = String(yourDate.getFullYear()) + '/' + String(yourDate.getMonth() + 1).padStart(2,'0') + '/' + String(yourDate.getDate()) .padStart(2,'0');
        var time = String(yourDate.getHours()).padStart(2,'0') + ':' + String(yourDate.getMinutes()).padStart(2,'0');
        console.log(time);
        var message = "Hi there! " + "\n" + "Your event called " + name + "\n" + " is on " + formattedDate + " at "+ time;

        var email = document.createElement("a");
        email.href = "mailto:"+ addr + "?subject=" + name + " Reminder&body=" + message;
        email.click();
    }
}

loadData();
findPastEventRecord();
findReoccurringEventRecord();
