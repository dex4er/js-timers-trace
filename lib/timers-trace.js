const logger = console.info

const original = {
  clearInterval: global.clearInterval,
  clearTimeout: global.clearTimeout,
  setInterval: global.setInterval,
  setTimeout: global.setTimeout
}

let sequence = 0

global.setInterval = (cb, ms, ...args) => {
  const timer = original.setInterval(cb, ms, ...args)
  timer['_sequence'] = ++sequence
  logger('setInterval', timer['_sequence'], ms)
  return timer
}

global.clearInterval = (timer) => {
  logger('clearInterval', timer['_sequence'])
  original.clearInterval(timer)
}

global.setTimeout = (cb, ms, ...args) => {
  const timer = original.setTimeout(cb, ms, ...args)
  timer['_sequence'] = ++sequence
  logger('setTimeout', timer['_sequence'], ms)
  return timer
}

global.clearTimeout = (timer) => {
  logger('clearTimeout', timer['_sequence'])
  original.clearTimeout(timer)
}
