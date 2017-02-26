/**
 * @module @justinc/combine-validations
 */

const Validation = require('data.validation')
const curry = require('lodash.curry')

const Success = Validation.Success

/**
 * A Validation is a value of [Folktale](http://docs.folktalejs.org/en/latest/index.html)'s
 * [Validation](http://docs.folktalejs.org/en/latest/api/data/validation/Validation.html) type.
 * @typedef {Object} Validation
 */

/**
 *
 * @param  {Iterable<Validation>}  [iterableOfValidations=[]] The validations to combine
 * @return {Validation} The combined Validations as a single Validation
 * @see Validation
 */
function combineValidations (validationsIterator = []) {
  const validationsArray = Array.from(validationsIterator)
  if (validationsArray.length === 0) return Success([])

  return validationsArray.reduce(
    (acc, validation) => acc.ap(validation),
    // Success(curryN(validationsArray.length, (...successes) => successes))
    Success(curry((...successes) => successes, validationsArray.length))
  )
}

module.exports = combineValidations
