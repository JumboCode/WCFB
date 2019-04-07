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
// for better security
app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(express.static(path.join(__dirname, 'public')));
// TODO (secret????)
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

// if (!isProduction) {
//   app.use(errorHandler());
// }

app.options('GET', cors());
const port = process.env.PORT || 3000;
mongoose.Promise = global.Promise; mongoose.connect('mongodb://localhost:27017/wcfb');
mongoose.set('debug', true);

// Models and routes
require('./src/models/Users');
require('./src/config/passport');
app.use(require('./src/routes'));

//error handling is problematic gives 500 status
//Error handlers & middlewares
// if(!isProduction) {
//   app.use((req, res, err) => {
//     res.status(err.status || 500);
//  res.json({
//       errors: {
//         message: err.message,
//         error: err,
//       },
//     });
//   });
// }

// app.use((req, res, err) => {
//   res.status(err.status || 500);

//   res.json({
//     errors: {
//       message: err.message,
//       error: {"string" : "string"},
//     },
//   });
// });

//app.listen(8000, () => console.log('Server running on http://localhost:8000/'));

app.use('/src/style', express.static(`${__dirname}/src/style`));
app.use('/src/html', express.static(`${__dirname}/src/html`));
app.use('/src/scripts', express.static(`${__dirname}/src/scripts`));
app.use('/src/assets', express.static(`${__dirname}/src/assets`));
//app.use('/src/jquery-csv', express.static(__dirname + '/src/jquery-csv'));

//test if auth.required protects route
app.get('/', auth.required,(req, res) => res.redirect('/src/html/login_logout_page.html'));

app.listen(port, () => console.log(`app listening on port ${port}!`));

const Schema = mongoose.Schema;

const wcfbSchema = new Schema({
    week: Number,
    csvString: String,
}, { collection: 'csvfiles-dev' });

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
