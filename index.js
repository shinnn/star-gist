/*!
 * star-gist | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/star-gist
*/
'use strict';

const ghPut = require('gh-put');

module.exports = function starGist(gistId, options) {
  if (typeof gistId !== 'string') {
    return Promise.reject(new TypeError(
      String(gistId) +
      ' is not a string. Expected a gist ID for exmaple https://gist.github.com/tim/34309 -> "34309".'
    ));
  }

  if (gistId === '') {
    return Promise.reject(new Error('Expected a string of gist ID, but received an empty string.'));
  }

  options = Object.assign({}, options);
  options.headers = Object.assign({
    'user-agent': 'https://github.com/shinnn/star-gist'
  }, options.headers);

  return ghPut(`gists/${gistId}/star`, options).then(response => Promise.resolve(response), err => {
    if (err.message === '404 Not Found') {
      err.message += ` (Gist not found: https://gist.github.com/${gistId})`;
    }

    return Promise.reject(err);
  });
};
