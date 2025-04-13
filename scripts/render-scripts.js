'use strict';
const fs = require('fs-extra');
const packageJSON = require('../package.json');
const upath = require('upath');

module.exports = function renderScripts() {
    const sourcePath = upath.resolve(upath.dirname(__filename), '../src/js');
    const destPath = upath.resolve(upath.dirname(__filename), '../dist/js');
    
    // Ensure the destination directory exists
    fs.ensureDirSync(destPath);

    const copyright = `/*!
* ${packageJSON.title} v${packageJSON.version} (${packageJSON.homepage})
* Based on Start Bootstrap 
* Copyright 2013-${new Date().getFullYear()} ${packageJSON.author}
* Licensed under ${packageJSON.license} (see LICENSE file in the project root for more information)
*/
`
    // Form JS
    const sourcePathFormJS = upath.resolve(sourcePath, 'form.js');
    const destPathFormJS = upath.resolve(destPath, 'form.js');
    const FormJS = fs.readFileSync(sourcePathFormJS);
    fs.writeFileSync(destPathFormJS, copyright + FormJS);

    // Navbar JS
    const sourcePathNavbarJS = upath.resolve(sourcePath, 'navbar.js');
    const destPathNavbarJS = upath.resolve(destPath, 'navbar.js');
    const NavbarJS = fs.readFileSync(sourcePathNavbarJS);
    fs.writeFileSync(destPathNavbarJS, NavbarJS);

    // Skills JS
    const sourcePathSkillsJS = upath.resolve(sourcePath, 'skills.js');
    const destPathSkillsJS = upath.resolve(destPath, 'skills.js');
    const SkillsJS = fs.readFileSync(sourcePathSkillsJS);
    fs.writeFileSync(destPathSkillsJS, SkillsJS);
};