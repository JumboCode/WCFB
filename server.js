const express = require('express');

const app = express();
const port = process.env.PORT || 3000;
const path = require('path');

const mongoose = require('mongoose');

mongoose.Promise = global.Promise; mongoose.connect('mongodb://localhost:27017/WCFB');

app.use('/src/style', express.static(`${__dirname}/src/style`));
app.use('/src/html', express.static(`${__dirname}/src/html`));
app.use('/src/scripts', express.static(`${__dirname}/src/scripts`));
app.use('/src/assets', express.static(`${__dirname}/src/assets`));
app.use('/src/jquery-csv', express.static(`${__dirname}/src/jquery-csv`));

app.get('/', (req, res) => res.redirect('/src/html/login_logout_page.html'));

app.listen(port, () => console.log(`app listening on port ${port}!`));

const { Schema } = mongoose;

const wcfbSchema = new Schema({
  week: String,
  csvString: String,
}, { collection: 'csvfiles-dev' });

const inputSchema = new Schema({
  csvString: String,
  flag: Boolean,
});

const CSVFile = mongoose.model('CSVFile', wcfbSchema);

app.get('/test', (req, res) => {
  const row = new CSVFile({
    week: '2/10',
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
      res.end();
    } else {
      /*
            res.json({
                status: 200,
                user: user
            });
            res.end();
            */
    }
  });

  res.send('Added to db!!!');
});

app.get('/test2', (req, res) => {
  res.send({
    changed: 1,
    names: [
      {
        name: 'Dylan',
        id: 1234,
      },
      {
        name: 'Brian',
        id: 2,
      },
      {
        name: 'Trisha',
        id: 8,
      },
      {
        name: 'Lulu',
        id: 88,
      },
    ],
  });
});

app.get('/names-list', (req, res) => {
  CSVFile.findOne({}, {}, { sort: { created_at: -1 } }, (err, post) => {
    res.send({
      csv_file: post,
    });
  });
});
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
