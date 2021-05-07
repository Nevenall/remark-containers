var markdownLineEnding = require('micromark/dist/character/markdown-line-ending')
var whitespace = require('micromark/dist/tokenize/factory-space')


var asciiAlpha = require('micromark/dist/character/ascii-alpha')
var asciiAlphanumeric = require('micromark/dist/character/ascii-alphanumeric')
var markdownLineEnding = require('micromark/dist/character/markdown-line-ending')
var markdownLineEndingOrSpace = require('micromark/dist/character/markdown-line-ending-or-space')
var markdownSpace = require('micromark/dist/character/markdown-space')
var createWhitespace = require('micromark/dist/tokenize/factory-whitespace')
var createSpace = require('micromark/dist/tokenize/factory-space')

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
      effects.enter('containerFence')
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
         effects.consume(code)
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
      if (!markdownLineEnding(code)) {
         effects.consume(code)
         return configuration
      }


      // we've consumed all of the config, time for contents
      effects.exit('configuration')
      return content(code)
   }


   function content(code) {
      effects.enter('content')
      effects.exit('content')
      return ok(code)
   }



}

exports.tokenize = tokenizeContainer
exports.concrete = true