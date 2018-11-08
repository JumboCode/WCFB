var testCSV = localStorage.getItem('csv');

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
		download_csv(testCSV);
	}

}

function download_csv(csvData) {
	var hiddenElement = document.createElement('a');
	hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvData);
	hiddenElement.target = '_blank';
	hiddenElement.download = 'testing.csv';
	hiddenElement.click();
}

// function WriteCSV(info) {
// 	var csvRow = ""
// 	csvRow += info.VNAME + ",";
// 	//csvRow += info.VDATE + ",";
// 	csvRow += info.WCOMM + ",";
// 	//csvRow += info.HOURS + ",";
// 	csvRow += info.OCOMM + ",";
// 	csvRow += info.VPROJ;
// 	csvRow += "\n";
// 	console.log(csvRow);
// }

// function ReadCSV(data) {
// 	//parse the csv first using split /n and then comma
// 	//build dictionary based off of that 

// 	var allTextLines = data.split(/\r\n|\n/);
//     var headers = allTextLines[0].split(',');
//     var lines = [];
//     var dict2 = new Dictionary();

//     for (var i=1; i<allTextLines.length; i++) {
//         var data = allTextLines[i].split(',');
//         if (data.length == headers.length) {
//         	dict2.add(data[0], data[1]);
//         }
//     }
// 	console.log(dict2);
// }


// function Dictionary() {
// 	this.sets = [];

// 	this.add = function(name, id) {
// 		if (name && id) {
// 			this.sets.push({
// 				VNAME: name,
// 				donor_id: id
// 			});
// 			return this.sets;
// 		}
// 	}

// 	this.findID = function(name) {
// 		for (var i = 0; i < this.sets.length; i++) {
// 			if (this.sets[i].VNAME == name) {
// 				return this.sets[i].donor_id;
// 			}
// 		}
// 		return this.sets;
// 	}

// 	this.removeUser = function(name) {
// 		for (var i = 0; i < this.sets.length; i++) {
// 			if (this.sets[i].VNAME == name) {
// 				this.sets[i].splice(this.sets[i], 1);
// 			}
// 		}
// 		return this.sets;
// 	}
// }
