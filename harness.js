(async () => {
   const report = require('vfile-reporter')
   const unified = require('unified')
   const parse = require('remark-parse')
   const containers = require('./src/index.js')
   const remark2rehype = require('remark-rehype')
   const format = require('rehype-format')
   const stringify = require('rehype-stringify')
   const fromMarkdown = require('mdast-util-from-markdown')
   const micromark = require('micromark')

   const tokenizer = require('./src/tokenizer.js')
   const syntax = require('./src/syntax.js')

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


   let mdast = fromMarkdown(text, {
      extensions: [syntax()],
      mdastExtensions: []
   })

   console.log(mdast)

   debugger

   let hast = await unified().use(remark2rehype).run(mdast)

   console.log(hast)

   debugger

   let html = unified().use(stringify).stringify(hast)

   console.log(html)

   debugger

})()