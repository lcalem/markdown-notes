var md = require('markdown-it')()
            .use(require('markdown-it-mathjax')());

module.exports = {
  mathjax_demo: function () {
    var result = md.render('$1 *2* 3$');
    return result;
  },
  markdown_demo: function () {
    var result = md.render('# markdown-it rulezz!');
    return result;
  }
};