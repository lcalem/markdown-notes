const express = require("express");
const md = require('markdown-it')({
  html:         true,
  breaks:       true,
  linkify:      true,
  typographer:  false,
  quotes: '“”‘’'
})
            .use(require('markdown-it-mathjax')());
const fs = require('fs');
var app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.static('../notes/test'));

var demo = require('./demo3');

// main page
app.get("/", function(req, res) {
  var path = '/notes/test/test.md';
  var file = fs.readFileSync(path, 'utf8');
  rendered_md = md.render(file.toString());
  res.render('index', {
      demo_content: rendered_md
  });

});

app.get("/notes/:filename", function(req, res) {
  var path = '/notes/' + req.params.filename.replace("-", "/") + '.md';
  var file = fs.readFileSync(path, 'utf8');
  rendered_md = md.render(file.toString());
  res.render('index', {
      demo_content: rendered_md
  });

});

app.get("/demo", function(req, res) {
  result = demo.markdown_demo();
  res.render('index', {
      demo_content: result
  });
});

app.get("/math", function(req, res) {
  var path = '/notes/tools/latex.md';
  var file = fs.readFileSync(path, 'utf8');
  rendered_md = md.render(file.toString());
  res.render('index', {
      demo_content: rendered_md
  });
})

var port = process.env.PORT || 3000;
app.listen(port, function() {
 console.log("Listening on " + port);
});