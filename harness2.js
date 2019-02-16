// var vfile = require('to-vfile')
var report = require('vfile-reporter')
var unified = require('unified')
var parse = require('rehype-parse')
var rehype2remark = require('rehype-remark')
var stringify = require('rehype-stringify')


var processor = unified()
   .use(parse, {
      emitParseErrors: false,
      duplicateAttribute: false,
      fragment: true
   })
   .use(rehype2remark)
   .use(stringify)

var html = `<div class="{option-1}">
   <legend>legendary header text</legend>
   <p>{option-2}</p>
</div>`
var tree = processor.parse(html)

// var result = processor.processSync(html)

console.log(JSON.stringify(tree, null, 3))


// unified()
//    .use(parse, {
//       emitParseErrors: false,
//       duplicateAttribute: false
//    })
//    .use(stringify)
//    .process(`<div><legend>legendary header text</legend><p>some rando div content.</p></div>`, function(err, file) {
//       console.error(report(err || file))
//       console.log(String(file))
//    })