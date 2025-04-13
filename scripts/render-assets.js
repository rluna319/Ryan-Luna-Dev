'use strict';
const fs = require('fs-extra');
const upath = require('upath');

module.exports = function renderAssets() {
    const sourcePath = upath.resolve(upath.dirname(__filename), '../src/assets');
    const destPath = upath.resolve(upath.dirname(__filename), '../dist/assets');
    
    // Ensure the destination directory exists and is empty
    fs.emptyDirSync(destPath);
    
    // Copy all assets maintaining directory structure
    fs.copySync(sourcePath, destPath, {
        recursive: true,
        overwrite: true
    });
};