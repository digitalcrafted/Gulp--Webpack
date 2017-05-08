var gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    filter = require('gulp-filter'),
    order = require('gulp-order'),
    rev = require('gulp-rev-append'),
    purifycss = require('gulp-purifycss'),
    cssnano = require('gulp-cssnano'),
    htmlreplace = require('gulp-html-replace'),
    babili = require("gulp-babili");

// Define base folders
var src = 'src/';
var dest = 'dist/';
var foundation_path = 'node_modules/foundation-sites/js/';
var jquery_path = 'node_modules/jquery/dist/';

// paths
var paths = {
    js: [
        //jquery 
        jquery_path + 'jquery.js',
        // Foundation core - needed if you want to use any of the components below 
        foundation_path + 'foundation.core.js',
        // Pick the components you need in your project 
        //foundation_path + 'foundation.util.box.js',
        foundation_path + 'foundation.util.keyboard.js',
        foundation_path + 'foundation.util.mediaQuery.js',
        foundation_path + 'foundation.util.motion.js',
        foundation_path + 'foundation.util.nest.js',
        foundation_path + 'foundation.util.timerAndImageLoader.js',
        foundation_path + 'foundation.util.touch.js',
        foundation_path + 'foundation.util.triggers.js',
        // foundation_path + 'foundation.abide.js',
        //foundation_path + 'foundation.accordion.js',
        //foundation_path + 'foundation.accordionMenu.js',
        //foundation_path + 'foundation.drilldown.js',
        foundation_path + 'foundation.dropdown.js',
        foundation_path + 'foundation.dropdownMenu.js',
        foundation_path + 'foundation.equalizer.js',
        //foundation_path + 'foundation.interchange.js',
        //foundation_path + 'foundation.magellan.js',
        foundation_path + 'foundation.offcanvas.js',
        foundation_path + 'foundation.orbit.js',
        //foundation_path + 'foundation.responsiveMenu.js',
        //foundation_path + 'foundation.responsiveToggle.js',
        //foundation_path + 'foundation.reveal.js',
        //foundation_path + 'foundation.slider.js',
        //foundation_path + 'foundation.sticky.js',
        //foundation_path + 'foundation.tabs.js',
        //foundation_path + 'foundation.toggler.js',
        //foundation_path + 'foundation.tooltip.js', 
        //'node_modules/what-input/dist/what-input.js',
        'node_modules/minigram/dist/minigram.js',
        'src/js/app.js'
    ],
    styles: [
        'src/scss/app.scss'
    ],
    html: [
        'src/index.html'
    ],
    partials: {
        'footer': 'src/partials/footer.html',
        'meta': 'src/partials/meta.html',
        'data': 'src/partials/data.html'
    }
}
// Concatenate JS Files
gulp.task('js', function () {
    gulp.src(paths.js)
        .pipe(order([
            //'**/jquery.js', // see path.js for reason
            '**/foundation.core.js',
            '**/foundation.*.js',
            '**/minigram.js',
            '*'
        ]))
        .pipe(concat('app.js'))
        .pipe(babili({
            mangle: {
                keepClassNames: true
            }
        }))
        .pipe(gulp.dest(dest + 'js'))
});
// Compile CSS from Sass files
gulp.task('sass', function () {
    gulp.src(paths.styles)
        .pipe(order([
            '**/app.scss',
            '*'
        ]))
        .pipe(sass({
            outputStyle: 'compressed',
            errLogToConsole: true
        }))
        .pipe(purifycss(['./dist/js/*.js', 'src/*.html', 'src/partials/*.html']))
        .pipe(concat('app.css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(cssnano())
        .pipe(gulp.dest(dest + 'css'))
});
//images
gulp.task('images', function () {
    return gulp.src('src/img/**/*', {
        base: 'src'
    })
        .pipe(gulp.dest(dest))
});
//
gulp.task('fonts', function () {
    return gulp.src('src/fonts/**/*', {
        base: 'src/fonts'
    })
        .pipe(gulp.dest(dest + "/fonts/"))
        .pipe(reload({stream: true}));
});
//html replacements
gulp.task('html', function () {
    gulp.src(paths.html)
        .pipe(htmlreplace({
            'css': '<link href="css/app.min.css" rel="stylesheet">',
            'js': 'js/app.js',
            'title': ' Built via Gulp',
            'footer': {
                src: gulp.src(paths.partials.footer),
                tpl: '%s'
            },
            'meta': {
                src: gulp.src(paths.partials.meta),
                tpl: '%s'
            },
            'data': {
                src: gulp.src(paths.partials.data),
                tpl: '%s'
            }
        }))
        .pipe(gulp.dest(dest))
});
//
gulp.task('rev', function () {
    gulp.src(src + 'index.html')
        .pipe(rev())
        .pipe(gulp.dest('.'));
});
// Default Task
gulp.task('default', ['js', 'sass', 'images', 'rev', 'html']);