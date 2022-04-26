/**
 * Tasks automation.
 *
 * CSS are compiled with the SASS preprocessor.
 *
 */
const { watch, src, dest, series } = require('gulp');
const { paths, log } = require('./config.js');

const sass           = require('gulp-dart-sass');      // Compile SASS code.
const postcss        = require('gulp-postcss');        // Post CSS features.
const autoprefixer   = require('autoprefixer');        // Add browsers prefix.
const cleanCSS       = require('gulp-clean-css');      // Minify CSS.
const sourcemaps     = require('gulp-sourcemaps');     // Generate SASS sourcemap.
const sassGlob       = require('gulp-sass-glob');      // SASS glob.
const ignore         = require('gulp-ignore');         // Exclude files.
const stylelint      = require('@ronilaukkarinen/gulp-stylelint');      // CSS code quality.
const browserSync    = require('browser-sync').create();
const postCssNormal  = require('postcss-normalize');

/**
 * Build CSS
 *
 * SASS Compilation
 * Sourcemaps
 * Autoprefixer
 *
 * @returns {Stream} Stream
 */
function CSS() {
  log('');
  log('');

  return src(`${paths.styles.i}**/*.scss`, { sourcemaps: true })
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass({ includePaths: ['node_modules'] }))
    .on('error', onError)
    .pipe(postcss([autoprefixer()]))
    .pipe(postcss([postCssNormal()]))
    .pipe(cleanCSS({
      compatibility: '*',
      format: 'beautify' // 'beautify' | false
    }, (details) => {
      showCleanEffect(details);
    }))
    .pipe(sourcemaps.write('../../sources/maps'))
    .pipe(dest(paths.styles.o))
    .pipe(browserSync.stream());
}

function showCleanEffect(details) {
  const ko = 1024;
  const fixedLength = 2;
  const originalSize = Math.round(details.stats.originalSize) / ko;
  const minifiedSize = Math.round(details.stats.minifiedSize) / ko;

  const message = `${details.name}: ${originalSize.toFixed(fixedLength)}ko >> ${minifiedSize.toFixed(fixedLength)}ko`;
  log(message);
}

/**
 * Check SCSS syntax.
 *
 * @returns {Stream} Stream.
 */
function lintCSS() {
  // Add lines here to exclude some files from linting.
  // Ex: .pipe(ignore.exclude('_my-file.scss'))
  return src(`${paths.styles.i}**/*.scss`)
    .pipe(stylelint({
      customSyntax: 'postcss-scss',
      fix: true,
      reporters: [{
        formatter: 'string',
        console: true
      }]
    }));
}

// Errors managment
function onError(err) {
  log(err.message);
  this.emit('end');
}

function CSSwatch() {
  watch(`${paths.styles.i}**/*.scss`, { ignoreInitial: false }, series(CSS, lintCSS));
}

exports.build = series(CSS, lintCSS);
exports.watch = CSSwatch;
