var gulp = require("gulp");
var sass = require("gulp-sass");
var uglify = require("gulp-uglify");
var minifyCss = require("gulp-minify-css");

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
// watching tasks
gulp.task('watch', function () {
    gulp.watch('src/js/*.js', ['scripts']);
    gulp.watch('src/sass/**/*.scss', ['sass']);
});

gulp.task('default', ['scripts', 'sass', 'watch']);