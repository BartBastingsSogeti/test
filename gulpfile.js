'use strict';

var basePaths,
  cssPaths,
  files,
  gulp,
  sass,
  merge,
  concat,
  rename,
  merge,
  minify;

basePaths = {
  css : 'site/css/',
  js : 'site/js/',
};

cssPaths = {
  sass : basePaths.css + 'sass/',
  dev : basePaths.css + 'dev/',
  dist : basePaths.css + 'dist/'
};

files = {
  sass : cssPaths.sass + 'sass.scss'
};

gulp = require('gulp');
sass = require('gulp-sass');
concat = require('gulp-concat');
rename = require('gulp-rename');
merge = require('merge-stream');
minify = require('gulp-minify-css');

gulp.task('default', function(){
  console.log('default taks');
});

gulp.task('sass', function () {
  return gulp.src(files.sass)
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(rename('style.css'))
    .pipe(gulp.dest('site/css/'))
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('site/css/dist/'));
});

gulp.task('sass:watch', function () {
  gulp.watch(cssPaths.sass + 'components/*.scss', ['sass']);
});

/*
gulp.task('js', function () {

});

gulp.task('js:watch', function () {

});

gulp.task('watch', ['sass:watch', 'js:watch']);
*/
