/**
 * Gulp task definitions.
 */

var coveralls = require('gulp-coveralls');
var gulp = require('gulp');
var istanbul = require('gulp-istanbul');
var nodeunit = require('gulp-nodeunit');
var eslint = require('gulp-eslint');

gulp.task('lint', function () {
  return gulp.src([
    './lib/**/*.js',
    './test/**/*.js'
  ])
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('test', ['lint'], function (cb) {
  gulp.src([
    './lib/**/*.js'
  ])
    .pipe(istanbul()) // Covering files
    .pipe(istanbul.hookRequire()) // Force `require` to return covered files
    .on('finish', function () {
      gulp.src('test/index.js')
        .pipe(nodeunit({
          reporter: 'default'
        }))
        .pipe(istanbul.writeReports()) // Creating the reports after tests runned
        .on('end', cb);
    });
});

gulp.task('coveralls', function (cb) {
  gulp.src('coverage/**/lcov.info').pipe(coveralls());
});

