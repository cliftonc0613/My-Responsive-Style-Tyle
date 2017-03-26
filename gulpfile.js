// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    plumber = require('gulp-plumber'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    cleanCSS = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    browsersync = require('browser-sync');

// Enter URL of your local server here
// Example: 'http://localwebsite.dev'
var URL = 'http://responsivestyletiles.dev';

// ===== Variable for output directory
var outputDir   = '/build/';

// error function for plumber
var onError = function (err) {
    gutil.beep();
    console.log(err);
    this.emit('end');
};

// Browser definitions for autoprefixer
var AUTOPREFIXER_BROWSERS = [
    'last 3 versions',
    'ie >= 8',
    'ios >= 6',
    'android >= 4.4',
    'bb >= 10'
];

// Datestamp for cache busting
var getStamp = function() {
    var myDate = new Date();

    var myYear = myDate.getFullYear().toString();
    var myMonth = ('0' + (myDate.getMonth() + 1)).slice(-2);
    var myDay = ('0' + myDate.getDate()).slice(-2);
    var mySeconds = myDate.getSeconds().toString();

    var myFullDate = myYear + myMonth + myDay + mySeconds;

    return myFullDate;
};

// Browsersync task
gulp.task('browser-sync', ['build'], function() {

    var files = [
        '**/*.html',
        'assets/images/**/*.{png,jpg,gif}',
    ];

    browserSync.init(files, {
        // Proxy address
        proxy: URL,

        // Port #
        // port: PORT
    });
});

// BrowserSync reload all Browsers
gulp.task('browsersync-reload', function () {
    browsersync.reload();
});

// Optimize Images task
gulp.task('images', function() {
    return gulp.src('./assets/images/**/*.{png,jpg,gif}')
        .pipe(imagemin({
            progressive: true,
            interlaced: true,
            svgoPlugins: [ {removeViewBox:false}, {removeUselessStrokeAndFill:false} ]
        }))
        .pipe(gulp.dest('./public_html/assets/img/'))
});

gulp.task('minify-css', function() {
    return gulp.src('styles/*.css')
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('dist'));
});
// ===== JSHint Task
gulp.task('jshint', function() {
    return gulp.src('assets/javascript/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(notify('Jshint - Successful'));
});