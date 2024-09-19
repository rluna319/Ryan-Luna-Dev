'use strict';
const fs = require('fs');
const packageJSON = require('../package.json');
const upath = require('upath');
const sh = require('shelljs');

module.exports = function renderScripts() {

    const sourcePath = upath.resolve(upath.dirname(__filename), '../src/js');
    const destPath = upath.resolve(upath.dirname(__filename), '../dist/.');
    
    sh.cp('-R', sourcePath, destPath)

    const copyright = `/*!
* ${packageJSON.title} v${packageJSON.version} (${packageJSON.homepage})
* Based on Start Bootstrap 
* Copyright 2013-${new Date().getFullYear()} ${packageJSON.author}
* Licensed under ${packageJSON.license} (see LICENSE file in the project root for more information)
*/
`
    // Form JS
    const sourcePathFormJS = upath.resolve(upath.dirname(__filename), '../src/js/form.js');
    const destPathFormJS = upath.resolve(upath.dirname(__filename), '../dist/js/form.js');
    const FormJS = fs.readFileSync(sourcePathFormJS);
    fs.writeFileSync(destPathFormJS, copyright + FormJS);

    // Navbar JS
    const sourcePathNavbarJS = upath.resolve(upath.dirname(__filename), '../src/js/navbar.js');
    const destPathNavbarJS = upath.resolve(upath.dirname(__filename), '../dist/js/navbar.js');
    const NavbarJS = fs.readFileSync(sourcePathNavbarJS);
    fs.writeFileSync(destPathNavbarJS, NavbarJS);

    // Skills JS
    const sourcePathSkillsJS = upath.resolve(upath.dirname(__filename), '../src/js/skills.js');
    const destPathSkillsJS = upath.resolve(upath.dirname(__filename), '../dist/js/skills.js');
    const SkillsJS = fs.readFileSync(sourcePathSkillsJS);
    fs.writeFileSync(destPathSkillsJS, SkillsJS);
};