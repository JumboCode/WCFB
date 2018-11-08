var testCSV = 'NAME, DONORID\nbob, 3423\njack, 28398\nharsh, 903';

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
		'VDATE': VDATE.value,
		'WCOMM': WCOMM.value,
		'HOURS': HOURS.value,
		'OCOMM': OCOMM.value,
		'VPROJ': VPROJ_selected
	}

	WriteCSV(info);
	ReadCSV(testCSV);

	window.alert("Submitted")
}

function WriteCSV(info) {
	var csvRow = ""
	csvRow += info.VNAME + ",";
	csvRow += info.VDATE + ",";
	csvRow += info.WCOMM + ",";
	csvRow += info.HOURS + ",";
	csvRow += info.OCOMM + ",";
	csvRow += info.VPROJ;
	csvRow += "\n";
	console.log(csvRow);
}

function ReadCSV(data) {
	//parse the csv first using split /n and then comma
	//build dictionary based off of that 

	var allTextLines = data.split(/\r\n|\n/);
    var headers = allTextLines[0].split(',');
    var lines = [];
    var dict2 = new Dictionary();

    for (var i=1; i<allTextLines.length; i++) {
        var data = allTextLines[i].split(',');
        if (data.length == headers.length) {
        	dict2.add(data[0], data[1]);
        }
    }
	console.log(dict2);
}


function Dictionary() {
	this.sets = [];

	this.add = function(name, id) {
		if (name && id) {
			this.sets.push({
				VNAME: name,
				donor_id: id
			});
			return this.sets;
		}
	}

	this.findID = function(name) {
		for (var i = 0; i < this.sets.length; i++) {
			if (this.sets[i].VNAME == name) {
				return this.sets[i].donor_id;
			}
		}
		return this.sets;
	}

	this.removeUser = function(name) {
		for (var i = 0; i < this.sets.length; i++) {
			if (this.sets[i].VNAME == name) {
				this.sets[i].splice(this.sets[i], 1);
			}
		}
		return this.sets;
	}
}

function download_csv(csvData) {
	var hiddenElement = document.createElement('a');
	hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
	hiddenElement.target = '_blank';
	hiddenElement.download = 'testing.csv';
	hiddenElement.click();
}
