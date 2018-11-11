var page_state = 0

// WHAT IS VAL_GETTER DOING AND HOW CAN I MAKE IT WORK WITH MY PROGRAM
function val_getter_1(a) {
	return a.options[a.selectedIndex].text
}

function val_getter_2(a) {
	return a.options[a.selectedIndex].text
}

var INPUTS = 
{
	'VNAME': {
		'id': 'VNAME',
		'input_id': 'VNAME_INPUT',
		'val_getter': val_getter_1,
	},
	'WCOMM': {
		'id': 'WCOMM',
		'input_id': 'WCOMM_INPUT',
		'val_getter': val_getter_1,
	},
	'OCOMM': {
		'id': 'OCOMM',
		'input_id': 'OCOMM_INPUT',
		'val_getter': val_getter_1,
	},
	'VPROJ'	: {
		'id': 'VPROJ',
		'input_id': 'VPROJ_INPUT',
		'val_getter': val_getter_2,
	}
}

function cancel() {
	page_state = 0
	var cancel_button = document.getElementById('CANCEL')

	for (let i in INPUTS) {
		INPUTS[i]['html_element_input'].style.display = 'none'
		INPUTS[i]['html_element'].style.display = 'block'
	}

	var submit_button = document.getElementById("submit_button")
	submit_button.innerHTML = 'Submit'

	cancel_button.style.display = 'none'
}

function submitForm() {
	var cancel_button = document.getElementById('CANCEL')

	for (let i in INPUTS) {
		INPUTS[i]['html_element'] = document.getElementById(INPUTS[i]['id'])
		INPUTS[i]['val'] = INPUTS[i]['val_getter'](INPUTS[i]['html_element'])

		INPUTS[i]['html_element_input'] = document.getElementById(INPUTS[i]['input_id'])
	}

	if (page_state == 0) {

		page_state = 1

		for (let i in INPUTS) {
			INPUTS[i]['html_element_input'].innerHTML = INPUTS[i]['val']
			INPUTS[i]['html_element_input'].style.display = 'block'
			INPUTS[i]['html_element'].style.display = 'none'
		}

		var submit_button = document.getElementById("submit_button")
		submit_button.innerHTML = 'Confirm?'

		cancel_button.style.display = 'block'

	}
	else {
		page_state = 0

		var submit_button = document.getElementById("submit_button")
		submit_button.innerHTML = 'Submit'

		var info = {}
		for (let i in INPUTS) {
			info[i] = INPUTS[i]['val']
		}

		console.log(info)
	}
}


function generate_names() {
	console.log(localStorage);
	for(let i in localStorage) {
		var obj = JSON.parse(localStorage.getItem(i)); 
		if (obj != null){
			document.getElementById("VNAME").innerHTML += "<option value=" + obj.name + ">" 
				+ obj.name + "</option>"; 
			console.log(obj.name);
		}
	}
}