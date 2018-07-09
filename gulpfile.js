var gulp = require('gulp');
var sass = require("gulp-sass");
var mincss = require('gulp-clean-css');
var uglify = require('gulp-uglify')
var minhtml = require('gulp-htmlmin')
var server = require('gulp-webserver');
var es6 = require('gulp-babel')
var autoprefixer = require('gulp-autoprefixer');
var url = require('url');
var path = require('path');
var fs = require('fs');
var options = {
    removeComments: true, //清除HTML注释
    collapseWhitespace: true, //压缩HTML
};
var data = require('./data/data.json')
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 8080,
            liverload: true, //自动刷新
            open: true, // 自动打开浏览器
            middleware: function(req, res, next) { //拦截前端请求
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return;
                }
                if (pathname === '/api/list') {
                    res.end(JSON.stringify({ code: 1, mag: data }))
                } else {
                    pathname = pathname === '/' ? '/index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
                }
            }
        }))
})

// 压缩css
gulp.task('mincss', function() {
    gulp.src(['./src/scss/*.css', '!./src/scss/*.min.css'])
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >=4.0']
        }))
        .pipe(mincss())
        .pipe(gulp.dest('build/css'))
})

//压缩js
gulp.task('minjs', function() {
    gulp.src('./src/js/style.js')
        .pipe(es6({
            presets: ['es2015']
        }))
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))
})

// 压缩html
gulp.task('minhtml', function() {
    gulp.src('./src/**/*.html')
        .pipe(minhtml(options))
        .pipe(gulp.dest('build'))
})

gulp.task('build', ['server', 'mincss', 'minjs', 'minhtml'])