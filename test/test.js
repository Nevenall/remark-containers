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

::: div columns
## Header of my other div

and some content to mak us all happy
:::
      
`,
         expected: `<div class="drop-caps-list"><div class="drop-cap 1"><p><strong>Choose a crew type.</strong> The crew type determines the group’s purpose, their special abilities, and how they advance.</p><p>You begin at <strong>Tier 0</strong>, with <strong>strong hold</strong> and 0 {rep}. You start with 2 {coin}.</p></div></div>
         <p>What if we have a paragraph between these containers?</p>
         <div class="columns"><h2>Header of my other div</h2><p>and some content to mak us all happy</p></div>`
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