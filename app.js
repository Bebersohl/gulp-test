var express = require('express');
var path = require('path');
var app = express();
app.use(express.static(path.join(__dirname, 'dist')));
app.get('/', function (req, res) {
  res.sendFile('index.html', {root: __dirname + '/website/'})
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
