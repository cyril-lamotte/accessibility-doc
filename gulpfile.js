/**
 * Tasks automation.
 *
 * Commands :
 * gulp          : Watch and launch compilation.
 * gulp --tasks  : List all available tasks.
 * gulp new-css --home : Will generate home.scss, home folder and _home.scss file.
 */
const { parallel } = require('gulp');
const cfg = require('./gulp/config.js');

/* =============================================================================
   Tasks
============================================================================= */

const files   = require('./gulp/files.js');
const css     = require('./gulp/css.js');
const html    = require('./gulp/html.js');
const js      = require('./gulp/scripts.js');
const browser = require('./gulp/browser.js');

// These tasks need to watch files.
function watcher(cb) {
  css.watch();
  js.watch();
  html.watch();
  files.watch();

  cb();
}

// Just build.
function builder(cb) {
  css.build();
  js.build();

  cb();
}

/* =============================================================================
   Export
============================================================================= */

module.exports = {
  clean: files.clean,
  watch: parallel(watcher),
  build: parallel(builder),
  default: parallel(browser.run, watcher)
};
