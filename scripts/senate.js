 //fetch functioN
 let members
const fetchJson = async () => {
   
    const response =  await  fetch("https://api.propublica.org/congress/v1/113/house/members.json", {
	method: "GET",
	headers: {
    'X-API-KEY': 'g2lQIwb9v51mUxgD4lachz2DRzeIx04sUqEBcY14'
  }
})
.then(data => data.json())
.then(table => {
       members = table.results[0].members;
   
    
//Creating members table in async mode
createTable(members);
populatedrop(members);
//filter_party(members);
    
})
.catch(error=> console.log('ERR ',error))
}

fetchJson();
let selected_party_members = [];

//---------------------dropdown--------------------

function populatedrop(membersArr) {
    let stateArray = [...new Set(membersArr.map(member => member.state).sort())];
    console.log(stateArray,'STATE');

    let dropDown = document.getElementById("state_list");
   

    for (let i = 0; i < stateArray.length; i++) {
        console.log(stateArray);
        //modificare qui 

        let option = document.createElement("option");
        option.setAttribute("value", stateArray[i]);
        console.log(option);
        txt = document.createTextNode(stateArray[i]);

        option.appendChild(txt);
        dropDown.insertBefore(option, dropDown.lastChild);






    }

}


//----------------------------------------------------------------
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
    console.log(e.target.value)
    filter_party(members);
});
    document.getElementById("rep").addEventListener("click", function (e) {
    filter_party(members);
    console.log(e.target.value)
});
    document.getElementById("ind").addEventListener("click", function (e) {
    filter_party(members)
    console.log(e.target.value)
});
    document.getElementById("state_list").addEventListener("change", function (e) {
        console.log(e.target.value)
    filter_party(members)
});


//filter function

function filter_party(array) {
    console.log(array,'ciao2dsfsdfas')
        /*
         */
        let selected_state = document.getElementById("state_list").value;
        let selected_party_members = [];
    
        for (let i = 0; i < array.length; i++) {
            if ((document.getElementById("dem").checked && array[i].party == "D") && (selected_state == array[i].state || selected_state == "ALL")) {
               
                selected_party_members=arr[i].filter((x)=>x.party==="D");
            }
            if ((document.getElementById("rep").checked && array[i].party == "R") && (selected_state == array[i].state || selected_state == "ALL")) {
                
    
                selected_party_members=arr[i].filter((x)=>x.party==="R");
            }
    
    
            if ((document.getElementById("ind").checked && array[i].party == "I") && (selected_state == array[i].state || selected_state == "ALL")) {
                
    
                selected_party_members=arr[i].filter((x)=>x.party==="I");
                
            }
    
            if (document.getElementById("dem").checked == false && (document.getElementById("ind").checked == false) && (document.getElementById("rep").checked == false) && (selected_state == "ALL")
    

            ) {
    
                console.log("Emtra aquèi 33")
                
                selected_party_members = array;
    
            }
            if (document.getElementById("dem").checked == false && (document.getElementById("ind").checked == false) && (document.getElementById("rep").checked == false) && (selected_state == array[i].state)) {
                selected_party_members=arr[i].filter((x)=>x.state===selected_state);
            }
        }
    
        console.log("Emtra aquèi SALE")
    
        //cambiare il parametro build table
            console.log(selected_party_members,'ciao')
        createTable(selected_party_members)
    }



