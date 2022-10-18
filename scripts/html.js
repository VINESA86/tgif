console.log("hola mundo");
export  const fetchJson = async () => {
    const response =  await  fetch("https://api.propublica.org/congress/v1/113/house/members.json", {
	method: "GET",
	headers: {
    'X-API-KEY': 'g2lQIwb9v51mUxgD4lachz2DRzeIx04sUqEBcY14'
  }
})
.then(data=> data.json())
.then(table => console.log(table))
.catch(error=> console.log(error))
}