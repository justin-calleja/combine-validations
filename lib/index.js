/**
 * @module @justinc/combine-validations
 */

const curry = require('lodash.curry')

/**
 * A Validation is a value of [Folktale](http://docs.folktalejs.org/en/latest/index.html)'s
 * [Validation](http://docs.folktalejs.org/en/latest/api/data/validation/Validation.html) type.
 * @typedef {Object} Validation
 */

/**
 * As of v2, combine-validations takes the Validation ADT implementation to use as an argument.
 * This function is curried.
 * @param  {Validation}  [Validation] The Validation ADT to use
 * @param  {Iterable<Validation>}  [iterableOfValidations=[]] The validations to combine
 * @return {Validation} The combined Validations as a single Validation
 * @see Validation
 */
const combineValidations = (Validation) => {
  const Success = Validation.Success

  return (validationsIterator = []) => {
    const validationsArray = Array.from(validationsIterator)
    if (validationsArray.length === 0) return Success([])

    return validationsArray.reduce(
      (acc, validation) => acc.ap(validation),
      Success(curry((...successes) => successes, validationsArray.length))
    )
  }
}

module.exports = combineValidations
