// KEEP
const SUPABASE_URL = 'https://zbrjiavyonirzvqxxwos.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpicmppYXZ5b25pcnp2cXh4d29zIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjE5MTIwNDgsImV4cCI6MTk3NzQ4ODA0OH0.96Pz1SXA4pVD38tafalrT5Z2J8MZlNEXXnZ0CGGkLKw'

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)


async function loadData() {
    const { data, error } = await _supabase
            .from('members')
            .select('*')

    if(!error) {
        //loop display data here
        const parent = document.getElementById('holder')

        let contents = ''
        data.forEach(function(item){
            contents += `<div> ${item.romanized_name} - ${item.birthday}</div>`
 
        })

        parent.insertAdjacentHTML('beforeend', contents)
    }
    
}

async function loadCompanyGroups() {
    const { data, error } = await _supabase
        .from('companies')
        .select(`*, groups(*)`)
        // .eq('company_id', 'eb6903f5-bcd5-419a-9fdc-73ed92f811c1')

    if(!error) {
    //loop display data here
    const parent = document.getElementById('holder')

        let contents = ''
        data.forEach(function(item){
            console.log(item);
            // contents += `<div> ${item.romanized_name} - ${item.birthday}</div>` 
        })

        parent.insertAdjacentHTML('beforeend', contents)
    }
}

async function loadGroupMembers() {
    const { data, error } = await _supabase
        .from('groups')
        .select(`name, members(romanized_name)`)
        // .eq('company_id', 'eb6903f5-bcd5-419a-9fdc-73ed92f811c1')

    if(!error) {
    //loop display data here
    const parent = document.getElementById('holder')

        let contents = ''
        data.forEach(function(item){
            console.log(item);
            contents += `<div> ${item.name} - ${item.members}</div>`
            
        })

        parent.insertAdjacentHTML('beforeend', contents)
    }
}

async function groupMemberNamesOnScreen() {
    const { data, error } = await _supabase
        .from('groups')
        .select(`*, members(*)`)
        // .eq('company_id', 'eb6903f5-bcd5-419a-9fdc-73ed92f811c1')

    if(!error) {
    //loop display data here
        const parent = document.getElementById('holder')

        let contents = ''
        data.forEach(function(group){

            contents += `<div> ${group.name} - Debut: ${group.debut}</div>`

            group.members.forEach(function(member) {
                contents += `<div> &emsp; ${member.romanized_name} - Birthday: ${member.birthday} </div>`
            })
        })

        parent.insertAdjacentHTML('beforeend', contents)
    }
}

async function companiesGroupNamesOnScreen() {
    const { data, error } = await _supabase
        .from('companies')
        .select(`name, groups(*)`)
        // .eq('company_id', 'eb6903f5-bcd5-419a-9fdc-73ed92f811c1')

    if(!error) {
    //loop display data here
        const parent = document.getElementById('holder')

        let contents = ''
        data.forEach(function(company){

            contents += `<div> ${company.name}</div>`

            company.groups.forEach(function(group) {
                contents += `<div> &emsp; ${group.name} -${group.debut} </div>`
            })
        })

        parent.insertAdjacentHTML('beforeend', contents)
    }
}

// companiesGroupNamesOnScreen();
groupMemberNamesOnScreen();
// loadCompanyGroups();
// loadGroupMembers();