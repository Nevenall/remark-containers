var markdownLineEnding = require('micromark/dist/character/markdown-line-ending')
var whitespace = require('micromark/dist/tokenize/factory-space')

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

      if (code !== 58 /* `:` */) { throw new Error('expected `:`') }

      // todo - open something, perhaps several things
      effects.enter('container')

      return openingFence(code)
   }

   /// match an opening ':::'
   function openingFence(code) {
      if (code === 58) {
         effects.consume(code)
         openingCharacters++
         return openingFence
      }

      // match only 3 ':'
      if (openingCharacters !== 3) {
         return nok(code)
      }

      // todo - exit the container sequence
      return whitespace(effects, afterFence, 'whitespace')(code)
   }


   // todo - after we consume any whitespace after the intial ::: we need to tokenize the words after it
   // right now the html element name is required, there's no default to div. because otherwise we can't really tell 
   // though it can also be the name of the type of the container, because I don't want to loose the customization of various kinds of containers. 
   // though it might be tricker to develop in this state machine. 
   // so, we'll probably have to start marking phrases with quotes to distinguish them from a list of classes.
   // we have either the `::: {element name} [class names]` format or we have `::: {container type} [configuration words]` 
   // the basic format is more or less the same, but the diff is how we interprit
   // can we support default div?  for no element name?
   // so, we probably want to just match the opening, and tokenize everything after the fence as words and let the interpreter deal with them. unless there is something in quotes, then we tokenize that as a single phrase

   /// parse after the initial fence
   // might be nothing
   // might be some words separated by whitespace
   // might include "phrase"
   function afterFence(code) {
      console.log(code)

      return whitespace(effects, words, 'whitespace')(code)
   }


   function words(code){

   }



}

exports.tokenize = tokenizeContainer
exports.concrete = true