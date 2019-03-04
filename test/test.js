var assert = require('assert')
var unified = require('unified')
var markdown = require('remark-parse')
var remark2rehype = require('remark-rehype')
var html = require('rehype-stringify')
var tokenizeWords = require('space-separated-tokens')

var containers = require('../src/index')

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
   .use(html)



describe('remark-containers', function() {

   var tests = [{
         testing: "nested containers",
         md: `
::: div drop-caps-list
::: div drop-cap 1
**Choose a crew type.** The crew type determines the group’s purpose, their special abilities, and how they advance.

You begin at **Tier 0**, with **strong hold** and 0 {rep}. You start with 2 {coin}.
:::
:::

What if we have a paragraph between these containers?

::: columns
## Header of my other div

and some content to mak us all happy
:::
      
`,
         expected: `<h1>Title with <span class="term-2">term</span> with some <span class="term-2">text</span> after.</h1>`
      },
      {
         testing: "don't wrap a block with a duplicate html element",
         md: `
::: table
header 1 | header 2
---------|----------
value 1 | value 2
:::         
`,
         expected: `todo - we expect this to throw, it throws a length undefined error`
      }
   ]

   tests.forEach(function(test) {

      it(test.testing, function() {
         processor.process(test.md, function(err, file) {
            if (err) assert.fail(err)
            assert.equal(file.toString(), test.expected)
         })
      })

   })
})