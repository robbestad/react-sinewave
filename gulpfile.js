var gulp = require('gulp'),
    concat = require('gulp-concat'),
    php2html = require("gulp-php2html"),
    scss = require('gulp-sass'),
    changed = require('gulp-changed'),
    csso = require('gulp-csso'),
    less = require('gulp-less'),
    uglify = require('gulp-uglify'),
    prettify = require('gulp-prettify'),
    cssmin = require('gulp-cssmin'),
    browserify = require('browserify'),
    autoprefixer = require('gulp-autoprefixer'),
    imagemin = require('gulp-imagemin'),
    del = require('del'),
    notify = require("gulp-notify"),
    sourcemaps = require("gulp-sourcemaps"),
    pngcrush = require('imagemin-pngcrush'),
    react = require('gulp-react'),
    browserSync = require('browser-sync'),
    watchify = require('watchify'),
    reactify = require('reactify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    reload = browserSync.reload,
    shell = require('gulp-shell');

var paths = {
    scripts: ['./.build/js/libs.js', './.build/js/app.js'],
    jslibs: [
        'bower_components/jquery/dist/jquery.js',
        //'bower_components/react/react.js',
        'bower_components/bootstrap/dist/js/bootstrap.js'
    ],
    images: 'src/img/**/*',
    jsx: './src/jsx/app.jsx',
    distJs: './dist/js',
    distCss: './dist/css',
    html: 'src/**/*.html',
    bundle: 'app.js',
    buildJs: './.build/js',
    php: 'src/**/*.php',
    less: 'src/bootstrap/less/bootstrap.less',
    fonts: [
        'src/fonts/**/*',
        'bower_components/font-awesome/fonts/**/*',
        'bower_components/bootstrap/fonts/**/*'
    ],
    scss: ['bower_components/font-awesome/scss/font-awesome.scss',
        'src/scss/main.scss'
    ]
};

/*
gulp.task('jsx', function () {
    return gulp.src(paths.jsx)
        .pipe(react())
        .pipe(gulp.dest('src/js'));
});
*/
gulp.task('jsx', function () {
    return browserify({
               //do your config here
                entries: paths.jsx
            })
            .bundle()
            .pipe(source('app.js'))
             //do all processing here.
             //like uglification and so on.
            .pipe(gulp.dest('src/js'));
});





gulp.task('php', function () {
    return gulp.src(paths.php)
        .pipe(gulp.dest('dist'))
        .pipe(gulp.dest('build'));
});

//gulp.task('php2html', function () {
//    return gulp.src(paths.php)
//        .pipe(php2html())
//        .pipe(prettify())
//        .pipe(gulp.dest('dist'));
//});

gulp.task('fonts', function () {
    return gulp.src(paths.fonts)
        .pipe(gulp.dest('dist/fonts'))
        .pipe(gulp.dest('build/fonts'));
});

gulp.task('sass', function () {
    return gulp.src(paths.scss)
        .pipe(scss())
        .pipe(autoprefixer())
        .pipe(cssmin())
        .pipe(gulp.dest('src/css'));
});

gulp.task('less', function () {
    return gulp.src(paths.less)
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(cssmin())
        .pipe(gulp.dest('src/css'));
});

gulp.task('css', ['less', 'sass'], function () {
    return gulp.src([
          'src/css/bootstrap.css', 
          'src/css/font-awesome.css',
          'src/css/main.css'
    ])
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('dist/css'))
        .pipe(gulp.dest('build/css'));
});

//
//// Render all the JavaScript files
//gulp.task('jscripts', ['jsx'], function () {
//    return gulp.src(paths.scripts)
//        .pipe(uglify({'mangle': false}))
//        .pipe(concat('scripts.min.js'))
//        .pipe(gulp.dest('dist/js'))
//        .pipe(gulp.dest('build/js'));
//});
// Render all the JavaScript files



gulp.task('jscripts', function () {
    return browserify(paths.jsx)
        .transform(reactify)
        .bundle()
        .pipe(source('app.js'))
        .pipe(gulp.dest('dist/js'))
});

// Copy all static libraries
gulp.task('jslibs', function () {
    return gulp.src(paths.jslibs)
        .pipe(concat('libs.min.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(gulp.dest('build/js'));
});

// Run git add
// src is the file(s) to add (or ./*)
gulp.task('git-add', function(){
    return gulp.src('./src/*')
        .pipe(git.add());
});

// Run git commit
// src are the files to commit (or ./*)
gulp.task('git-commit', ['git-add'], function(){
    return gulp.src('.')
        .pipe(git.commit('auto-commit'));
});

// Copy all static images
gulp.task('images', function () {
    return gulp.src(paths.images)
        // Pass in options to the task
        .pipe(imagemin({
            optimizationLevel: 5,
            progressive: true,
            svgoPlugins: [
                {removeViewBox: false}
            ],
            use: [pngcrush()]
        }))
        .pipe(gulp.dest('dist/img'))
        .pipe(gulp.dest('build/img'));
});


gulp.task('push', shell.task([
    'git add .',
    'git commit -am"autocommit"',
    'git push -u origin master"',
    'git subtree push --prefix dist heroku master'
]));

// Execute the built-in webserver
gulp.task('webserver', function () {
    gulp.src('dist')
        .pipe(webserver({
            livereload: true,
            path: 'dist',
            port: '8085',
            directoryListing: false,
            open: true
        }));
});

// Rerun the task when a file changes
gulp.task('watch', function () {
    gulp.watch(paths.scripts, ['jscripts']);
    gulp.watch('src/jsx/**/*', ['jscripts']);
    gulp.watch(paths.jsx, ['jscripts']);
    gulp.watch(paths.scss, ['css']);
    gulp.watch('src/scss/**/*', ['css']);
    gulp.watch(paths.html, ['html']);
    //gulp.watch(paths.php, ['php2html']);
    gulp.watch(paths.php, ['php']);
    gulp.watch(paths.images, ['images']);
});

// gulp main tasks
gulp.task('default', ['css','jscripts','images','jslibs','php']);
gulp.task('watchify', ['default', 'watch']);
gulp.task('watcher', ['watch', 'css', 'fonts', 'jscripts', 'images', 'jslibs', 'php']);
gulp.task('serve', ['watch', 'css', 'fonts', 'jscripts', 'images', 'jslibs', 'php', 'webserver']);
gulp.task('heroku', [ 'css', 'fonts', 'jscripts', 'images', 'jslibs',  'php', 'push']);

