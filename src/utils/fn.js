export const isDev = process.env.NODE_ENV !== 'production'

const _objToStr = Object.prototype.toString

export const isArray = (...args) => Array.isArray(...args)

export const isFunction = func => typeof func === 'function'

export const isString = x => _objToStr.call(x) === '[object String]'

export const isObject = value => value != null && typeof value === 'object' && !isArray(value)

export const isObjectLike = value => isObject(value) && _objToStr.call(value) === '[object Object]'

export const isPlainObject = value => {
  if (!isObjectLike(value)) {
    return false
  }

  if (!isFunction(value.constructor)) {
    return false
  }

  const prototype = value.constructor.prototype
  if (isObjectLike(prototype) === false) {
    return false
  }

  return prototype.hasOwnProperty('isPrototypeOf') !== false
}

export const log = (...args) => isDev ? console.info(...args) : noop()
Object.keys(console).forEach(fn => (
  log[fn] = (...args) => isDev ? console[fn](...args) : noop()
))

export function noop () {}

export const extractErrorMessage = (errorObject = {}) => {
  const {
    response,
    message = 'There was a problem.',
    errors,
    error
  } = errorObject

  const alertMessage = (response && response.message) || (error && error.message) || message
  const validationErrors = isPlainObject(errors)
    ? Object.keys(errors)
      .map(key => errors[key].join('\n'))
      .join('\n\n')
    : void 0

  return [alertMessage, validationErrors].filter(isString).join('\n\n')
}
