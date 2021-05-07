exports.canContainEols = ['textDirective']

exports.enter = {
   container: enterContainer,
   containerFence: enterFence,
   configuration: enterConfiguration
}

exports.exit = {
   container: exitContainer,
   containerFence: exitFence,
   configuration: exitConfiguration
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
   this.setData('containerConfiguration', [])
   this.buffer() // Capture EOLs
}

function exitConfiguration(token) {
   console.log('[exitConfiguration]', token)

   // decode the config
   this.getData('containerConfiguration').push([
      'config',
      this.sliceSerialize(token)
   ])
}