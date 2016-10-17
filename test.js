'use strict';

const isGistStarred = require('is-gist-starred');
const starGist = require('.');
const test = require('tape');
const unstarGist = require('unstar-gist');

process.env.GITHB_TOKEN = '';

test('starGist()', t => {
  t.plan(7);

  t.strictEqual(starGist.name, 'starGist', 'should have a function name.');

  unstarGist('908bced575270f6ef80e', {token: process.env.TOKEN_FOR_TEST})
  .then(() => starGist('908bced575270f6ef80e', {token: process.env.TOKEN_FOR_TEST}))
  .then(response => {
    t.strictEqual(response.statusCode, 204, 'should be resolved with a response object.');
    return isGistStarred('908bced575270f6ef80e', {token: process.env.TOKEN_FOR_TEST});
  })
  .then(starred => {
    t.strictEqual(starred, true, 'should star a gist.');
    return unstarGist('908bced575270f6ef80e', {token: process.env.TOKEN_FOR_TEST});
  })
  .catch(t.fail);

  starGist('9'.repeat(99), {token: process.env.TOKEN_FOR_TEST}).then(t.fail, err => {
    t.strictEqual(
      err.message,
      `404 Not Found (Gist not found: https://gist.github.com/${'9'.repeat(99)})`,
      'should fail when it cannot find the gist.'
    );
  }).catch(t.fail);

  starGist('908bced575270f6ef80e', {token: 'invalid_token'}).then(t.fail, err => {
    t.strictEqual(
      err.message,
      '401 Unauthorized (Bad credentials)',
      'should fail when the token is not valid.'
    );
  }).catch(t.fail);

  starGist(1).then(t.fail, err => {
    t.strictEqual(
      err.message,
      '1 is not a string. Expected a gist ID for exmaple https://gist.github.com/tim/34309 -> "34309".',
      'should fail when it takes a non-string argument.'
    );
  }).catch(t.fail);

  starGist('').then(t.fail, err => {
    t.strictEqual(
      err.message,
      'Expected a string of gist ID, but received an empty string.',
      'should fail when the first argument is an empty string.'
    );
  }).catch(t.fail);
});
