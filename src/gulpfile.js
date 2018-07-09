var gulp = require('gulp');
var sass = require("gulp-sass");
var mincss = require('gulp-clean-css');
var uglify = require('gulp-uglify')
var minhtml = reuire('gulp-htmlmin')


// 压缩css
gulp.task('mincss', function() {
    gulp.src(['./src/scss/*.css', '!/src/scss/*.min.css'])
        .pipe(mincss())
        .pipe(gulp.dest('build/css'))
})

// 压缩js
gulp.task('minjs', function() {
    gulp.src('./src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))
})

// 压缩html
gulp.task('minhtml', function() {
    gulp.src('./src/**/*.html')
        .pipe(minhtml())
        .pipe(gulp.dest('build'))
})