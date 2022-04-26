const { watch, src, dest }  = require('gulp');
const { paths, del } = require('./config.js');

/**
  * Copy statics ressources.
  *
  * @param {function} cb
  *   Callback
  *
  * @returns {Stream} Stream
  */
function statics(cb) {
  // Copy statics fonts.
  src(`${paths.fonts.i}**`)
    .pipe(dest(paths.fonts.o));

  // Copy statics data.
  src(`${paths.root}**`)
    .pipe(dest(paths.dist));

  // Copy data.
  src(`${paths.data.i}**`)
    .pipe(dest(paths.data.o));

  cb();
}

// Remove files for a fresh start.
function clean() {
  return del([
    'dist/',
  ]);
}

function staticsWatch() {
  watch([
    `${paths.fonts.i}**/*`,
    `${paths.data}**/*`,
    `${paths.root}**/*`,
  ], { ignoreInitial: false }, statics);
}

exports.statics = statics;
exports.clean   = clean;
exports.watch   = staticsWatch;
