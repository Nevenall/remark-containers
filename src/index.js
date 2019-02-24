var regex = /:::\s*(?<type>\S+)[\r\t\f\v ]*(?<options>.*?)\n(?<body>.*?):::/s

function plugin(options) {
   options = options || {
      default: true
   }
   options.custom = options.custom || []

   function defaultTokenizer(eat, value, silent) {
      if (value.startsWith(":::")) {
         // might be a match
         var m = regex.exec(value)

         if (m) {

            if (silent) return true

            var [type, config, body] = [m.groups.type, m.groups.options, m.groups.body]

            // eat the header line
            eat(value.substring(0, value.indexOf('\n') + 1))

            var exit = this.enterBlock()

            var add = eat(body)

            var node = {
               type: type,
               data: {
                  hName: type
               }
            }

            // if there is a config string, use that as the element class
            if (config.trim() !== '') {
               node.data.hProperties = {
                  className: config
               }
            }

            node.children = this.tokenizeBlock(body, eat.now())

            add(node)

            exit()
            eat(':::')
         }
      }
   }

   const Parser = this.Parser
   const blockTokenizers = Parser.prototype.blockTokenizers
   const blockMethods = Parser.prototype.blockMethods

   var insertPoint = blockMethods.indexOf('fencedCode') + 1

   options.custom.forEach(el => {
      if (el.type !== undefined && el.type !== '' && el.transform !== undefined) {
         let name = `${el.type}_container`

         blockTokenizers[name] = function(eat, value, silent) {
            if (value.startsWith(":::")) {
               // might be a match
               var m = regex.exec(value)

               // only match containers of the specified type
               if (m && m.groups.type === el.type) {

                  if (silent) return true

                  var [type, config, body] = [m.groups.type, m.groups.options, m.groups.body]

                  var exit = this.enterBlock()
                  var now = eat.now()

                  // eat the header line
                  eat(value.substring(0, value.indexOf('\n') + 1))

                  var add = eat(body)

                  var node = {
                     type: type,
                     data: {
                        hName: el.element || 'div'
                     }
                  }

                  node.children = this.tokenizeBlock(body, now)
                  // pass the transform a tokenize function with the current location in case they want to parse the config 
                  el.transform(node, config, (value) => this.tokenizeInline(value, now))

                  add(node)

                  eat(':::')
                  exit()
               }
            }
         }

         blockMethods.splice(insertPoint++, 0, name)
      }
   })

   if (options.default) {
      blockTokenizers.container = defaultTokenizer
      blockMethods.splice(insertPoint, 0, 'container')
   }
}

module.exports = plugin