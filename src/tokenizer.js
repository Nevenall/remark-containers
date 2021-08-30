import { markdownLineEnding, markdownSpace } from 'micromark-util-character'







export default  {
   tokenize: tokenizeContainer,
   concrete: true
}



function tokenizeContainer(effects, ok, nok) {
   let self = this
   let openingCharacters = 0
   let previous

   return start

   function start(code) {
      // note - not sure we need this guard
      // if (code === null || code === -5 || code === -4 || code === -3) {
      //    return nok(code)
      // }

      if (code !== 58 /* : */) { throw new Error('expected `:`') }

      // todo - open something, perhaps several things
      effects.enter('container')
      effects.enter('containerFence')
      return openingFence(code)
   }

   /// match an opening ':::'
   function openingFence(code) {
      if (code === 58 /* : */) {
         effects.consume(code)
         openingCharacters++
         return openingFence
      }

      // match only 3 ':'
      if (openingCharacters !== 3) {
         return nok(code)
      }
      effects.exit('containerFence')
      return whitespace(effects, openConfiguration, 'whitespace')(code)
   }

   // todo - after we consume any whitespace after the intial ::: we need to tokenize the words after it
   // ::: noparse 
   // right now the html element name is required, there's no default to div. because otherwise we can't really tell 
   // though it can also be the name of the type of the container, because I don't want to loose the customization of various kinds of containers. 
   // though it might be tricker to develop in this state machine. 
   // so, we'll probably have to start marking phrases with quotes to distinguish them from a list of classes.
   // we have either the `::: noparse {element name} [class names]` format or we have `::: {container type} [configuration words]` 
   // the basic format is more or less the same, but the diff is how we interprit
   // can we support default div?  for no element name?
   // so, we probably want to just match the opening, and tokenize everything after the fence as words and let the interpreter deal with them. unless there is something in quotes, then we tokenize that as a single phrase

   // parse after the initial fence
   // might be nothing
   // might be some words separated by whitespace
   // might include "phrase"

   // so, seems flow means our context is already broken into lines. 
   // so we get `::: noparse element-name class-name`
   function openConfiguration(code) {
      if (!markdownLineEnding(code)) {
         effects.enter('configuration')
         return configuration
      }
      // there is no configuration, but that is ok, proceed with the container content
      return content(code)
   }



   /// Parse configuration
   /// we can either deal with the config as one string, or we can try to tokenize the config into individual words
   /// we want the config values for downstream parsing

   /// Ok, config might be nothing, whitespace to line ending
   /// or it might be some individual words
   /// it might also be a phrase wrapped in "", '', or ``
   /// I think that's good
   /// 

   function configuration(code) {
      // note - if the config is ever over the js recursion limit of ~ 15000 depending on the browser this will fail. 

      // try noparse
      return noparse(code)

      // if (!markdownLineEnding(code)) {
      //    return noparse(code)
      // }

      // we've consumed all of the config, time for contents
      effects.exit('configuration')
      return content(code)
   }

   function noparse(code) {

      var letters = []

      // if consume and check each
      // either recuse or flat out try and consume each  letter
      // I think if we don't call exit 
      // then 


      return function (code) {

         effects.check(110)


         if (code === 110 /* n */ || code === 78 /* N */) {
            effects.enter('noparse')
            letters.push('n')
            effects.consume(code)

            // return a function, because otherwise we don't have the next code

            // 
            // then we recurse and check the array 
            // then we can assemble the array


         }
      }

   }


   function content(code) {
      effects.enter('content')
      effects.exit('content')
      return ok(code)
   }


   function whitespace(code) {
      if (code === -2 || code === -1 || code === 32) {
        effects.consume(code)
        return whitespace
      }
   
      if (code === null || code === -5 || code === -4 || code === -3) {
        return ok(code)
      }
   
      return nok(code)
    }
   


}
