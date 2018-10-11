var workers = require('./getDonor_id');

function WriteCSV() {
	var fs = require('fs');
	const createCsvWriter = require('csv-writer').createObjectCsvWriter;
	var ws = fs.createWriteStream('temp.csv');
	const csvWriter = createCsvWriter({
	    path: 'temp.csv',
	    header: [
	        {id: 'name', title: 'NAME'},
	        {id: 'lang', title: 'LANGUAGE'}
	    ]
	});
	 
	const records = [
	    {name: 'Bob',  lang: 'French, English'},
	    {name: 'Mary', lang: 'English'}
	];
	 
	csvWriter.writeRecords(records)       // returns a promise
	    .then(() => {
	        console.log('...Done');
	    });
}

function ReadCSV() {
var fs = require('fs');
var csv = require('fast-csv');

fs.createReadStream('BOB.csv')
	.pipe(csv())
	.on('data', function(data){
		console.log(data);
	})
	.on('end', function(data){
		console.log('Read Finished');
	});
}

WriteCSV();
ReadCSV();
var dict = new workers();
dict.add('Bob', 348739);
console.log(dict.findID('Bob'));

