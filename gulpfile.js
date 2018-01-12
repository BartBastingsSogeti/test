'use strict';

const browserify = require('browserify');
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const merge = require('merge-stream');
const sass = require('gulp-sass');
const sassLint = require('gulp-sass-lint');
const minify = require('gulp-minify-css');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const log = require('gulplog');
const jshint = require('gulp-jshint');

var pathsBase,
  pathsCss,
  pathsSass,
  pathsJs,
  files,
  configBrowserify;

pathsBase = {
  css : 'site/css/',
  js : 'site/js/'
};

pathsCss = {
  sass : pathsBase.css + 'sass/',
  dev : pathsBase.css + 'dev/',
  dist : pathsBase.css + 'dist/'
};

pathsJs = {
  modules : pathsBase.js + 'modules/',
  dev : pathsBase.js + 'dev/',
  dist : pathsBase.js + 'dist/'
}

pathsSass = {
  components : pathsCss.sass + 'components/'
};

files = {
  sass : pathsCss.sass + 'sass.scss',
  css : pathsBase.css + 'sass.css',
  normalize : pathsBase.css + 'normalize.css',
  js : pathsBase.js + 'app.js'
};

configBrowserify = {
  src: files.js,
  outputDir : pathsJs.dist,
  mapDir : '/maps/',
  outputFile: 'script.min.js',
  config : {
    entries: files.js,
    debug : true
  }
}

/**
 * bundle
 * This method makes it easy to use common bundling options in different tasks
 * @param {browserify}
 */
function bundle(bundler) {
  bundler.bundle()
    .pipe(source(configBrowserify.src))
    .pipe(buffer())
    .pipe(rename(configBrowserify.outputFile))
    .pipe(uglify())
    .pipe(sourcemaps.init({loadMaps : true}))
    .on('error', log.error)
    .pipe(sourcemaps.write(configBrowserify.mapDir))
    .pipe(gulp.dest(configBrowserify.outputDir));
};

gulp.task('default', function(){
  console.log('default taks');
});

gulp.task('css', function () {
  return gulp.src([files.normalize, files.css])
    .pipe(concat('style.css'))
    .pipe(gulp.dest(pathsCss.dev))
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest(pathsCss.dist))
    .pipe(plugins.livereload());
});

gulp.task('css:watch', function () {
  gulp.watch(pathsBase.css + '*.css', ['css']);
});

gulp.task('sass', function () {
  return gulp.src(files.sass)
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(rename('sass.css'))
    .pipe(gulp.dest(pathsBase.css));
});

gulp.task('sass:watch', function () {
  gulp.watch(pathsSass.components + '*.scss', ['sass']);
});

gulp.task('sass:lint', function () {
  return gulp.src([pathsSass.components + '*.scss', files.sass])
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
});

gulp.task('js', function () {
  var bundler = browserify(configBrowserify.config);
  bundle(bundler);
});

gulp.task('js:watch', function () {
  gulp.watch([pathsJs.modules + '*.js', files.js], ['js']);
});

gulp.task('js:hint', function() {
  return gulp.src([pathsJs.modules + '*.js', files.js])
    .pipe(jshint())
    .pipe(jshint.reporter('default', { verbose: true }));
})

gulp.task('watch', ['sass:watch', 'css:watch', 'js:watch']);
