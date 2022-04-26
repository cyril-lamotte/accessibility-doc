const { watch, src, dest }  = require('gulp');
const { paths } = require('./config.js');
const fileinclude  = require('gulp-file-include');   // HTML includes.
const browserSync  = require('browser-sync').create();

function HTML() {
  return src([
    `${paths.html.i}**/*.html`,
    `!${paths.html.i}includes/**/*.html`,
  ])
    .pipe(fileinclude({
      prefix: '<!-- @@',
      suffix: '-->',
      basepath: '@file',
      indent: true
    }))
    .pipe(dest(paths.html.o))
    .pipe(browserSync.stream());
}

function HTMLwatch() {
  // Static mockup only.
  const htmlPaths = [
    `${paths.html.i}**/*.html`,
    `!${paths.html.i}**/*Copie.html`,
  ];

  watch(htmlPaths, { ignoreInitial: false }, HTML);
}

exports.build = HTML;
exports.watch = HTMLwatch;
