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

       
//Method for order and slice members with least loyal
const ordinateMembers = [...members].sort((a,b)=>a.votes_with_party_pct-b.votes_with_party_pct).slice(0,10); 
//Method for order and slice members with most loyal
const inverseOrder = [...members].sort((a,b)=>{return b.votes_with_party_pct-a.votes_with_party_pct}).slice(0,10); 
//createTable call function
console.log(inverseOrder,'ordinate in crecents')

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
     <td>${votedWithPartyPctRep.toFixed(2)}</td>
     </tr>
     <tr>
     <td>Democratic</td>
     <td>${demNumberOfMembers}</td>
     <td>${votedWithPartyPctDem.toFixed(2)}</td> 
     </tr>
     <tr>
     <td>Independent</td>
     <td>${indNumberOfMembers}</td>
     <td>${votedWithPartyPctInd.toFixed(2)}</td>
     </tr>
 `; 
//We put tbodyContent (table) inside tbody (senateId):
document.getElementById("tbodyContentTable3").innerHTML= tr;





})
.catch(error=> console.log('ERR ',error))
}
//End of Fetch and async mode
fetchJson();

//createTable function least Loyal
function createTable(array){  
     
    let tbodyContent = "";
    array.forEach(member => {
    let tr =`
         <tr>
         <td>${member.first_name} ${member.middle_name===null? '' : member.middle_name} ${member.last_name}</td>
         <td>${member.total_votes}</td>
         <td>${member.votes_with_party_pct}</td>
         </tr>
     `; 
    tbodyContent += tr;
//We put tbodyContent (table) inside tbody (senateId):
    document.getElementById("leastLoyal").innerHTML= tbodyContent;
    })
}

//createTable2 function most Loyal

function createTable2(array){  
     
    let tbodyContent = "";
    array.forEach(member => {
    let tr =`
         <tr>
         <td>${member.first_name} ${member.middle_name===null? '' : member.middle_name} ${member.last_name}</td>
         <td>${member.total_votes}</td>
         <td>${member.votes_with_party_pct}</td>
         </tr>
     `; 
    tbodyContent += tr;
//We put tbodyContent (table) inside tbody (senateId):
    document.getElementById("mostLoyal").innerHTML= tbodyContent;
    })
}




