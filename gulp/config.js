// Get config in package.json.
const pkg = require('../package.json');

exports.paths   = pkg.buildPaths;
exports.config  = pkg.config;
exports.project = pkg.name;
exports.log = require('fancy-log');
exports.$ = require('gulp-load-plugins')(); // Automatic plugins loads.
exports.del = require('del'); // Remove files.;
