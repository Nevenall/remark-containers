const syntax = require('./syntax.js')
const fromMarkdown = require('./fromMarkdown.js')
const toMarkdown = require('./toMarkdown.js')

var warningIssued

module.exports = function (options) {

   let data = this.data()

   /* istanbul ignore next - old remark. */
   if (shouldWarn()) {
      warningIssued = true
      console.warn('[remark-containers] Warning: please upgrade to remark 13 to use this plugin')
   }

   add('micromarkExtensions', syntax(options))
   add('fromMarkdownExtensions', fromMarkdown)
   add('toMarkdownExtensions', toMarkdown)

   function add(field, value) {
      /* istanbul ignore if - other extensions. */
      if (data[field]) data[field].push(value)
      else data[field] = [value]
   }
}

function shouldWarn() {
   return !warningIssued &&
      ((this.Parser &&
         this.Parser.prototype &&
         this.Parser.prototype.blockTokenizers) ||
         (this.Compiler &&
            this.Compiler.prototype &&
            this.Compiler.prototype.visitors))
}
