const express = require("express");
const fs = require('fs');
const md = require('markdown-it')({
  html:         true,
  breaks:       true,
  linkify:      true,
  typographer:  false,
  quotes: '“”‘’'
});

md.use(require('markdown-it-mathjax')());
md.use(require('markdown-it-imsize'));
md.use(require("markdown-it-anchor"));
md.use(require("markdown-it-table-of-contents"), {'includeLevel': [2, 3]});

var app = express();

app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.static(__dirname + '/notes/'));

var demo = require('./demo3');

var walkSync = function(dir, filelist) {
  var fs = fs || require('fs'),
      files = fs.readdirSync(dir);
  filelist = filelist || [];
  var toplevel = [];
  files.forEach(function(file) {
    if (file.startsWith('.')) {
      return;
    }
    if (fs.statSync(dir + file).isDirectory()) {
      toplevel.push(file);
      filelist = walkSync(dir + file + '/', filelist)["filelist"];
    }
    else if (file.endsWith('.md')) {
      filelist.push(dir + file);
    }
  });

  return {
    "filelist": filelist,
    "toplevel": toplevel
  };
};

var linksFromPaths = function(file_paths) {
  var links = [];
  file_paths.forEach(function(path) {
    var url = path.replace('/notes/', '').split('/').join('-').replace('.md', '');
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
  return links;
};

// main page
app.get("/", function(req, res) {
  var path = '/notes/'

  var paths = walkSync(path, []);
  var file_paths = paths["filelist"];
  var toplevel = paths["toplevel"];

  var links = linksFromPaths(file_paths);

  console.log("blblblblbl");
  console.log(toplevel);

  // index page rendering with all paths
  res.render('indexfiles', {
    files: links,
    toplevel: toplevel,
    title: "Notes!"
  })

});

// specific page
app.get("/notes/:filename", function(req, res) {
  var path = '/notes/' + req.params.filename.split('-').join('/') + '.md';
  var file = fs.readFileSync(path, 'utf8');
  rendered_md = md.render(file.toString());
  res.render('index', {
      demo_content: rendered_md
  });

});

// category page
app.get("/notes/type/:folder", function(req, res) {
  var path = '/notes/' + req.params.folder + '/';
  var file_paths = walkSync(path, [])["filelist"];
  var links = linksFromPaths(file_paths);

  res.render('indexfiles', {
    files: links,
    toplevel: undefined,
    title: req.params.folder
  })
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