exports.tokenize = tokenizeContainer
exports.concrete = true

function tokenizeContainer(effects, ok, nok) {

   var self = this
   // var initialPrefix = prefixSize(this.events, 'linePrefix')
   var sizeOpen = 0
   var previous

   console.log('hit the tokenizer!')
   console.log(this.events)

   return start

   function start(code) {
      /* istanbul ignore if - handled by mm */
      if (code !== 58 /* `:` */) { throw new Error('expected `:`') }
      // effects.enter('directiveContainer')
      // effects.enter('directiveContainerFence')
      // effects.enter('directiveContainerSequence')
      //return sequenceOpen(code)

      // todo - so in the examples, they do a recursive thing where we recurse on the sequence open to see how many opening codes there are
      // we want to find and consume 3 ::: and only ::: if there is a closing code. 
      // how do we find the closing code?
      
   }

}