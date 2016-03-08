var gulp = require("gulp");
var sass = require("gulp-sass");
var uglify = require("gulp-uglify");
var minifyCss = require("gulp-minify-css");
var browserSync = require('browser-sync').create();

// css
gulp.task('sass', function () {
    return gulp.src('src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(minifyCss())
        .pipe(gulp.dest('dist/css'));

});
// scripts
gulp.task('scripts', function () {
        gulp.src('src/js/*.js')
            .pipe(uglify())
        .pipe(gulp.dest('dist/js'));

});
// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "http://localhost/web/uoc-project/uoc-project-2/"
        }
    });
});
// watching tasks
gulp.task('watch', function () {
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/sass/**/*.scss', ['sass']);
});

gulp.task('default', ['scripts', 'sass', 'browser-sync', 'watch']);