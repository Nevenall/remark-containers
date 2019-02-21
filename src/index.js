var regex = /:::\s*(?<type>\S+)[\r\t\f\v ]*(?<options>.*?)\n(?<body>.*?):::/s

function plugin(options) {

   options = options || {}

   // if options is valid, with a type, and a transform function
   // then we should create a special function named typeContainer and add that
   // so, if we don't specify a custom container, would we to still add the default?
   // what would be the most expected? I think not do it.

   var useCustomTokenizer = false

   if (options.type !== undefined && options.type !== '' && options.transform !== undefined) {
      useCustomTokenizer = true
   }

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

   function customTokenizer(eat, value, silent) {
      if (value.startsWith(":::")) {
         // might be a match
         var m = regex.exec(value)

         // only match containers of the specified type
         if (m && m.groups.type === options.type) {

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
                  hName: options.element || 'div'
               }
            }

            node.children = this.tokenizeBlock(body, now)
            // pass the transform a tokenize function with the current location in case they want to parse the config 
            options.transform(node, config, (value) => this.tokenizeInline(value, now))

            add(node)

            eat(':::')
            exit()
         }
      }
   }

   const Parser = this.Parser
   const blockTokenizers = Parser.prototype.blockTokenizers
   const blockMethods = Parser.prototype.blockMethods

   if (useCustomTokenizer) {
      blockTokenizers[options.type] = customTokenizer
      blockMethods.splice(blockMethods.indexOf('fencedCode') + 1, 0, options.type)
   } else {
      blockTokenizers.containers = defaultTokenizer
      blockMethods.splice(blockMethods.indexOf('fencedCode') + 1, 0, 'containers')
   }
}


module.exports = plugin