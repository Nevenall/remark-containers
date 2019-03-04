var unified = require('unified')
var markdown = require('remark-parse')
var remark2rehype = require('remark-rehype')
var format = require('rehype-format')
var html = require('rehype-stringify')

var report = require('vfile-reporter')

var tokenizeWords = require('space-separated-tokens')

var containers = require('./src/index')


var processor = unified()
   .use(markdown)

   .use(containers, {
      default: true,
      custom: [{
         type: 'sidebar',
         element: 'aside',
         transform: function(node, config, tokenize) {
            node.data.hProperties = {
               className: config || 'left'
            }
         }
      }, {
         type: 'callout',
         element: 'article',
         transform: function(node, config, tokenize) {
            node.data.hProperties = {
               className: config || 'left'
            }
         }
      }, {
         type: 'quote',
         element: 'aside',
         transform: function(node, config, tokenize) {
            var words = tokenizeWords.parse(config)

            node.data.hProperties = {
               className: `quoted ${words.shift()}`
            }
            node.children.push({
               type: 'footer',
               data: {
                  hName: 'footer'
               },
               children: tokenize(words.join(' '))
            })
         }
      }]
   })

   .use(remark2rehype)
   .use(format)
   .use(html)



const fs = require('fs')

const text = fs.readFileSync('readme.md')


processor.process(text, function(err, file) {
   console.error(report(err || file))
   console.log(String(file))
})