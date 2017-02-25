import test from 'ava'
import Validation from 'data.validation'
import combineValidations from '..'

const { Success, Failure } = Validation

function noStartsWith (prefix) {
  return arg => arg.startsWith(prefix)
    ? Failure([ new Error(`Prefix Error: '${arg}' starts with '${prefix}'`) ])
    : Success('prefix ok')
}

function noEndsWith (suffix) {
  return arg => arg.endsWith(suffix)
    ? Failure([ new Error(`Suffix Error: '${arg}' ends with '${suffix}'`) ])
    : Success('suffix ok')
}

function noLongerThan (l) {
  return arg => arg.length > l
    ? Failure([ new Error(`Length Error: '${arg}' is longer than ${l}`) ])
    : Success(true)
}

test('Should return Success of each Validation if all are successful', t => {
  const input = 'hello world'
  const validation = combineValidations([
    noStartsWith(' ')(input),
    noEndsWith('?')(input),
    noLongerThan(50)(input)
  ])
  t.true(validation.isSuccess)
  const successes = validation.merge()
  t.deepEqual(successes, [ 'prefix ok', 'suffix ok', true ])
})

test('Should return a Success with an empty array if no validations are given', t => {
  const validation = combineValidations()
  t.true(validation.isSuccess)
  const successes = validation.merge()
  t.deepEqual(successes, [])
})

test('Should return a Success with an empty array if an empty array is given', t => {
  const validation = combineValidations([])
  t.true(validation.isSuccess)
  const successes = validation.merge()
  t.deepEqual(successes, [])
})

test('Should work with iterables not just arrays', t => {
  const input = 'hello world'
  const iterable = {}
  iterable[Symbol.iterator] = function* () {
    yield noStartsWith(' ')(input)
    yield noEndsWith('?')(input)
  }
  const validation = combineValidations(iterable)
  t.true(validation.isSuccess)
  const successes = validation.merge()
  t.deepEqual(successes, [ 'prefix ok', 'suffix ok' ])
})

test('Should be able to combine errors when using a Failure of Array<Error>', t => {
  const input = 'hello world'
  const validation = combineValidations([
    noStartsWith('h')(input),
    noEndsWith('d')(input),
    noLongerThan(5)(input)
  ])
  t.true(validation.isFailure)
  const errors = validation.merge()
  t.is(errors.length, 3)
  t.true(errors[0].message.startsWith('Prefix Error:'))
  t.true(errors[1].message.startsWith('Suffix Error:'))
  t.true(errors[2].message.startsWith('Length Error:'))
})

test('Should be able to combine errors but ignore those which pass', t => {
  const input = 'hello world'
  const validation = combineValidations([
    noStartsWith('h')(input),
    noEndsWith('!')(input),
    noLongerThan(5)(input)
  ])
  t.true(validation.isFailure)
  const errors = validation.merge()
  t.is(errors.length, 2)
  t.true(errors[0].message.startsWith('Prefix Error:'))
  t.true(errors[1].message.startsWith('Length Error:'))
})
