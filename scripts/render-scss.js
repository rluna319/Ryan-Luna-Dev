'use strict';
const autoprefixer = require('autoprefixer')
const fs = require('fs-extra');
const packageJSON = require('../package.json');
const upath = require('upath');
const postcss = require('postcss')
const sass = require('sass');

const stylesPath = '../src/scss/styles.scss';
const destPath = upath.resolve(upath.dirname(__filename), '../dist/css/styles.css');

module.exports = function renderSCSS() {
    
    const results = sass.renderSync({
        data: entryPoint,
        includePaths: [
            upath.resolve(upath.dirname(__filename), '../node_modules')
        ],
    });

    const destPathDirname = upath.dirname(destPath);
    fs.ensureDirSync(destPathDirname);

    postcss([ autoprefixer ]).process(results.css, {from: 'styles.css', to: 'styles.css'}).then(result => {
        result.warnings().forEach(warn => {
            console.warn(warn.toString())
        })
        fs.writeFileSync(destPath, result.css.toString());
    })
};

const entryPoint = `/*!
* ${packageJSON.title} v${packageJSON.version} (${packageJSON.homepage})
* Based on Start Bootstrap
* Copyright 2013-${new Date().getFullYear()} ${packageJSON.author}
* Licensed under ${packageJSON.license} (see LICENSE file in the project root for more information)
*/
@import "${stylesPath}"
`