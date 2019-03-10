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
mongoose.Promise = global.Promise; mongoose.connect('mongodb://localhost:27017/WCFB');

app.use('/src/style', express.static(`${__dirname}/src/style`));
app.use('/src/html', express.static(`${__dirname}/src/html`));
app.use('/src/scripts', express.static(`${__dirname}/src/scripts`));
app.use('/src/assets', express.static(`${__dirname}/src/assets`));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use('/src/jquery-csv', express.static(__dirname + '/src/jquery-csv'));

app.get('/', (req, res) => res.redirect('/src/html/login_logout_page.html'));

app.listen(port, () => console.log(`app listening on port ${port}!`));

const Schema = mongoose.Schema;

const wcfbSchema = new Schema({
    week: Number,
    csvString: String,
}, { collection: 'csvfilesdev2' });

const CSVFile = mongoose.model('CSVFile', wcfbSchema);

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
        if (document != null) {
            const date = new Date(parseInt(req.params.week, 10));
            const filename = `Week-${date.getMonth()}-${date.getDate()}-${date.getFullYear()}.csv`;
            res.set({ 'Content-Disposition': `attachement; filename="${filename}"` });
            res.send(document.csvString);
        }
        res.end();
    });
});


app.post('/sendCSVRow', function(req, res) {
	console.log(req.body);

  var row = new CSVFile({
        week: req.body.startWeek,
        csvString: req.body.serverData
    });


    console.log("Row: " + row);

    

  console.log('Added to db!!!');

    CSVFile.find( {week: req.body.startWeek}, function(err, results) {
      console.log("In find!")
      if(results.length) {
        // CSVFile.updateOne({week: 1551675600000}, { csvString: 'Checking once again.' }, 
        //   function(err, num, raw){if(err)(console.log("ERROR " + err)); else(console.log("succesfully sent!"))});
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
  
});

app.get('/sendCSVRow', function(req, res) {

        var row = new CSVFile({
            week: 1549861200000,
            csvString: 'CSV string'
        });

        console.log(row);

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
    res.send('Added to db!!!');
})
