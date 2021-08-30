import report from 'vfile-reporter'
import {unified} from 'unified'
import parse from 'remark-parse'
import containers from './src/index.js'
import remark2rehype from 'remark-rehype'
import format from 'rehype-format'
import stringify from 'rehype-stringify'
import {fromMarkdown} from 'mdast-util-from-markdown'
import {micromark} from 'micromark'


(async () => {

   let hardText = `pl
::: noparse div outer
# Header One

Outer contents.

 ::: div inner
 Inner contents. 
 :::

More outer contents.
::: 
`

   let easyText = `::: noparse div outer
# Header One

Contents.

::: 
`

   let mdast = unified()
      .use(parse)
      .use(containers)
      .parse(easyText)


   console.log(mdast)

   // debugger

   let hast = await unified().use(remark2rehype).run(mdast)

   console.log(hast)

   // debugger

   let html = unified().use(stringify).stringify(hast)

   console.log(html)

   debugger

})()