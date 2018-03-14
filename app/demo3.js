var md = require('markdown-it')()
            .use(require('markdown-it-mathjax')());

document.addEventListener(“DOMContentLoaded”, function(){
  var result = md.render('$1 *2* 3$');

  document.getElementById("root").innerHTML = result
});