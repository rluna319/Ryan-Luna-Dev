const fs = require('fs-extra');
const upath = require('upath');

const destPath = upath.resolve(upath.dirname(__filename), '../dist');

fs.emptyDirSync(destPath);

