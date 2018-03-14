var express = require("express");
var app = express();

/* serves main page */
app.get("/", function(req, res) {
  res.sendFile('/index.html')
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
 console.log("Listening on " + port);
});