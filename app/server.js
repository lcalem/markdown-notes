const express = require("express");
const fs = require('fs');
const md = require('markdown-it')({
  html:         true,
  breaks:       true,
  linkify:      true,
  typographer:  false,
  quotes: '“”‘’'
}).use(require('markdown-it-mathjax')());

var app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.static('../notes/test'));

var demo = require('./demo3');

// main page
app.get("/", function(req, res) {
  var path = '/notes/'

  var walkSync = function(dir, filelist) {
    var fs = fs || require('fs'),
        files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function(file) {
      if (file.startsWith('.')) {
        return;
      }
      if (fs.statSync(dir + file).isDirectory()) {
        filelist = walkSync(dir + file + '/', filelist);
      }
      else if (file.endsWith('.md')) {
        filelist.push(dir + file);
      }
    });
    return filelist;
  };

  var file_paths = walkSync(path, []);

  var links = [];
  file_paths.forEach(function(path) {
    var url = path.replace('/notes/', '').replace('/', '-').replace('.md', '');
    var name = '';

    // this is probably seriously unoptimized
    var parts = url.split('-')
    for (var i=0; i<parts.length; i++) {
      if (i < parts.length - 1) {
        name += '[' + parts[i] + ']';
      }
      else {
        name += ' ' + parts[i]
      }
    }
    links.push({'url': url, 'name': name})
  });

  // index page rendering with all paths
  res.render('indexfiles', {
    files: links
  })

});

app.get("/notes/:filename", function(req, res) {
  var path = '/notes/' + req.params.filename.replace("-", "/") + '.md';
  var file = fs.readFileSync(path, 'utf8');
  rendered_md = md.render(file.toString());
  res.render('index', {
      demo_content: rendered_md
  });

});

app.get("/test", function(req, res) {
  var path = '/notes/test/test.md';
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