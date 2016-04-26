'use strict';

module.exports = require('bluebird').promisifyAll(require('redis'));
