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
createTable(members);
//Creating filter_party(members);
populatedrop(members);

 
})
.catch(error=> console.log('ERR ',error))
}

fetchJson();



let selected_party_members = [];

//---------------------dropdown--------------------

function populatedrop(membersArr) {
    let stateArray = [...new Set(membersArr.map(member => member.state).sort())];
    

    let dropDown = document.getElementById("state_list");
   

    for (let i = 0; i < stateArray.length; i++) {
     
        //modificare qui 

        let option = document.createElement("option");
        option.setAttribute("value", stateArray[i]);
        
        txt = document.createTextNode(stateArray[i]);

        option.appendChild(txt);
        dropDown.insertBefore(option, dropDown.lastChild);
    }
}

//createTable function 
function createTable(members){    
    let tbodyContent = "";
    members.forEach(member => {
   
    let tr =`
         <tr>
         <td>${member.first_name} ${member.middle_name===null? '' : member.middle_name} ${member.last_name}</td>
         <td>${member.party}</td>
         <td>${member.state}</td>
         <td>${member.seniority}</td>
         <td>${member.votes_with_party_pct}</td>
         <td>${member.url === null? '' : member.facebook_account}</td>
         </tr>
     `; 
    tbodyContent += tr;
//We put tbodyContent (table) inside tbody (senateId):
    document.getElementById("senateId").innerHTML= tbodyContent;
    })
}


//listen events
    document.getElementById("dem").addEventListener("click", function (e) {
    filter_party(members);
});
    document.getElementById("rep").addEventListener("click", function (e) {
    filter_party(members); 
});
    document.getElementById("ind").addEventListener("click", function (e) {
        console.log("holaa");
    filter_party(members)
});
    document.getElementById("state_list").addEventListener("change", function (e) {
       console.log(e.target.value);
    filter_party(members)
});


//filter function
function filter_party(membersArray) {
    
        
        let selected_state = document.getElementById("state_list").value;
        let selected_party_members = [];
    
        for (let i = 0; i < membersArray.length; i++) {
            if((document.getElementById("dem").checked && membersArray[i].party=="D") &&  (selected_state==="ALL" ||selected_state == membersArray[i].state)){
                console.log('democratic');
                selected_party_members.push(membersArray[i]);
            }
         
            if ((document.getElementById("rep").checked && membersArray[i].party == "R") && (selected_state == membersArray[i].state || selected_state == "ALL")) {
                selected_party_members.push(membersArray[i]);
            }
    
            if ((document.getElementById("ind").checked && membersArray[i].party == "ID") /*&& (selected_state == membersArray[i].state || selected_state == "ALL")*/) {
                console.log ("ciaoooooo");
                selected_party_members.push(membersArray[i]);
            }
    
            if (document.getElementById("dem").checked == false && (document.getElementById("ind").checked == false) && (document.getElementById("rep").checked == false) && (selected_state == "ALL")) {
                selected_party_members = membersArray;
    
            }
            if (document.getElementById("dem").checked == false && (document.getElementById("ind").checked == false) && (document.getElementById("rep").checked == false) && (selected_state == membersArray[i].state)) {
                selected_party_members.push(membersArray[i]);
            }
        }
    
     
        //Creating table filters
    
        createTable(selected_party_members)
    }



