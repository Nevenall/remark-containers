var assert = require('assert')
var unified = require('unified')
var markdown = require('remark-parse')
var remark2rehype = require('remark-rehype')
var html = require('rehype-stringify')
var tokenizeWords = require('space-separated-tokens')

var containers = require('../src/index')

const customContainers = [{
   type: 'sidebar',
   element: 'aside',
   transform: function (node, config, tokenize) {
      node.data.hProperties = {
         className: config || 'left'
      }
   }
}, {
   type: 'callout',
   element: 'article',
   transform: function (node, config, tokenize) {
      node.data.hProperties = {
         className: config || 'left'
      }
   }
}, {
   type: 'quote',
   element: 'aside',
   transform: function (node, config, tokenize) {
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


function runTests(tests, processor) {
   tests.forEach(test => {
      if (test.ignore) return

      it(`(${test.testing})`, function () {
         processor.process(test.md, function (err, file) {
            if (err) assert.fail(err)
            assert.equal(file.toString(), test.expected)
         })
      })

   })
}

describe('basic usage', function () {

   let processor = unified()
      .use(markdown, { commonmark: true })
      .use(containers)
      .use(remark2rehype)
      .use(html)


   let tests = [{
      testing: "can specify element",
      md: `
::: div

# Header One

Contents.

:::
`,
      expected: `<div><h1>Header One</h1><p>Contents.</p></div>`
   }, {
      testing: 'can specify class',
      md: `
::: div my-class

# Header One

Contents.

:::
`,
      expected: `<div class="my-class"><h1>Header One</h1><p>Contents.</p></div>`
   }, {
      testing: 'compact spec',
      md: `
::: div
# Header One
Contents.
:::
`,
      expected: `<div><h1>Header One</h1><p>Contents.</p></div>`
   }, {
      testing: 'can indent containers by upto 2 spaces',
      md: `
  ::: div
  # Header One
  Contents.
  :::
`,
      expected: `<div><h1>Header One</h1><p>  Contents.</p></div>`
   }, {
      testing: 'container terminal can have spaces after it',
      md: `
::: div
# Header One
Contents.
:::   
`,
      expected: `<div><h1>Header One</h1><p>Contents.</p></div>`
   },
   {
      testing: 'noparse disables markdown parsing of container contents for default syntax',
      md: `
::: noparse hero
# Header One
- list
- *list*
:::   
`,
      expected: `<hero># Header One\n- list\n- *list*</hero>`
   }
   ]

   runTests(tests, processor)
})


describe('nested containers', function () {

   let processor = unified()
      .use(markdown, { commonmark: true })
      .use(containers)
      .use(remark2rehype)
      .use(html)


   let tests = [{
      testing: "basic nested container",
      md: `
::: div outer

# Header One

Outer contents.

::: div inner

Inner contents.

:::

More outer contents.

:::
`,
      expected: `<div class="outer"><h1>Header One</h1><p>Outer contents.</p><div class="inner"><p>Inner contents.</p></div><p>More outer contents.</p></div>`
   }
   ]

   runTests(tests, processor)
})


// todo - add tests for custom containers too

// describe('configuration', function () {

//    let processor = unified()
//       .use(markdown, { commonmark: true })
//       .use(containers, {})
//       .use(remark2rehype)
//       .use(html)


//    let tests = [{
//       testing: "default false",
//       md: `
// ::: div

// # Header One

// Contents.

// :::
// `,
//       expected: `<div><h1>Header One</h1><p>Contents.</p></div>`
//    }, {
//       testing: "can skip specific containers",
//       md: `
// ::: div

// # Header One

// Contents.

// :::
// `,
//       expected: `<div><h1>Header One</h1><p>Contents.</p></div>`
//    }]

//    runTests(tests, processor)
// })