# star-gist

[![NPM version](https://img.shields.io/npm/v/star-gist.svg)](https://www.npmjs.com/package/star-gist)
[![Build Status](https://travis-ci.org/shinnn/star-gist.svg?branch=master)](https://travis-ci.org/shinnn/star-gist)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/star-gist.svg)](https://coveralls.io/github/shinnn/star-gist)
[![Dependency Status](https://david-dm.org/shinnn/star-gist.svg)](https://david-dm.org/shinnn/star-gist)
[![devDependency Status](https://david-dm.org/shinnn/star-gist/dev-status.svg)](https://david-dm.org/shinnn/star-gist#info=devDependencies)

Star a [gist](https://gist.github.com/)

```javascript
const starGist = require('star-gist');

starGist('2790533', {token: 'xxxx'}).then(response => {
  response.statusCode; //=> 204
  console.log('Starred a gist: https://gist.github.com/2790533');
});
```

## Installation

[Use npm.](https://docs.npmjs.com/cli/install)

```
npm install star-gist
```

## API

```javascript
const starGist = require('star-gist');
```

### starGist(*gistId* [, *options*])

*gistId*: `String` (a [gist](https://help.github.com/articles/about-gists/) ID, for example [https://gist.github.com/tim/34309](https://gist.github.com/tim/34309) → `'34309'`)  
*options*: `Object` ([`gh-get` options](https://github.com/shinnn/gh-get#options))  
Return: [`Promise`](http://www.ecma-international.org/ecma-262/6.0/#sec-promise-constructor) instance

It makes an [API](https://developer.github.com/v3/) request to [star a gist by the authenticated user](https://developer.github.com/v3/gists/#star-a-gist), and returns a promise.

The promise will be [*fulfilled*](https://promisesaplus.com/#point-26) with an [`http.IncomingMessage`](https://nodejs.org/api/http.html#http_http_incomingmessage) object if successful, otherwise [*rejected*](https://promisesaplus.com/#point-30) with an error.

```javascript
starGist('ab12852099', {token: 'xxxxxx'}).catch(err => {
  err.message;
  //=> '404 Not Found (Gist not found: https://gist.github.com/ab12852099)'
});

starGist('2790533', {token: 'invalid_token'}).catch(err => {
  err.message;
  //=> '401 Unauthorized (Bad credentials)'
});
```

## Related Projects

* [is-gist-starred](https://github.com/shinnn/is-gist-starred) (Check if you have starred a given gist or not) 
* [unstar-gist](https://github.com/shinnn/unstar-gist) (Unstar a gist)

## License

Copyright (c) 2015 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).
