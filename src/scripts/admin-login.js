function login() {
	var email = document.getElementById("U_SIGNIN").value;
	var password = document.getElementById("P_SIGNIN").value;
	sendData(email, password);
}

function sendData(email, password) {
	//postData('http://localhost:3000/login', { email, password })
    postData(`http://localhost:3000/api/users/login`, {email, password})
	  			.catch(error => console.error(error));
}

function postData(url = '', data = {}) {
    console.log("DATA " + JSON.stringify(data));
    // Default options are marked with *
    return fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc. // no-cors, cors, *same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            //"Content-Type": "application/x-www-form-urlencoded"
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header
    })
    .then(response => response.json()); // parses response to JSON
    //.then(response => console.log('Success:', JSON.stringify(response)))
	//.catch(error => console.error('Error:', error));
}
