const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
app.use('/src/style', express.static(__dirname + '/src/style'));
app.use('/src/html', express.static(__dirname + '/src/html'));
app.use('/src/scripts', express.static(__dirname + '/src/scripts'));
app.use('/src/assets', express.static(__dirname + '/src/assets'));
app.use('/src/jquery-csv', express.static(__dirname + '/src/jquery-csv'));

app.get('/', (req, res) => res.redirect('/src/html/login_logout_page.html')); 
app.listen(port, () => console.log(`app listening on port ${port}!`));

var name_flag = 0

app.get('names', function (req, res) {
    res.json(
        {
            'changed': 1
        }
    )
})

app.get('names/names_list', function (req, res) {
    res.json(
        {
            'names': [
                {'user': 'brian', 'id': 1},
                {'user': 'tom', 'id': 2},
                {'user': 'jack', 'id': 3}
            ]
            
        }
    )
})