// var unified = require('unified')
// var markdown = require('remark-parse')
// var remark2rehype = require('remark-rehype')
// var format = require('rehype-format')
// var html = require('rehype-stringify')

// var report = require('vfile-reporter')

// var tokenizeWords = require('space-separated-tokens')

// var containers = require('./src/index')


// var processor = unified()
//    .use(markdown)

//    .use(containers, {
//       default: true,
//       custom: [{
//          type: 'sidebar',
//          element: 'aside',
//          transform: function (node, config, tokenize) {
//             node.data.hProperties = {
//                className: config || 'left'
//             }
//          }
//       }, {
//          type: 'callout',
//          element: 'article',
//          transform: function (node, config, tokenize) {
//             node.data.hProperties = {
//                className: config || 'left'
//             }
//          }
//       }, {
//          type: 'quote',
//          element: 'aside',
//          transform: function (node, config, tokenize) {
//             var words = tokenizeWords.parse(config)

//             node.data.hProperties = {
//                className: `quoted ${words.shift()}`
//             }
//             node.children.push({
//                type: 'footer',
//                data: {
//                   hName: 'footer'
//                },
//                children: tokenize(words.join(' '))
//             })
//          }
//       }]
//    })

//    .use(remark2rehype)
//    // .use(format)
//    .use(html, {})



// const fs = require('fs')

// // const text = `
// // ::: div drop-caps-list

// // ::: div drop-cap 1
// // **Choose a crew type.** The crew type determines the group’s purpose, their special abilities, and how they advance.

// // You begin at **Tier 0**, with **strong hold** and 0 {rep}. You start with 2 {coin}.
// // :::

// // :::

// // What if we have a paragraph between these containers?

// // ::: div columns

// // ## Header of my other div

// // and some content to mak us all happy

// // :::
// // `

// // const text = `
// // ::: div outer
// // # Header One
// // Outer contents.

// // ::: quote quote attribution
// // - not 
// // - to be 
// // - parsed
// // :::

// // More outer contents.
// // :::
// // `


// let text = `
// ::: noparse div outer
// # Header One

// Outer contents.

//  ::: div inner
//  Inner contents. 
//  :::

// More outer contents.
// ::: 
// `

// console.log(text)
// processor.process(text, function (err, file) {
//    console.error(report(err || file))
//    console.log(file.toString())
// })




var report = require('vfile-reporter')
var unified = require('unified')
var parse = require('remark-parse')
var containers = require('./src/index.js')
var remark2rehype = require('remark-rehype')
var format = require('rehype-format')
var stringify = require('rehype-stringify')
var visit = require('unist-util-visit')
var h = require('hastscript')


let processor = unified()
   .use(parse)
   .use(containers)
   // .use(htmlDirectives)
   .use(remark2rehype)
   .use(format)
   .use(stringify)


// This plugin is just an example! You can handle directives however you please!
function htmlDirectives() {
   return transform

   function transform(tree) {
      visit(tree, ['textDirective', 'leafDirective', 'containerDirective'], ondirective)
   }

   function ondirective(node) {

      console.log(JSON.stringify(node))

      // var data = node.data || (node.data = {})
      // var hast = h(node.name, node.attributes)

      // data.hName = hast.tagName
      // data.hProperties = hast.properties
   }
}


let text = `
::: noparse div outer
# Header One

Outer contents.

 ::: div inner
 Inner contents. 
 :::

More outer contents.
::: 
`


processor.process(text, function (err, file) {
   console.error(report(err || file))
   console.log(String(file))
})