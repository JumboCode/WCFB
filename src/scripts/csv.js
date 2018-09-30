function WriteCSV() {
	var fs = require('fs');
	const createCsvWriter = require('csv-writer').createObjectCsvWriter;
	var ws = fs.createWriteStream('Italy.csv');
	const csvWriter = createCsvWriter({
	    path: 'Italy.csv',
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
