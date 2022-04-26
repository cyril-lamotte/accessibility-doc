const { watch, src, series, dest }  = require('gulp');
const { paths } = require('./config.js');
const webpack      = require('webpack-stream');
const webpackCfg   = require('../webpack.config');

function jsTranspileMain() {
  return jsTranspile('main', 'main');
}

function jsTranspileContact() {
  return jsTranspile('contact', 'contact');
}

function jsTranspileSliders() {
  return jsTranspile('sliders', 'sliders');
}

function jsTranspile(name, folder) {
  webpackCfg.output.filename = `${name}-bundle.js`;
  return src([`${paths.scripts.i}${folder}/**/*.js`])
    .pipe(webpack(webpackCfg))
    .on('error', (err) => {
      console.error('WEBPACK ERROR', err);
      this.emit('end'); // Don't stop the rest of the task
    })
    .pipe(dest(paths.scripts.o));
}

function copyScripts() {
  return src(`${paths.scripts.i}contrib/*`)
    .pipe(dest(`${paths.scripts.o}contrib`));
}

function JSwatch() {
  watch(`${paths.scripts.i}**/*.js`, {
    ignoreInitial: false
  }, series(copyScripts, jsTranspileMain, jsTranspileSliders, jsTranspileContact));
}

exports.build = series(copyScripts, jsTranspileMain, jsTranspileSliders, jsTranspileContact);
exports.watch = JSwatch;
