var gulp = require('gulp');
var sass = require("gulp-sass");
var mincss = require('gulp-clean-css');
var uglify = require('gulp-uglify')
var minhtml = require('gulp-htmlmin')
var server = require('gulp-webserver');
var url = require('url');
var path = require('path');
var fs = require('fs');
var options = {
    removeComments: true, //清除HTML注释
    collapseWhitespace: true, //压缩HTML
    // collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
    // removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
    // removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
    // removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
    // minifyJS: true, //压缩页面JS
    // minifyCSS: true //压缩页面CSS
};
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
                pathname = pathname === '/' ? '/index.html' : pathname;
                res.end(fs.readFileSync(path.join(__dirname, pathname)))
            }
        }))
})

// 压缩css
gulp.task('mincss', function() {
    gulp.src(['./src/scss/*.css', '!./src/scss/*.min.css'])
        .pipe(mincss())
        .pipe(gulp.dest('build/css'))
})

//压缩js
gulp.task('minjs', function() {
    gulp.src('./src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))
})

// 压缩html
gulp.task('minhtml', function() {
    gulp.src('./src/**/*.html')
        .pipe(minhtml(options))
        .pipe(gulp.dest('build'))
})

gulp.task('default', ['mincss', 'minjs', 'minhtml'])