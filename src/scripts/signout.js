var page_state = 0

function val_getter_1(a) {
	return a.value
}

function val_getter_2(a) {
	return a.options[a.selectedIndex].text
}

var INPUTS = 
{
	'VNAME': {
		'id': 'sign_out_input',
		'input_id': 'VNAME_INPUT',
		'val_getter': val_getter_1,
	},
	'WCOMM': {
		'id': 'comments',
		'input_id': 'WCOMM_INPUT',
		'val_getter': val_getter_1,
	},
	// 'OCOMM': {
	// 	'id': 'OCOMM',
	// 	'input_id': 'OCOMM_INPUT',
	// 	'val_getter': val_getter_1,
	// },
	'VPROJ'	: {
		'id': 'VPROJ',
		'input_id': 'VPROJ_INPUT',
		'val_getter': val_getter_2,
	}
}

function cancel() {
	page_state = 0
	var cancel_button = document.getElementById('CANCEL')

	var submit_button = document.getElementById("submit_button")
	submit_button.innerHTML = 'Submit'
	cancel_button.style.display = 'none'
	location.href = "login_logout_page.html"
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
		window.location.href = "login_logout_page.html"
	}
}