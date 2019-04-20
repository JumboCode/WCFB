const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
// note: enable cors only for testing - it can probably be removed later
// for better security
app.use(cors());
app.options('GET', cors());
app.options('POST', cors());
const port = process.env.PORT || 3000;
var mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/WCFB';
mongoose.Promise = global.Promise; mongoose.connect(mongoUri);
console.log("MongoURI " + mongoUri);

app.use('/src/style', express.static(`${__dirname}/src/style`));
app.use('/src/html', express.static(`${__dirname}/src/html`));
app.use('/src/scripts', express.static(`${__dirname}/src/scripts`));
app.use('/src/assets', express.static(`${__dirname}/src/assets`));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.redirect('/src/html/login_logout_page.html'));

app.listen(port, () => console.log(`app listening on port ${port}!`));

const Schema = mongoose.Schema;

const wcfbSchema = new Schema({
    week: Number,
    csvString: String,
}, { collection: 'csvfilesdev2' });

const wcfbRecordsSchema = new Schema({
	  date: String,
	  csvString: String,
}, { collection: 'csvrecords' });

const loggedUserSchema = new Schema({
    name: String
}, {collection: 'logged-in-users'})

const CSVFile = mongoose.model('CSVFile', wcfbSchema);
const CSVRecordFile = mongoose.model('CSVRecordFile', wcfbRecordsSchema);
const loggedUser = mongoose.model('loggedUser', loggedUserSchema)

app.get('/test', (req, res) => {
    const currDate = new Date();
    const currMilisec = currDate.getTime();
    const row = new CSVFile({
        week: currMilisec,
        csvString: 'CSV string',
    });

    console.log(row);


    row.save((err) => {
        if (err) {
            res.status(500);
            res.json({
                status: 500,
                error: err,
            });
        } else {
            res.json({
                status: 200,
                user: 'user',
            });
        }
        res.end();
    });
});

// Endpoint /get_weeks
// Takes no parameters
// Returns a JSON object with one element, 'weeks', which is an array of
// ints (each representing a week) in descending order
app.get('/get_weeks', (req, res) => {
    const query = CSVFile.find();
    query.sort({ week: -1 }); // descending order
    query.exec((err, arrOfRows) => {
        if (err) {
            res.send(err);
        }
        const justWeeks = arrOfRows.map(x => x.week);
        res.send({ weeks: justWeeks });
        res.end();
    });
});

// Endpoint /get_csvstring
// Takes an int identifying a week as a parameter
// Sends a file containing the CSV string associated with the week parameter
// Sends nothing if the week was not found in the database
app.get('/get_csvstring/week/:week', (req, res) => {
    CSVFile.findOne({ week: req.params.week }, (err, document) => {
        if (err) {
            res.send(err);
        }

        if (document != null) {
            const date = new Date(parseInt(req.params.week, 10));
            const filename = `Week-${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}.csv`;
            res.set({ 'Content-Disposition': `attachement; filename="${filename}"` });
            res.send(document.csvString);
        }
        res.end();
    });
});


app.post('/sendCSVRow', function(req, res) {

  const dateSecs = req.body.startWeek;
  var row = new CSVFile({
        week: dateSecs,
        csvString: req.body.serverData
    });

    CSVFile.find( {week: dateSecs}, function(err, results) {
      if(err) {
        res.send(err);
      }

      if(results.length) {
        row.csvString = results[0].csvString + row.csvString;
        console.log(row);

        // To do: DeprecationWarning: collection.findAndModify is deprecated
        //        Probably caused by $set
        CSVFile.findOneAndUpdate({week: dateSecs}, {$set:{csvString:row.csvString}}, {new: true}, (err, doc) => {
            if (err) {
                console.log("Something wrong when updating data!");
            }
        });
      }
      else {
        const header = 'ID, Name, Comment, Other Comment, Project, Hours Worked, Date, Login Time, Logout Time\n';
        row.csvString = header + row.csvString;
        row.save(function(err) {
            if (err) {    
                res.status(500);
                res.json({
                    status: 500,
                    error: err
                });
                res.end();
            }
        })
      }
    });
    res.status(200);
    res.end();
});

app.post('/logged-in-database', (req, res) => {
    console.log("login store db!")
    console.log(req.body)
    
    if (req.body.add) {
        console.log("adding")
        let row = new loggedUser({
            name: req.body.name
        });
        row.save()
    } else {
        loggedUser.deleteOne({
            name: req.body.name
        }, function(err, obj) {

        })
    }
})


app.get('/names-list', (req, res) => {

	CSVRecordFile.findOne({}, {}, { sort: { created_at: -1 } }, (err, result) => {
		//console.log(result.csvString);
        if(err) {
            res.send(err);
        }

		console.log(result.csvString);
		res.send({ csvString: result.csvString, });
	});
});

app.post('/names-list', (req, res) => {
	//console.log(req);	
	// empty object matches everything, so table is cleared
	// this is because we only want one names -> id # csv at a time
	CSVRecordFile.deleteMany({}, (err) => {
        if(err) {
            res.send(err);
        }
        
 		var newFileObj = new CSVRecordFile({
 		       csvString: req.body.csvString
 		});
		//console.log(newFileObj);
		newFileObj.save((err) => {		
            		if (err) {    
            		    res.status(500);
            		    res.json({
            		        status: 500,
            		        error: err
            		    });
            		    res.end();
            		}
		});
	});
    res.status(200);
    res.end();
});


