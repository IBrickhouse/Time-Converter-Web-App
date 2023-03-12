const SUPABASE_URL = 'https://zbrjiavyonirzvqxxwos.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpicmppYXZ5b25pcnp2cXh4d29zIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjE5MTIwNDgsImV4cCI6MTk3NzQ4ODA0OH0.96Pz1SXA4pVD38tafalrT5Z2J8MZlNEXXnZ0CGGkLKw'

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

async function loadData() {
    const { data, error } = await _supabase
            .from('reoccuringevents')
            .select('*')

    if(!error) {
        //loop display data here
        const parent = document.getElementById('holder')

        let contents = ''
        data.forEach(function(item){
            contents += `<div> &#8226; ${item.name} - ${item.description} on ${item.date.slice(5).replace('-', '/')} at ${item.time} in ${item.timezone}
            <br><br>
            </div>`
 
        })

        parent.insertAdjacentHTML('beforeend', contents)
    }
    
}

loadData();