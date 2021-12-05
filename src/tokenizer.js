import { markdownLineEnding, markdownSpace } from 'micromark-util-character'
import { factoryWhitespace } from 'micromark-factory-whitespace'
import { factorySpace } from 'micromark-factory-space'
import { codes } from 'micromark-util-symbol/codes'
import { types } from 'micromark-util-symbol/types'


export default {
   tokenize: tokenizeContainer,
   concrete: true
}

function tokenizeContainer(effects, ok, nok) {
   let self = this
   let colonsSeen = 0
   let previous

   return start

   function start(code) {
      if (code !== codes.colon) { throw new Error('expected `:`') }
      effects.enter('container')
      effects.enter('containerFence')
      return openingFence(code)
   }

   /// match an opening ':::'
   function openingFence(code) {
      if (code === codes.colon) {
         effects.consume(code)
         colonsSeen++
         return openingFence
      }

      // match only 3 ':'
      if (colonsSeen !== 3) {
         return nok(code)
      }
      effects.exit('containerFence')

      return content(code)
   }


   function content(code) {
      if (code === null) {
         effects.exit('containerContent')
         return ok(code)
      }
      effects.enter('containerContent')

      // attempt to tokenize the container contents
      // what exactly are we attempting? is this look for an immediate closing fence, otherwise deal with the contents?
      // or is this something else?
      return effects.attempt({ tokenize: tokenizeClosingFence, partial: true }, code => {
         console.log('[ReturnState]')
         effects.exit('containerContent')
         effects.exit('container')
         return ok(code)
      }, code => {
         console.log('[BogusState]')
         return nok(code)
      })(code)


   }


   // i get it, this is like a sub-state machine
   // this is copied from remark-directive
   function tokenizeClosingFence(effects, ok, nok) {
      let size = 0
      return factorySpace(effects, closingPrefixAfter, 'linePrefix', 4)
      /** @type {State} */

      function closingPrefixAfter(code) {
         effects.enter('containerFence')
         // effects.enter('directiveContainerSequence')
         return closingSequence(code)
      }
      /** @type {State} */

      function closingSequence(code) {
         if (code === 58) {
            effects.consume(code)
            size++
            return closingSequence
         }

         if (size !== 3) return nok(code)
         // effects.exit('directiveContainerSequence')
         return factorySpace(effects, closingSequenceEnd, 'whitespace')(code)
      }
      /** @type {State} */

      function closingSequenceEnd(code) {
         if (code === null || markdownLineEnding(code)) {
            effects.exit('containerFence')
            return ok(code)
         }

         return nok(code)
      }
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
   function configuration(code) {
      // note - if the config is ever over the js recursion limit of ~ 15000 depending on the browser this will fail. 

      // check for 'noparse'
      //effects.attempt({}, noparse, configuration)(code)

      //   noparse(code)

      // if (!markdownLineEnding(code)) {
      //    return noparse(code)
      // }

      // we've consumed all of the config, time for contents
      effects.exit('configuration')
      return content(code)
   }

   function noparse(code) {
      // if consume and check each
      // either recuse or flat out try and consume each  letter
      // I think if we don't call exit 
      // then 

      // check for the word noparse
      if (code === 110 || code === 78) {
         effects.enter('noparse')
         effects.consume(code)
      } else {
         // the first character is not an 'N' so we reconsume
         return
      }
      if (code === 111 || code === 79) {

      }

      // if we get all the way to the end noparse is a true thing
      effects.exit('noparse')

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
