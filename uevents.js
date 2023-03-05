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
        let emailButton = ''
        data.forEach(function(item){
            contents += 
                `<div> &#8226; ${item.name} - ${item.description} on ${item.date.replaceAll('-', '/')} at ${item.time} in ${item.timezone} 
                <br>
                <button onclick="convertedEmailReminder()">Remind me!</button>
                <br><br>
                </div>`
            //emailButton += `<p>test</p>`
        })

        parent.insertAdjacentHTML('beforeend', contents)
        parent.insertAdjacentHTML('beforeend', emailButton)
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
    alert("I got clicked");
    eventR = item;
    console.log(eventR);
}

loadData();
findPastEventRecord();
findReoccurringEventRecord();
