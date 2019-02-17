// what if we could use rehype to parse some option html so we have the data
// to pass to the add node
// yes, we can easily parse a fragment into a hast and then maybe merge that into the 
// mast tree so

// trigger on ::: type option option some phrase that is the rest of container specification




// confguration is an important part of containers
// you can configure the plugin multiple times 
// once per type
// the trick is configuring options. 
// we want to be able to pass in various class names. left and right for example, 
// but also phrases, like the caption for tables. 
// we could do it with a reg exp? type, options 

// but I think we need better configs
// type has to be a word
// than configure possible options as an array?
// actually, what if we could specify a template?

// like when we define the container
// we have <div class='{option1}'><p>{remainder}</p> </div> 
// than hopefully we can precompile a tree we can inject the values into. 

// the container options specifies a type, then an array of option objects
// each option is one word, except the option will be the remainder of the line. 
// options are {name: option1, }


// might be better to do terms like that too. 
// just need open and closing markers

var regex = /:::\s*(?<type>\S+)[\r\t\f\v ]*(?<options>.*?)\n(?<body>.*):::/s



function plugin(options) {

   function tokenizer(eat, value, silent) {
      if (value.startsWith(":::")) {
         // might be a match
         var m = regex.exec(value)

         if (m) {
            if (silent) return true

            console.log("type: ", m.groups.type)
            console.log("options: ", m.groups.options)
            console.log("body: ", m.groups.body)

            // so can we do this as 1 node?
            // a container with various children?
            // default is a div with a class of type 
var s =''
           

         }

      }


   }

   const Parser = this.Parser

   const blockTokenizers = Parser.prototype.blockTokenizers
   const blockMethods = Parser.prototype.blockMethods
   blockTokenizers.customContainers = tokenizer
   blockMethods.splice(blockMethods.indexOf('fencedCode') + 1, 0, 'customContainers')

}


module.exports = plugin