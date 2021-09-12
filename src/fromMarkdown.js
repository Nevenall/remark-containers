export default {
   canContainEols: ['textDirective'],
   enter: {
      container: enterContainer,
      containerFence: enterFence,
      configuration: enterConfiguration,
      noparse: enterNoparse
   },
   exit: {
      container: exitContainer,
      containerFence: exitFence,
      configuration: exitConfiguration,
      noparse: exitNoparse
   }
}

function enterContainer(token) {
   console.log('[enterContainer]', token)
}

function exitContainer(token) {
   console.log('[exitContainer]', token)
}

function enterFence(token) {
   console.log('[enterFence]', token)
}

function exitFence(token) {
   console.log('[exitFence]', token)
}

function enterConfiguration(token) {
   console.log('[enterConfiguration]', token)

   // start an object for configuration
   this.buffer() // Capture EOLs
   this.setData('containerConfiguration', [])
}

function enterNoparse(token) {
   console.log('[enterNoparse]', token)
}

function exitNoparse(token) {
   console.log('[exitNoparse]', token)
}

function exitConfiguration(token) {
   console.log('[exitConfiguration]', token)

   // decode the config
   this.getData('containerConfiguration').push([
      'config',
      this.sliceSerialize(token)
   ])
}