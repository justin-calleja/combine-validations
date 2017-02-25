# `combine-validations` [![NPM version][version-image]][version-url] [![Js Standard Style][standard-image]][standard-url]

Provides a way to easily combine [Folktale Validations](http://docs.folktalejs.org/en/latest/api/data/validation/Validation.html).

## Install

`npm i @justinc/combine-validations`

### Example of usage

(See tests for more example usage)

```js
const Validation = require('data.validation')
const combineValidations = require('@justinc/combine-validations')

const { Success, Failure } = Validation

function noStartsWith (prefix) {
  return arg => arg.startsWith(prefix)
    // use `new Error` instead of `String` in Failure if you want stack trace
    ? Failure([ `Prefix Error: '${arg}' starts with '${prefix}'` ])
    : Success('prefix ok')
}

function noEndsWith (suffix) {
  return arg => arg.endsWith(suffix)
    // use `new Error` instead of `String` in Failure if you want stack trace
    ? Failure([ `Suffix Error: '${arg}' ends with '${suffix}'` ])
    : Success('suffix ok')
}

const input = 'hello world'

const v1 = combineValidations([
  noStartsWith(' ')(input),
  noEndsWith('?')(input)
])
const v2 = combineValidations([
  noStartsWith('h')(input),
  noEndsWith('?')(input)
])
const v3 = combineValidations([
  noStartsWith('h')(input),
  noEndsWith('world')(input)
])
const v4 = combineValidations()

console.log({v1, v2, v3, v4})
/*
{ v1: Validation { value: [ 'prefix ok', 'suffix ok' ] },
  v2:
   Validation {
     value: [ 'Prefix Error: \'hello world\' starts with \'h\'' ] },
  v3:
   Validation {
     value:
      [ 'Prefix Error: \'hello world\' starts with \'h\'',
        'Suffix Error: \'hello world\' ends with \'world\'' ] },
  v4: Validation { value: [] } }
*/
```

<a name="module_@justinc/combine-validations"></a>

## @justinc/combine-validations

* [@justinc/combine-validations](#module_@justinc/combine-validations)
    * [~combineValidations([validationsIterator])](#module_@justinc/combine-validations..combineValidations) ⇒ <code>Validation</code>
    * [~Validation](#module_@justinc/combine-validations..Validation) : <code>Object</code>

<a name="module_@justinc/combine-validations..combineValidations"></a>

### @justinc/combine-validations~combineValidations([validationsIterator]) ⇒ <code>Validation</code>
**Kind**: inner method of <code>[@justinc/combine-validations](#module_@justinc/combine-validations)</code>  
**Returns**: <code>Validation</code> - The combined Validations as a single Validation  
**See**: Validation  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [validationsIterator] | <code>Iterator.&lt;Validation&gt;</code> | <code>[]</code> | The validations to combine |

<a name="module_@justinc/combine-validations..Validation"></a>

### @justinc/combine-validations~Validation : <code>Object</code>
A Validation is a value of [Folktale](http://docs.folktalejs.org/en/latest/index.html)'s
[Validation](http://docs.folktalejs.org/en/latest/api/data/validation/Validation.html) type.

**Kind**: inner typedef of <code>[@justinc/combine-validations](#module_@justinc/combine-validations)</code>  

[version-image]: https://img.shields.io/npm/v/@justinc/combine-validations.svg?style=flat-square
[version-url]: https://npmjs.org/package/@justinc/combine-validations

[standard-image]: https://img.shields.io/badge/code-standard-brightgreen.svg?style=flat-square
[standard-url]: https://github.com/feross/standard
