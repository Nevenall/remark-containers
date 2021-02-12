exports.canContainEols = ['textDirective']

exports.enter = {
   container: enterContainer,
   containerFence: enterFence
}

exports.exit = {
   container: exitContainer,
   containerFence: exitFence
}


function enterContainer(token) {
   // enter.call(this, 'container', token)
   console.log(`[enterContainer] ${token}`)
}


function exitContainer(token) {
   debugger
}

function enterFence(token) {
   debugger
}

function exitFence(token) {
   debugger
}