var gulp = require('gulp');

//load gulp prefixed plugins
var $ = require('gulp-load-plugins')();

//load other plugins
var stylelint = require('stylelint');
var postscss = require('postcss-scss');
var reporter = require('postcss-reporter');
var critical = require('critical').stream;
var browserSync = require('browser-sync').create();
var gutil = require('gulp-util');
var stylish = require('jshint-stylish');

//load scss linter config
var styleLintConfig = require('./styleLintConfig');


//error handler
var onError = function (error) {
    //gutil.log(gutil.colors.red(error.message));
    //this.emit('end');

    $.notify.onError({
        title: "Gulp Error in " + error.plugin,
        message: "\nError: " + error.message.substr(error.message.indexOf('static'))
    })(error);

    gutil.log();

    this.emit('end');
};

/*************************************/
/***** PATHS *************************/
/*************************************/

var paths = {
    scss: {
        src: '../static/scss/**/*',
        main: '../static/scss/main.scss',
        dest: '../static/css/',
        build: '../static/dist/'
    },
    img: {
        src: '../static/img/**/*.{png,jpg,svg}',
        dest: '../static/img/'
    },

    svg: {
        src: '../static/img/*.svg',
        dest: '../static/img'
    }
};

/*************************************/
/***** CONFIG ************************/
/*************************************/

var autoprefixConfig = {
    browsers: ['last 4 versions', 'ie >= 10'],
    cascade: false
};


var postcssPlugins = [
    stylelint(styleLintConfig),
    reporter({clearMessages: true})
];

var syncFiles = [
    //'static/css/*.css',
    '../static/js/main.js',
    '../*.html',
    '../protected/views/**/*.php',
    '../views/**/*.php',
    '../*.php'
];

/*************************************/
/***** HELPER TASKS ******************/
/*************************************/

// BrowserSync.io //
gulp.task('browsersync', function () {
    browserSync.init([
        '../static/css/*.css',
        '../static/js/main.js',
        '../*.html',
        '../protected/views/**/*.php',
        '../views/**/*.php',
        '../*.php'
    ]);

    gulp.watch(syncFiles).on('change', browserSync.reload);
});

//CREATE STYLE.CSS WITHOUT MINIFICATION
gulp.task('localCSS', function () {
    return gulp.src(paths.scss.main)
        .pipe($.plumber({errorHandler: onError}))
        .pipe($.sourcemaps.init())
        .pipe($.sass())
        .pipe($.autoprefixer(autoprefixConfig))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(paths.scss.dest))
        .pipe(browserSync.stream())
});

//LINT SCSS - ERRORS IN CONSOLE - done
gulp.task('lintSCSS', function () {
    return gulp.src([
            '../static/scss/pages/*.scss',
            '../static/scss/modules/*.scss',
            '../static/scss/helpers/*.scss'
        ])
        .pipe($.postcss(
            postcssPlugins,
            {syntax: postscss}
            )
        )
});

/*************************************/
/***** CSS ***************************/
/*************************************/

//BUILD MINIFIED DIST CSS
gulp.task('buildCSS', function () {
    return gulp.src(paths.scss.main)
        .pipe($.plumber({errorHandler: onError}))
        .pipe($.sass())
        .pipe($.combineMq())
        .pipe($.autoprefixer(autoprefixConfig))
        .pipe($.cssnano())
        .pipe($.rename('style.min.css'))
        .pipe(gulp.dest(paths.scss.build))
});

//GENERATE CRITICAL CSS
gulp.task('criticalCSS', function () {

// gulp.src is the file you use for critical css inlining

    return gulp.src('index.html')
        .pipe(critical({
            // base: 'dist/',
            inline: true,
            css: ['../gulp' +
            '../static/css/style.css'],
            minify: true,
            width: 1200,
            height: 900
        }))

        // gulp.dest directory must be the same relative to gulp.src
        // if you want to override the original file

        .pipe(gulp.dest('.'));
});

/*************************************/
/***** OPTIMIZE ASSETS ***************/
/*************************************/

//OPTIMIZE IMAGES
gulp.task('imageMIN', function () {
    return gulp.src(paths.img.src)
        .pipe($.imagemin({
            expand: true
        }))
        .pipe(gulp.dest(paths.img.dest))
});

//OPTIMIZE SVG
gulp.task('svgMIN', function () {
    return gulp.src(paths.svg.src)
        .pipe($.svgmin({
            plugins: [{
                removeViewBox: false
            }, {
                removeUselessStrokeAndFill: false
            }]
        }))
        .pipe(gulp.dest(paths.svg.dest))
});

//CREATE SVG SPRITES
gulp.task('svgSPRITE', ['svgMIN'], function () {
    return gulp.src(paths.svg.src)
        .pipe($.svgstore())
        .pipe($.rename('svg-sprite.svg'))
        .pipe(gulp.dest(paths.svg.dest))
});

/*************************************/
/***** WATCHERS **********************/
/*************************************/

gulp.task('watch:scssLinter', ['lintSCSS'], function () {
    return gulp.src(paths.scss.main)
        .pipe($.sourcemaps.init())
        .pipe($.sass())
        .pipe($.autoprefixer(autoprefixConfig))
        .pipe($.sourcemaps.write())
        .pipe(gulp.dest(paths.scss.dest))
});

//GENERAL WATCHER - CUSTOM JS and SCSS
gulp.task('watcher', function () {
    gulp.watch(paths.scss.src, ['localCSS']);
});

//CSS WATCHER - NO MIN.
gulp.task('watchCSS', ['localCSS'], function () {
    gulp.watch(paths.scss.src, ['localCSS']);
});

//CSS WATCHER WITH LINTER - NO MIN.
gulp.task('watchCSSLinter', function () {
    gulp.watch(paths.scss.src, ['watch:scssLinter']);
});

