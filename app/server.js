var express = require("express");
var app = express();

app.set('view engine', 'ejs');

var demo = require('./demo3');

// main page
app.get("/", function(req, res) {
  result = demo.markdown_demo();
  res.render('index', {
        demo_content: result
    });
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
 console.log("Listening on " + port);
});