 const fetchJson = async () => {
   
    const response =  await  fetch("https://api.propublica.org/congress/v1/113/house/members.json", {
	method: "GET",
	headers: {
    'X-API-KEY': 'g2lQIwb9v51mUxgD4lachz2DRzeIx04sUqEBcY14'
  }
})
.then(data => data.json())
.then(table => {
   let   members = table.results[0].members;
    console.log(members);

    let tbodyContent = "";
    members.forEach(member => {
    console.log(member);
    
   
    let tr =`
        <tr>
        <td>${member.first_name} ${member.middle_name===null? '' : member.middle_name} ${member.last_name}</td>
        <td>${member.party}</td>
        <td>${member.state}</td>
        <td>${member.seniority}</td>
        <td>${member.votes_with_party_pct}</td>
    </tr>
    `; 
    tbodyContent += tr;
    })

    // dom senateId
    document.getElementById("senateId").innerHTML= tbodyContent;
})
.catch(error=> console.log('ERR ',error))
}

fetchJson();




//function to create a table 



