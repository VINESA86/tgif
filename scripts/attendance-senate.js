//[...houseMembers].sort((a,b)=>a.missed_votes-b.missed_votes)
//[...houseMembers].sort((a,b)=>a.missed_votes-b.missed_votes).slice 
//para hacer slice clonamos array, de este modo no afectamos el array original, asi solo manipulamos el clon del original. 
//[...houseMembers].filter(element=>element.missed_votes_pct<10)

//fetch functioN
let members;
const fetchJson = async () => {
    const response =  await fetch("https://api.propublica.org/congress/v1/113/senate/members.json", {
        method: "GET",
        headers: {
        'X-API-KEY': 'g2lQIwb9v51mUxgD4lachz2DRzeIx04sUqEBcY14'
    }
})
.then(data => data.json())//we use .json method 
.then(table => {
    console.log('**** RUN', table)
                
       members = table.results[0].members;
       let indipendet = [...members].filter((element)=>element.party==="ID");
       console.log(indipendet,'test ind')

//Creating members table in async mode


//Method for order and slice members with least engaged missed votes
let ordinateMembers = [...members].sort((a,b)=>a.missed_votes_pct-b.missed_votes_pct).slice(0,10); 
 console.log(ordinateMembers,'test');
//Method for order and slice members with most engaged missed votes
let inverseOrder = [...members].sort((a,b)=>b.missed_votes_pct-a.missed_votes_pct).slice(0,10); 
//createTable call function
createTable(ordinateMembers);
//createTable2 call function
createTable2(inverseOrder);

})
.catch(error=> console.log('ERR ',error))
}

fetchJson();

//createTable function 
function createTable(array){  
     
    let tbodyContent = "";
    array.forEach(member => {
    console.log(member,'member')
    let tr =`
         <tr>
         <td>${member.first_name} ${member.middle_name===null? '' : member.middle_name} ${member.last_name}</td>
         <td>${member.missed_votes}</td>
         <td>${member.missed_votes_pct}</td>
         </tr>
     `; 
    tbodyContent += tr;
//We put tbodyContent (table) inside tbody (senateId):
    document.getElementById("leastEngaged").innerHTML= tbodyContent;
    })
}

//createTable2 function 
function createTable2(array){  
     
    let tbodyContent = "";
    array.forEach(member => {
    console.log(member,'member')
    let tr =`
         <tr>
         <td>${member.first_name} ${member.middle_name===null? '' : member.middle_name} ${member.last_name}</td>
         <td>${member.missed_votes}</td>
         <td>${member.missed_votes_pct}</td>
         </tr>
     `; 
    tbodyContent += tr;
//We put tbodyContent (table) inside tbody (senateId):
    document.getElementById("mostEngaged").innerHTML= tbodyContent;
    })
}

