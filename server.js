const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
const schedule = require('node-schedule');

// TODO: Unhardcode this later
const apiKey = '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';

const app = express();
app.use(cors());
app.options('GET', cors());
app.options('POST', cors());
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/WCFB';
mongoose.Promise = global.Promise; mongoose.connect(mongoUri);
console.log(`MongoURI ${mongoUri}`);

app.use('/src/style', express.static(`${__dirname}/src/style`));
app.use('/src/html', express.static(`${__dirname}/src/html`));
app.use('/src/scripts', express.static(`${__dirname}/src/scripts`));
app.use('/src/assets', express.static(`${__dirname}/src/assets`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.redirect('/src/html/login_logout_page.html'));

app.listen(port, () => console.log(`app listening on port ${port}!`));

// Given a Date, return a Date of the most recent Monday
function getMonday(d) {
    d = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const day = d.getDay();
    const diff = d.getDate() - day + (day == 0 ? -6 : 1);
    return new Date(d.setDate(diff));
}

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

app.get('/test', (req, res) => {
    const currDate = getMonday(new Date());
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
            const filename = `Week-${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}.csv`;
            res.set({ 'Content-Disposition': `attachement; filename="${filename}"` });
            res.send(document.csvString);
        }
        res.end();
    });
});

// Endpoint /sendCSVRow
app.post('/sendCSVRow', (req, res) => {
    console.log(req.body);

<<<<<<< HEAD
    const row = new CSVFile({
        week: req.body.startWeek,
        csvString: req.body.serverData,
    });


    console.log(`Row: ${row}`);


    console.log('Added to db!!!');

    CSVFile.find({ week: req.body.startWeek }, (err, results) => {
        console.log('In find!');
        if (results.length) {
            CSVFile.deleteOne({ week: req.body.startWeek },
                (err, num, raw) => { if (err)(console.log(`ERROR ${err}`)); else (console.log('DELETED!!!')); });
            row.save((err) => {
                if (err) {
                    res.status(500);
                    res.json({
                        status: 500,
                        error: err,
                    });
                    res.end();
                }
            });
        } else {
            console.log('NOT FOUND BEING ADDED');
            row.save((err) => {
                if (err) {
                    res.status(500);
                    res.json({
                        status: 500,
                        error: err,
                    });
                    res.end();
                }
            });
        }
=======
app.post('/sendCSVRow', function(req, res) {

  const dateSecs = req.body.startWeek;
  var row = new CSVFile({
        week: dateSecs,
        csvString: req.body.serverData
    });

    CSVFile.find( {week: dateSecs}, function(err, results) {
      console.log(results);
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
        // CSVFile.deleteOne({ week: req.body.startWeek }, 
        //   function(err, num, raw){if(err)(console.log("ERROR " + err)); else(console.log("DELETED!!!"))});
        // row.save(function(err) {
        //     if (err) {    
        //         res.status(500);
        //         res.json({
        //             status: 500,
        //             error: err
        //         });
        //         res.end();
        //     }
        // })
      }
      else {
        const header = 'ID, Name, Comment, Other Comment, Project, Hours Worked, Date, Login Time, Logout Time\n';
        row.csvString = header + row.csvString;
        console.log(row.csvString);
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
>>>>>>> 2184b9f50e7b4903d4e56d0ad19038f5bf6771bf
    });
});

app.get('/names-list', (req, res) => {
    CSVRecordFile.findOne({}, {}, { sort: { created_at: -1 } }, (err, result) => {
        console.log(result.csvString);
        res.send({ csvString: result.csvString });
    });
});

app.post('/names-list', (req, res) => {
    console.log(req);
    // empty object matches everything, so table is cleared
    // this is because we only want one names -> id # csv at a time
    CSVRecordFile.deleteMany({}, (err) => {
 		const newFileObj = new CSVRecordFile({
 		       csvString: req.body.csvString,
 		});
        console.log(newFileObj);
        newFileObj.save((err) => {
            		if (err) {
            		    res.status(500);
            		    res.json({
            		        status: 500,
            		        error: err,
            		    });
            		    res.end();
            		}
        });
    });
    res.status(200);
    res.end();
});


/* ///////////////////// */
/* /// Email Methods /// */
/* ///////////////////// */

let emails = ['jonathan.conroy@tufts.edu'];
const emailSchedule = schedule.scheduleJob({ dayOfWeek: 5, hour: 17, minute: 0 }, sendEmail);

// sendEmail
// Takes no parameters
// Sends an email with the current week's csv file to the address (email_to)
function sendEmail() {
    // find correct CSV
    const date = getMonday(new Date());
    CSVFile.findOne({ week: date }, (err, document) => {
        if (document != null) {
            const filename = `Week-${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}.csv`;
            const csv = Buffer.from(document.csvString).toString('base64');

            // send email
            sgMail.setApiKey(apiKey);
            const msg = {
                to: emails,
                from: 'wcfb@jumbocode.com',
                subject: `WCFB Weekly Report – ${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`,
                html: '<p>Insert message here</p>',
                attachments: [
                    {
                        content: csv,
                        filename,
                        type: 'text/csv',
                        disposition: 'attachment',
                    },
                ],
            };
            sgMail.send(msg);
            return true;
        }
        return false;
    });
}

/*  Endpoints that interact with email */

// Endpoint /send_email
// Takes no parameters
// Sends an email with the current week's csv file to the address EMAIL_TO
app.get('/send_email', (req, res) => {
    const success = sendEmail();
    if (success) {
        res.json({ status: 200 });
    } else {
        res.json({
            status: 500,
            err: 'No CSV for the current week was found',
        });
    }
    res.end();
});

// Endpoint /add_email
// Chance the email that receives email
app.post('/add_email', (req, res) => {
    if (emails.length < 1) {
        emails = [req.body.email];
    } else {
        emails.push(req.body.email);
    }
    res.end();
});

// Endpoint /remove_email
// Stop sending emails to the specified email
app.post('/remove_email', (req, res) => {
    const email = req.body.email;
    const index = emails.indexOf(email);
    if (index > -1) {
        emails.splice(index, 1);
        res.json({ status: 200 });
    } else {
        res.json({
            status: 500,
            err: 'Email not found',
        });
    }
});

// Endpoint /get_emails
// Return a JSON object containing "emails" - an array of email addresses
//   that will receive weekly notification
app.get('/get_emails', (req, res) => {
    res.json({
        status: 200,
        emails,
    });
});
