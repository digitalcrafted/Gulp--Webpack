var fs = require('fs'),
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    filter = require('gulp-filter'),
    order = require('gulp-order'),
    rev = require('gulp-rev'),
    purifycss = require('gulp-purifycss'),
    cssnano = require('gulp-cssnano'),
    htmlreplace = require('gulp-html-replace'),
    babili = require("gulp-babili");

// Define base folders
var src = 'src/';
var dest = 'dist/';
var jquery_path = 'node_modules/jquery/dist/';
var foundation_path = 'node_modules/foundation-sites/js/';
var root = './';

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
        'node_modules/motion-ui/dist/motion-ui.js',
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
    return gulp.src(paths.js)
        .pipe(order([
            '**/jquery.js',
            '**/foundation.core.js',
            '**/foundation.*.js',
            '**/motion-ui.js',
            '**/minigram.js',
            '*'
        ]))
        .pipe(concat('app.js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(babili({
            mangle: {
                keepClassNames: true
            }
        }))
        .pipe(rev())
        .pipe(gulp.dest(dest + 'js'))  // write rev'd assets to build dir
        .pipe(rev.manifest({
            base: root,
            merge: true // merge with the existing manifest (if one exists)
        }))
        .pipe(gulp.dest(root));
    
});
// Compile CSS from Sass files
gulp.task('sass', function () {
     return gulp.src(paths.styles)
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
        .pipe(rev())
        .pipe(gulp.dest(dest + 'css'))  // write rev'd assets to build dir
        .pipe(rev.manifest({
            base: root,
            merge: true // merge with the existing manifest (if one exists)
        }))
        .pipe(gulp.dest(root));
    
});
//images
gulp.task('images', function (cb) {
    return gulp.src('src/img/**/*', {
        base: 'src'
    })
        .pipe(gulp.dest(dest));
    
});

//html replacements
gulp.task('html', function (cb) {
    var manifest = JSON.parse(fs.readFileSync(root+'rev-manifest.json', 'utf8'));
   return gulp.src(paths.html)
        .pipe(htmlreplace({
            'css': '<link href="css/'+manifest['app.min.css']+'" rel="stylesheet">',
            'js': '<script src="js/'+manifest['app.min.js']+'" type="text/javascript"></script>',
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
        .pipe(gulp.dest(dest));
    
});

// Default Task
gulp.task('default', gulp.series('sass','js', 'images', 'html'));