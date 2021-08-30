
import syntax from './syntax.js'
import fromMarkdown from './fromMarkdown.js'
import toMarkdown from './toMarkdown.js'

var warningIssued

export default function (options) {

   let data = this.data()


   add('micromarkExtensions', syntax(options))
   add('fromMarkdownExtensions', fromMarkdown)
   add('toMarkdownExtensions', toMarkdown)

    /**
   * @param {string} field
   * @param {unknown} value
   */
  function add(field, value) {
   const list = /** @type {unknown[]} */ (
     // Other extensions
     /* c8 ignore next 2 */
     data[field] ? data[field] : (data[field] = [])
   )

   list.push(value)
 }
}

