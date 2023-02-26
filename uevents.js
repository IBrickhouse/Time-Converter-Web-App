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
        data.forEach(function(item){
            contents += `<div> &#8226; ${item.name} - ${item.date} - ${item.time} - ${item.timezone} - ${item.description} </div>`
 
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
    console.log(today);
    
    const { data, error } = await _supabase
            .from('upcomingevents')
            .select('*')
            .eq('date', today)
            
    if(!error) {

        //console.log(data);

        data.forEach(function(item){
            console.log(item);
            insertRow(item);
        })

        //loop display data here
        const parent = document.getElementById('holder')

        let contents = ''
        data.forEach(function(item){
            contents += `<div> &#8226; ${item.name} - ${item.date} - ${item.time} - ${item.timezone} - ${item.description} </div>`

        })

        parent.insertAdjacentHTML('beforeend', contents)

    }
    
}

async function insertRow(pastRow) {
    const { data, error } = await _supabase
    .from('upcomingevents_test')
    .insert([
      {name: pastRow.name, description: pastRow.description, date: pastRow.date, time: pastRow.time, timezone: pastRow.timezone, reoccurring: pastRow.reoccurring},
    ])
    
}

async function removeRow() {
    const { data, error } = await _supabase
            .from('upcomingevents_test')
            .delete('data')
            .eq('date', today)
            

    if(!error) {

        const { data, error } = await supabase
        .from('upcomingevents_test')
        .insert([
            { name: 'name', description: 'description', date: 'date', time: 'time'},
        ])

        // console.log(data);
        // //loop display data here
        // const parent = document.getElementById('holder')

        // let contents = ''
        // data.forEach(function(item){
        //     contents += `<div> &#8226; ${item.name} - ${item.date} - ${item.time} - ${item.timezone} - ${item.description} </div>`
 
        // })

        // parent.insertAdjacentHTML('beforeend', contents)
    }
    
}

// loadData();

findPastEventRecord();