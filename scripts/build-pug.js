'use strict';
const upath = require('upath');
const glob = require('fast-glob');
const renderPug = require('./render-pug');

const srcPath = upath.resolve(upath.dirname(__filename), '../src');

// Find all .pug files except those in includes, mixins, and layouts
const files = glob.sync('**/*.pug', {
    cwd: srcPath,
    ignore: ['**/include/**', '**/mixin/**', '**/pug/layouts/**'],
    absolute: true
});

files.forEach(renderPug);