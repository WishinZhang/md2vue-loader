const hljs = require('highlight.js');
const mdit = require('markdown-it');
const emoji = require('markdown-it-emoji');
const classes = require('@toycode/markdown-it-class');
const classMapping = require('./classMapping');
const handleBlock = require('./handleBlock');

let md = null;

module.exports = function (source, options) {
  if (!md) {
    md = mdit({
      html: true,
      highlight: (str, lang) => {
        let codeType = lang;
        if (['js', 'jsx', 'mjs', 'mjsx', 'javascript'].indexOf(lang) > -1) {
          codeType = 'javascript';
        } else if (['html', 'vue'].indexOf(lang) > -1) {
          codeType = 'html';
        }
        if (codeType && hljs.getLanguage(codeType)) {
          try {
            return `<pre v-pre class="hljs">${hljs.highlight(codeType, str, true).value}<code></code></pre>`;
          } catch (error) {
            console.error(error);
          }
        } else {
          return '';
        }
      }
    });
    handleBlock(md, options);
    // 支持 emoji
    if (options.emoji === true) {
      md.use(emoji);
    }
    // 支持自定义 class
    if (options.classPrefix) {
      md.use(classes, classMapping(options.classPrefix));
    }
    if (options.mdUse && typeof options.mdUse === 'function') {
      options.mdUse(md);
    }
  }
  return md.render(source);
}

