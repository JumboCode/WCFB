function login() {
	console.log("In login()")
	var email = document.getElementById("U_SIGNIN").value;
	var password = document.getElementById("P_SIGNIN").value;
	sendData(email, password);
}

function sendData(email, password) {
    postData(`http://localhost:3000/api/users/login`, {"user": {"email": email, "password": password}})
	  			.catch(error => console.error(error));
}

function postData(url = '', data = {}) {
    console.log("DATA " + JSON.stringify(data));
    return fetch(url, {
        method: 'POST', 
	cache: 'no-cache',         
	headers: {
	    'Accept': 'application/json',	
            'Content-Type': 'application/json',            
	},
        body: JSON.stringify(data), 
    })
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(error => console.error('Error:', error));
}

