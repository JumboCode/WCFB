function val_getter_1(a) {
	return a.value
}

var INPUTS = 
{
	'VNAME_SIGNIN': {
		'id': 'sign_in_input',
		'input_id': 'VNAME_INPUT_SIGNIN',
		'val_getter': val_getter_1
	}
}

function submitForm() {

	for (let i in INPUTS) {
		INPUTS[i]['html_element'] = document.getElementById(INPUTS[i]['id'])
		INPUTS[i]['val'] = INPUTS[i]['val_getter'](INPUTS[i]['html_element'])
		INPUTS[i]['html_element_input'] = document.getElementById(INPUTS[i]['input_id'])
	}

	var info = {}
		for (let i in INPUTS) {
			info[i] = INPUTS[i]['val']
		}

	console.log(info)
	window.location.href = "login_logout_page.html";
}