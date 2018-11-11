// import store from '/scripts/localStorage.js' 


function hello() {
  window.alert('hi');
}

function submitForm() {

	var VDATE = document.getElementById("VDATE")

	var WCOMM = document.getElementById("WCOMM")

	var OCOMM = document.getElementById("OCOMM")

	var HOURS = document.getElementById("HOURS")

	var VNAME = document.getElementById("VNAME")

	var VPROJ = document.getElementById("VPROJ")
	var VPROJ_selected = VPROJ.options[VPROJ.selectedIndex].text

	var info = {
		'VNAME': VNAME.value,
		'WCOMM': WCOMM.value,
		'VDATE': VDATE.value,
		'HOURS': HOURS.value,
		'OCOMM': OCOMM.value,
		'VPROJ': VPROJ_selected
	}

	// import ('localStorage.js')
	// 	.then (module => {
	// 		module.store(); 
	// 	});
	store()
	window.alert("Submitted")
	console.log(info)
}

function store() {
	name = VNAME.value;
	// console.log("In store")
	// console.log(name)
	var today = new Date();
	var date = (today.getMonth()+1)+'-'+today.getDate();
	var time = today.getHours() + ":" + today.getMinutes();
	var dateTime = date+' '+time;
	var person = {"name": name, "login_time": dateTime};
	person = JSON.stringify(person);
	// I'm worried that we're indexing by time, so we don't know when/where to stop 
	// when we try to retrieve stuff? I'm going to try and have it just sequential 
	// localStorage[new Date().getTime()] = person;
	// localStorage[(localStorage.length + 1)] = person; 
	//console.log(person)
	localStorage.setItem((localStorage.length + 1), person);
	//console.log(localStorage.getItem(2));
	console.log(localStorage);
}

// function printCurrent () {
// 	var DropDownMenu = "<option value='--select--'>--Select--</option>"; 
// 	for (var i = 0; i < ; i++) {
// 		DropDownMenu += "<option value=" + i + ">" + i + "</option>"; 
// 	}

// 	document.getElementById('dropDown').innerHTML = stringDropDowninnerHTML; 
// 	console.log(localStorage);
// }

