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

	var info2 = {
		'VNAME': VNAME.value,
		'VDATE': VDATE.value,
		'WCOMM': WCOMM.value,
		'HOURS': HOURS.value,
		'OCOMM': OCOMM.value,
		'VPROJ': VPROJ_selected
	}

	var dict2 = new Dictionary();
	dict2 = info2;
	WriteCSV(info2);

	window.alert("Submitted")
	console.log(dict2)
}

function WriteCSV(records) {
	var fs = require('fs');
	const createCsvWriter = require('csv-writer').createObjectCsvWriter;
	var ws = fs.createWriteStream('temp2.csv');
	const csvWriter = createCsvWriter({
	    path: 'temp2.csv',
	    header: [
	        {id: 'VNAME', title: 'VNAME'},
	        {id: 'donor_id', title: 'donor_id'},
	        {id: 'VDATE', title: 'VDATE'},
	        {id: 'WCOMM', title: 'WCOMM'},
	        {id: 'Hours', title: 'Hours'},
	        {id: 'other_date', title: 'other_date'},
	        {id: 'VPROJ', title: 'VPROJ'}
	    ]
	});
	 
	csvWriter.writeRecords(records)       // returns a promise
	    .then(() => {
	        console.log('...Done');
	    });
}

function ReadCSV(filename, dict, fn) {
var fs = require('fs');
var csv = require('fast-csv');

fs.createReadStream(filename)
	.pipe(csv())
	.on('data', function(data){
		dict.add(data[0], data[1]);
	})
	.on('end', function(data){
		console.log('Read Finished');
		fn(dict.sets);
	});

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
