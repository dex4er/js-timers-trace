let original = {
  clearInterval: global.clearInterval,
  clearTimeout: global.clearTimeout,
  setInterval: global.setInterval,
  setTimeout: global.setTimeout
}

let sequence = 0

global.setInterval = (cb, ms, ...args) => {
  const timer = original.setInterval(cb, ms, ...args)
  timer['_sequence'] = ++sequence
  console.trace('setInterval', timer['_sequence'], ms)
  return timer
}

global.clearInterval = (timer) => {
  console.trace('clearInterval', timer['_sequence'])
  original.clearInterval(timer)
}

global.setTimeout = (cb, ms, ...args) => {
  const timer = original.setTimeout(cb, ms, ...args)
  timer['_sequence'] = ++sequence
  console.trace('setTimeout', timer['_sequence'], ms)
  return timer
}

global.clearTimeout = (timer) => {
  console.trace('clearTimeout', timer['_sequence'])
  original.clearTimeout(timer)
}
