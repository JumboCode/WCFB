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

	window.alert("Submitted")
	console.log(info)
}