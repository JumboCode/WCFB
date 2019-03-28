const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const sgMail = require('@sendgrid/mail');

// TODO: Unhardcode this later
const apiKey = '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';

const app = express();
app.use(cors());
app.options('GET', cors());
const port = process.env.PORT || 3000;
mongoose.Promise = global.Promise; mongoose.connect('mongodb://localhost:27017/WCFB');

app.use('/src/style', express.static(`${__dirname}/src/style`));
app.use('/src/html', express.static(`${__dirname}/src/html`));
app.use('/src/scripts', express.static(`${__dirname}/src/scripts`));
app.use('/src/assets', express.static(`${__dirname}/src/assets`));

app.get('/', (req, res) => res.redirect('/src/html/login_logout_page.html'));

app.listen(port, () => console.log(`app listening on port ${port}!`));

const Schema = mongoose.Schema;

const wcfbSchema = new Schema({
    week: Number,
    csvString: String,
}, { collection: 'csvfiles-dev' });

const CSVFile = mongoose.model('CSVFile', wcfbSchema);

app.get('/test', (req, res) => {
    const currDate = new Date(fakeDate());// new Date();
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

// Endpoint /send_email
// sends an email
app.get('/send_email', (req, res) => {
    const week = new Date(fakeDate());// the current week
    CSVFile.findOne({ week }, (err, document) => {
        if (document != null) {
            const date = week;
            const filename = `Week-${date.getMonth() + 1}-${date.getDate()}-${date.getFullYear()}.csv`;
            const content = Buffer.from(document.csvString).toString('base64');

            sgMail.setApiKey(apiKey);
            const msg = {
                to: 'jonathan.conroy@tufts.edu',
                from: 'sender@example.org',
                subject: 'Hello attachment',
                html: '<p>Here’s an attachment for you!</p>',
                attachments: [
                    {
                        content,
                        filename,
                        type: 'text/csv',
                        disposition: 'attachment',
                    },
                ],
            };
            sgMail.send(msg);
        }
        res.end();
    });
});

function fakeDate() {
    return 1553813682;
}
// Email weekly function for now
