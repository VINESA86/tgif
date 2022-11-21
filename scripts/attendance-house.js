//fetch functioN
let members;
const fetchJson = async () => {
    const response =  await fetch("https://api.propublica.org/congress/v1/102/house/members.json", {
        method: "GET",
        headers: {
        'X-API-KEY': 'g2lQIwb9v51mUxgD4lachz2DRzeIx04sUqEBcY14'
    }
})
.then(data => data.json())//we use .json method 
.then(table => {
    
                
       members = table.results[0].members;
       

//Method for order and slice members with least engaged missed votes
let ordinateMembers = [...members].sort((a,b)=>a.missed_votes_pct-b.missed_votes_pct).slice(0,10); 
 console.log(ordinateMembers,'test');
//Method for order and slice members with most engaged missed votes
let inverseOrder = [...members].sort((a,b)=>b.missed_votes_pct-a.missed_votes_pct).slice(0,10); 
//createTable call function
createTable(ordinateMembers);
//createTable2 call function
createTable2(inverseOrder);

//createTable3 function in async mode   
//First we create arrays of members parties.
let republicanReps = [...members].filter ((element) => element.party === "R");
let repNumberOfMembers = republicanReps.length;

let democraticReps = [...members].filter ((element) => element.party === "D");
let demNumberOfMembers = democraticReps.length;
console.log(demNumberOfMembers,'rep number')

let independentReps = [...members].filter ((element) => element.party === "ID");
let indNumberOfMembers = independentReps.length;

//Second calculate length of reps
let totalPct = 0;
republicanReps.forEach(member =>  {
    totalPct += member.votes_with_party_pct;
})
let demPct = 0;
democraticReps.forEach(member =>  {
    demPct += member.votes_with_party_pct;
})
let indPct = 0;
independentReps.forEach(member =>  {
    indPct += member.votes_with_party_pct;
})

//Then calculate %voted with party
let votedWithPartyPctRep = totalPct / repNumberOfMembers;
console.log(totalPct,'totalPct',votedWithPartyPctRep,'votedR');

let votedWithPartyPctDem = demPct / demNumberOfMembers;
console.log(demPct,'demPct',votedWithPartyPctDem,'votedD');

let votedWithPartyPctInd = indPct / indNumberOfMembers;
console.log(indPct,'indPct',votedWithPartyPctInd,'votedInd');

//createTable3 

    
let tr =`
     <tr>
     <td>Republican</td>
     <td>${repNumberOfMembers}</td>
     <td>${votedWithPartyPctRep}</td>
     </tr>
     <tr>
     <td>Democratic</td>
     <td>${demNumberOfMembers}</td>
     <td>${votedWithPartyPctDem}</td> 
     </tr>
     <tr>
     <td>Independent</td>
     <td>${indNumberOfMembers}</td>
     <td>${votedWithPartyPctInd}</td>
     </tr>
 `; 
//We put tbodyContent (table) inside tbody (senateId):
document.getElementById("tbodyContentTable3").innerHTML= tr;



})
.catch(error=> console.log('ERR ',error))
}

//End of Fetch and async mode
fetchJson();

//createTable function least Engaged
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