var syntax = require('./syntax.js')
var { fromMarkdown, toMarkdown } = require('./mdast.js')

var warningIssued = false

module.exports = function (options) {

   var data = this.data()

   /* istanbul ignore next - old remark. */
   if (!warningIssued &&
      ((this.Parser &&
         this.Parser.prototype &&
         this.Parser.prototype.blockTokenizers) ||
         (this.Compiler &&
            this.Compiler.prototype &&
            this.Compiler.prototype.visitors))
   ) {
      warningIssued = true
      console.warn('[remark-containers] Warning: please upgrade to remark 13 to use this plugin')
   }

   add('micromarkExtensions', syntax())
   add('fromMarkdownExtensions', fromMarkdown)
   add('toMarkdownExtensions', toMarkdown)

   function add(field, value) {
      /* istanbul ignore if - other extensions. */
      if (data[field]) {
         data[field].push(value)
      }
      else {
         data[field] = [value]
      }
   }
}