export default {

   enter: {
      container: enterContainer,
      containerFence: enterFence,
      configuration: enterConfiguration,
      containerContent: enterContent,
      noparse: enterNoparse
   },
   exit: {
      container: exitContainer,
      containerFence: exitFence,
      configuration: exitConfiguration,
      containerContent: exitContent,
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


function enterContent(token) {
   console.log('[enterContent]', token)
   this.buffer()
}
function exitContent(token) {
   console.log('[exitContent]', token)
   let content = this.resume()
   console.log(content)
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