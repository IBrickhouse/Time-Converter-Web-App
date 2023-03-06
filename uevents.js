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
                <button onclick="convertedEmailReminder(upcomingEvent${i})">Remind Me!</button>
                <br><br>
                </div>`
                i++;
            //console.log(i);
        })

        parent.insertAdjacentHTML('beforeend', contents)
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
                //console.log('I did something');     
                insertPastRecord(item);
                removePastRecord(item);
            })
        }
        else {
            //console.log("I didnt do anything");
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
    //console.log(today);

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
            //console.log(item);
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
    //alert("I got clicked");
    // fomatting string. feels kind of hacky
    let upcomingEventDetails = (item.innerHTML.substring(3));
    let arrowIndex = upcomingEventDetails.indexOf("<");
    //console.log(arrowIndex);
    let formattedEventDetails = upcomingEventDetails.substring(0, arrowIndex);
    //console.log(formattedEventDetails);

    var eventName = formattedEventDetails.substring(0, formattedEventDetails.indexOf('-')).trim();
    // this '20' is here because i dont think the year will ever go past the 2000's and i couldnt think of a different
    // split point.
    var eventDate = formattedEventDetails.substring(formattedEventDetails.indexOf('20'), formattedEventDetails.indexOf("at") - 1).trim();
    var eventTime = formattedEventDetails.substring((formattedEventDetails.indexOf(':') - 2), formattedEventDetails.indexOf("in") - 1).trim();
    var eventZone = formattedEventDetails.substring((formattedEventDetails.lastIndexOf('in') + 3), formattedEventDetails.lastIndexOf(' ')).trim();

    // console.log(eventName);
    // console.log(eventName.length);
    // console.log(eventDate);
    // console.log(eventDate.length);
    // console.log(eventTime);
    // console.log(eventTime.length);
    // console.log(eventZone);
    // console.log(eventZone.length)

    //Get utc offset
    var timezoneOffset = getUTCOffset(eventZone);
    //console.log(timezoneOffset);

    let convertedDate = eventDate.replaceAll('/', '-') + 'T' + eventTime.slice(3)  + timezoneOffset;
    //console.log(convertedDate);

    var yourDate = new Date(convertedDate);
    //console.log(yourDate)

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
    var name = eventName;
    //console.log(name);
    var ISODate = yourDate.toISOString();
    //console.log(ISODate);
    var onlyDate = ISODate.slice(0, 10);
    //console.log(onlyDate);
    var time = ISODate.slice(11, 16)
    console.log(time);

    //TODO make this addr variable dynamic for each user
    var addr = 'mrfurbyb@gmail.com';

    var message = "Hi there! " + "\n" + "Your event called " + name + "\n" + " Is On " + onlyDate + " At "+ time;

    console.log(message)

    var email = document.createElement("a");
    email.href = "mailto:"+ addr + "?subject=" + name + " Reminder&body=" + message;
    email.click();
}

loadData();
findPastEventRecord();
findReoccurringEventRecord();
