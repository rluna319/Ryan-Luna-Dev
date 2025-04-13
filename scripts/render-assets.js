'use strict';
const fs = require('fs-extra');
const upath = require('upath');

module.exports = function renderAssets() {
    const sourcePath = upath.resolve(upath.dirname(__filename), '../src/assets');
    const destPath = upath.resolve(upath.dirname(__filename), '../dist/.');
    
    fs.copySync(sourcePath, destPath);
};