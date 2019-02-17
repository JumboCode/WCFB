const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

var mongoose = require("mongoose");
mongoose.Promise = global.Promise;mongoose.connect("mongodb://localhost:27017/WCFB");

app.use('/src/style', express.static(__dirname + '/src/style'));
app.use('/src/html', express.static(__dirname + '/src/html'));
app.use('/src/scripts', express.static(__dirname + '/src/scripts'));
app.use('/src/assets', express.static(__dirname + '/src/assets'));
// app.use('/src/jquery-csv', express.static(__dirname + '/src/jquery-csv'));

app.get('/', (req, res) => res.redirect('/src/html/login_logout_page.html'));

app.listen(port, () => console.log(`app listening on port ${port}!`));

var Schema =  mongoose.Schema;

var wcfbSchema = new Schema({
	week: Number,
	csvString: String
}, {collection: 'csvfiles-dev'});

var CSVFile = mongoose.model('CSVFile', wcfbSchema);

app.get('/test', function(req, res) {
    var curr_date = new Date();
    var curr_milisec = curr_date.getTime()
    var row = new CSVFile({
        week: curr_milisec,
        csvString: 'CSV string'
    });

    console.log(row);

    row.save(function(err) {
        /*if (err) {
            res.status(500);
            res.json({
                status: 500,
                error: err
            });
        }
        else {
            res.json({
                status: 200,
                user: "_"
            });
        }*/
	res.send('Added to db!!!');
	res.end();
    })
})


app.get('/get_weeks', function(req, res) {
	console.log("hello");
	CSVFile.find({}, function(err, arr_of_rows) {
		/*var array = [];
		for (var i = 0; i < arr_of_rows.length; i++) {
			var curr_date = arr_of_rows[i].week.split('/');
			var year = curr_date[2];
			var month = curr_date[0];
			var day = curr_date[1];

			var d = new Date(year, month, day, 0, 0, 0, 0);
			console.log(d);
		}*/

		//arr_of_rows
		//	add date to the array
		// return array
		/*console.log("\n\n")*/
		console.log(arr_of_rows)
		res.json("response");
	})
	//var response = {"week_list":[]};


	//var array_thing = string_thing.split("/");


})

// fill the database with test data
// one endpoint: look through database and find weeks
// another endpoint: given a week, look at the associated csv string



/*
app.post('/post', function(request, response) {
		var day = Date.getDay(); //gets day of week
		if (day = 0) { //if day is sunday
			var date = dateFromCsv.getDate();
			var month = dateFromCsv.getMonth();
			var year = dateFromCsv.getFullYear();
			var week = month + '/' + date + '/' + year;
        }

		var toInsert = {
			"week": week,
			"csvString": String
		}

		db.collection('WCFB', function(error, coll) {
			coll.insert(toInsert, function(error, saved) {
				if (error) {
					response.send(500);
					}
					else {
						response.send('Sent');
				      	}
				});
			});
        });

app.get('/', function(request, response) {
	var response = '';

	db.collection('WCFB', function(er, collection) {
		collection.toArray(function(err, results) {
			if (!err) {
				for (var count = 0; count < results.length; count++) {
					response += results[count].week + results[count].csvString;
					}
				response.send(response);
				} else {
					response.send('Error');
				}
			});
		});
	});
*/

