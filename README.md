# `combine-validations` [![Build status][travis-image]][travis-url] [![NPM version][version-image]][version-url] [![Semantic Release][semantic-release-image]][semantic-release-url] [![Js Standard Style][standard-image]][standard-url]

Provides a way to easily combine [Folktale Validations](http://docs.folktalejs.org/en/latest/api/data/validation/Validation.html).

As of v2, the Validation ADT is passed in as the first argument. This gives back a function which works the same as the main function exported by this package in v1.

This removes this package's dependency on [data.validation](https://github.com/folktale/data.validation) and allows you to work with the Validation in [Folktale 2 and beyond](https://github.com/origamitower/folktale).

## Install

`npm i @justinc/combine-validations`

### Demo

(See tests for more example usage)

```js
const Validation = require('folktale/data/validation')
const combineV = require('@justinc/combine-validations')

const { Success, Failure } = Validation
const combineValidations = combineV(Validation)

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
    * [~combineValidations([Validation], [iterableOfValidations])](#module_@justinc/combine-validations..combineValidations) ⇒ <code>Validation</code>
    * [~Validation](#module_@justinc/combine-validations..Validation) : <code>Object</code>

<a name="module_@justinc/combine-validations..combineValidations"></a>

### @justinc/combine-validations~combineValidations([Validation], [iterableOfValidations]) ⇒ <code>Validation</code>
As of v2, combine-validations takes the Validation ADT implementation to use as an argument.
This function is curried.

**Kind**: inner method of <code>[@justinc/combine-validations](#module_@justinc/combine-validations)</code>  
**Returns**: <code>Validation</code> - The combined Validations as a single Validation  
**See**: Validation  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [Validation] | <code>Validation</code> |  | The Validation ADT to use |
| [iterableOfValidations] | <code>Iterable.&lt;Validation&gt;</code> | <code>[]</code> | The validations to combine |

<a name="module_@justinc/combine-validations..Validation"></a>

### @justinc/combine-validations~Validation : <code>Object</code>
A Validation is a value of [Folktale](http://docs.folktalejs.org/en/latest/index.html)'s
[Validation](http://docs.folktalejs.org/en/latest/api/data/validation/Validation.html) type.

**Kind**: inner typedef of <code>[@justinc/combine-validations](#module_@justinc/combine-validations)</code>  

[travis-image]: https://img.shields.io/travis/justin-calleja/combine-validations.svg?style=flat-square
[travis-url]: https://travis-ci.org/justin-calleja/combine-validations

[version-image]: https://img.shields.io/npm/v/@justinc/combine-validations.svg?style=flat-square
[version-url]: https://npmjs.org/package/@justinc/combine-validations

[semantic-release-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg?style=flat-square
[semantic-release-url]: https://github.com/semantic-release/semantic-release

[standard-image]: https://img.shields.io/badge/code-standard-yellow.svg?style=flat-square
[standard-url]: https://github.com/feross/standard
