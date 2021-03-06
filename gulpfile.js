'use strict';

var autoprefixer = require('gulp-autoprefixer');
var csso = require('gulp-csso');
var del = require('del');
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var runSequence = require('run-sequence');
const babel = require('gulp-babel');
// Set the browser that you want to support
var AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10'
];

// Gulp task to minify CSS files
gulp.task('styles', function () {
    return gulp.src('./src/css/**/*.css')
    // Auto-prefix css styles for cross browser compatibility
        .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
        // Minify the file
        .pipe(csso())
        // Output
        .pipe(gulp.dest('./dist/css'));
});

// Gulp task to minify JavaScript files
gulp.task('scripts', function () {
    return gulp.src('./src/js/**/*.js')
        .pipe(babel({presets: ['es2015']}))
        // Minify the file
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});

// Gulp task to minify all files
gulp.task('default', [], function () {
    del(['dist'])
        .then(() => {
            runSequence(
                'styles',
                'scripts'
            );
        });
});