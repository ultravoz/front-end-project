var gulp = require("gulp"),
    del = require('del'),
    sass = require("gulp-sass"),
    uglify = require("gulp-uglify"),
    minifyCss = require("gulp-minify-css"),
    browserSync = require('browser-sync').create();


// Definición de direcotrios origen
var srcPaths = {
    scripts:  'src/js/',
    styles:   'src/sass/',
    files:    'src/'
};


// Definición de directorios destino
var distPaths = {
    scripts:  'dist/js/',
    styles:   'dist/css/',
    files:    'dist/'
};

// Limpieza del directorio dist
gulp.task('clean', function(cb) {
    del([ distPaths.files+'*.html', distPaths.scripts+'*.js', distPaths.styles+'*.css'], cb);
});


// Copia de los cambios en los ficheros html en el directorio dist.
gulp.task('html', function() {
    return gulp.src([srcPaths.files+'*.html'])
        .pipe(gulp.dest(distPaths.files))
        .pipe(browserSync.stream());
});
// css
gulp.task('sass', function () {
    return gulp.src(srcPaths.styles+'*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(minifyCss())
        .pipe(gulp.dest(distPaths.styles))
        .pipe(browserSync.stream());

});
// scripts
gulp.task('scripts', function () {
        gulp.src(srcPaths.scripts+'*.js')
            .pipe(uglify())
        .pipe(gulp.dest(distPaths.scripts))
            .pipe(browserSync.stream());

});

gulp.task('serve', ['html', 'sass', 'scripts'], function() {
    browserSync.init({
        logLevel: "info",
        browser: ["google chrome", "Firefox"],
        proxy: "localhost:80",
        startPath: "/web/uoc/front-end-project/dist/"
    });

    gulp.watch(srcPaths.files+'*.html', ['html']);
    gulp.watch(srcPaths.styles+'**/*.scss', ['sass']);
    gulp.watch(srcPaths.scripts+'**/*.js', ['scripts']);
});


gulp.task('default', ['clean', 'serve'], function() {});