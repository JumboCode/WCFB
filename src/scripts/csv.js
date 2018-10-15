var workers = require('./getDonor_id');

function WriteCSV(records) {
	var fs = require('fs');
	const createCsvWriter = require('csv-writer').createObjectCsvWriter;
	var ws = fs.createWriteStream('temp2.csv');
	const csvWriter = createCsvWriter({
	    path: 'temp2.csv',
	    header: [
	        {id: 'VNAME', title: 'NAME'},
	        {id: 'donor_id', title: 'DONORID'},
	        {id: 'VDATE', title: 'DATE'},
	        {id: 'WCOMM', title: 'COMMENTS'},
	        {id: 'Hours', title: 'HOURS'}
	    ]
	});
	 
	csvWriter.writeRecords(records)       // returns a promise
	    .then(() => {
	        console.log('...Done');
	    });
}

async function ReadCSV(filename, dict, fn) {
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

var dict2 = new workers();
ReadCSV('temp.csv', dict2, WriteCSV);


