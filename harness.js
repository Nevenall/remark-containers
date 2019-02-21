var unified = require('unified')
var markdown = require('remark-parse')
var remark2rehype = require('remark-rehype')
var html = require('rehype-stringify')
var report = require('vfile-reporter')

var containers = require('./src/index')


var processor = unified()
   .use(markdown)
   .use(containers, {
      type: 'figure-table',
      element: 'figure',
      transform: (node, config, tokenize) => {
       
         node.children.push({
            type: 'figcaption',
            data: {
               hName: 'figcaption'
            },
            children: tokenize(config)
         })

      }
   })
   .use(remark2rehype)
   .use(html)


processor.process(`

# header one

Some text and stuff. 

::: figure-table Table 01 — A Simple Sample Table
one | two | three
---|---|---
a | b | c
:::

::: container
this should render as ordinary text.
:::

and there is more stuff after.

`, function(err, file) {
   console.error(report(err || file))
   console.log(String(file))
})