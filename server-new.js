var express = require('express');
var app = express();
var path = require('path');

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '/', 'template.html'));
});

app.listen(80, function () {
  console.log('Example app listening on port 80!');
});