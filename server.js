const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
app.use('/src/style', express.static(__dirname + '/src/style'));
app.use('/src/html', express.static(__dirname + '/src/html'));
app.use('/src/scripts', express.static(__dirname + '/src/scripts'));
app.use('/src/assets', express.static(__dirname + '/src/assets'));
app.use('/src/jquery-csv', express.static(__dirname + '/src/jquery-csv'));

app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/src/html/login_logout_page.html')));

app.listen(port, () => console.log(`app listening on port ${port}!`));
