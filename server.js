const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const errorHandler = require('errorhandler');
const auth = require('./src/routes/auth');

//Configure isProduction variable
const isProduction = process.env.NODE_ENV === 'production';
const app = express();
// note: enable cors only for testing - it can probably be removed later
app.use('/src/html', auth.required, express.static(`${__dirname}/src/html`));
// for better security
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));


app.options('GET', cors());
app.options('POST', cors());
const port = process.env.PORT || 3000;

// Models and routes
require('./src/models/Users');
require('./src/config/passport');
app.use(require('./src/routes'));


var mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/WCFB';
mongoose.Promise = global.Promise; mongoose.connect(mongoUri);

app.use('/src/style', auth.optional, express.static(`${__dirname}/src/style`));
app.use('/src/html', auth.required, express.static(`${__dirname}/src/html`));
app.use('/public', auth.optional, express.static(`${__dirname}/public`));
app.use('/src/scripts', auth.optional, express.static(`${__dirname}/src/scripts`));
app.use('/src/assets', auth.optional, express.static(`${__dirname}/src/assets`));

app.use('/s', express.static(`${__dirname}/src/html/login_logout_page.html`));
//test if auth.required protects route
app.get('/', (req, res) => res.redirect('/public/admin-login-page.html'));
//app.get('/src/html/admin-login-page', (req,res) => express.static(`/src/html/admin-login-page`));

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

const CSVFile = mongoose.model('CSVFile', wcfbSchema);
const CSVRecordFile = mongoose.model('CSVRecordFile', wcfbRecordsSchema);


app.get('/atest', (req, res) => { res.send("hello world")})

app.get('/test', auth.required,(req, res) => {
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
app.get('/get_weeks', auth.required, (req, res) => {
    const query = CSVFile.find();
    query.sort({ week: -1 }); // descending order
    query.exec((err, arrOfRows) => {
        const justWeeks = arrOfRows.map(x => x.week);
        res.send({ weeks: justWeeks });
        res.end();
    });
});

// Endpoint /get_csvstring
// Takes an int identifying a week as a parameter
// Sends a file containing the CSV string associated with the week parameter
// Sends nothing if the week was not found in the database
app.get('/get_csvstring/week/:week', auth.required, (req, res) => {
    CSVFile.findOne({ week: req.params.week }, (err, document) => {
        if (document != null) {
            const date = new Date(parseInt(req.params.week, 10));
            const filename = `Week-${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}.csv`;
            res.set({ 'Content-Disposition': `attachement; filename="${filename}"` });
            res.send(document.csvString);
        }
        res.end();
    });
});


app.post('/sendCSVRow', auth.required, function(req, res) {
  console.log(req.body);
  const dateSecs = req.body.startWeek;
  var row = new CSVFile({
        week: dateSecs,
        csvString: req.body.serverData
    });


    console.log("Row: " + row);

    

  console.log('Added to db!!!');

    CSVFile.find( {week: dateSecs}, function(err, results) {
      console.log("In find!")
      console.log(results);
      console.log(err);
      if(results.length) {
        CSVFile.deleteOne({ week: req.body.startWeek }, 
          function(err, num, raw){if(err)(console.log("ERROR " + err)); else(console.log("DELETED!!!"))});
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
      else {
        console.log("NOT FOUND BEING ADDED");
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


app.get('/names-list', auth.required, (req, res) => {

	CSVRecordFile.findOne({}, {}, { sort: { created_at: -1 } }, (err, result) => {
		console.log(result.csvString);
		res.send({ csvString: result.csvString, });
	});
});

app.post('/names-list', auth.required, (req, res) => {
	console.log(req);	
	// empty object matches everything, so table is cleared
	// this is because we only want one names -> id # csv at a time
	CSVRecordFile.deleteMany({}, (err) => {	
 		var newFileObj = new CSVRecordFile({
 		       csvString: req.body.csvString
 		});
		console.log(newFileObj);
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


