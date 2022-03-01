'use strict';

//Gulp plugins
const {src, dest, watch, series, parallel} = require('gulp');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const stylelint = require('gulp-stylelint');
const sass = require('gulp-sass')(require('sass'));
// const sourcemaps = require('gulp-sourcemaps');

// Postcss plugins
const utilities = require('postcss-utilities');
const pxtorem = require('postcss-pxtorem');
const presetenv = require('postcss-preset-env');
const cssnano = require('cssnano');

//External plugins
const browsersync = require('browser-sync');
const del = require('del');

// Constants and Variables
const server = browsersync.create();

const paths = {
  scss: {
    src: './scss/**/*.scss',
    dest: './css',
    index: './scss/main.scss'
  },
  html: {
    src: './*.html'
  },
  js: {
    src: './js/**/*.js'
  }
};


// Tasks

const cleanTask = async () => await del([paths.scss.dest]);

function stylelintTask() {
    return src(paths.scss.src)
      .pipe(stylelint({
        reporters: [
          {formatter: 'string', console: true}
        ]
      }));
}

function scssTask() {
  const plugins = [
    utilities(),
    pxtorem({propList: ['*', '!border', '!letter-spacing', '!box-shadow'], mediaQuery: true}),
    presetenv({browsers: 'last 2 versions'})
  ];

  return src(paths.scss.index)
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(plugins))
    .pipe(dest(paths.scss.dest))
    .pipe(postcss([cssnano()]))
    .pipe(rename({extname: '.min.css'}))
    .pipe(dest(paths.scss.dest))
}

function browserSyncServe(done) {
  server.init({
    server: {
      baseDir:'./'
    }
  });
  done();
}

function browserSyncReload(done) {
  server.reload();
  done();
}

function watchTask() {
  watch(paths.html.src).on('change', server.reload);
  watch(paths.js.src).on('change', server.reload);
  watch(paths.scss.src, series([stylelintTask, scssTask, browserSyncReload]));
}

exports.server = browserSyncServe;

exports.default = series(
  cleanTask,
  stylelintTask,
  scssTask,
  browserSyncServe,
  watchTask
);
