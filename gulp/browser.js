const { paths } = require('./config.js');
const browserSync = require('browser-sync').create();

/**
  * Copy statics ressources.
  *
  * @param {function} cb
  *   Callback
  *
  * @returns {void}
  */
function browser(cb) {
  browserSync.init({
    open: false,
    server: {
      baseDir: paths.dist
    },
    ui: false
  });

  cb();
}

exports.run = browser;
