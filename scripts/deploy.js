const ghpages = require('gh-pages');
const packageJson = require('../package.json');

// Custom message using the version from package.json
const packageVersion = process.env.npm_package_version;
const message = `v${packageVersion}`;

// Deploy the contents of the 'dist' directory to gh-pages
ghpages.publish('dist', {
  branch: 'gh-pages',
  message: message
}, (err) => {
  if (err) {
    console.error('Deploy failed:', err);
  } else {
    console.log(`Successfully deployed ${message}`);
  }
});
