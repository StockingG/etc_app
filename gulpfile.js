//npm install 即可，如果不行再使用下面
//gulp 需要全局装
//npm install gulp gulp-file-include del express gulp-replace gulp-sequence -g --save-dev

var gulpSequence = require('gulp-sequence');
var gulp = require('gulp');
var fileinclude = require('gulp-file-include');
var assetRev = require('gulp-asset-rev');
var replace = require('gulp-replace');
var rev = require('gulp-rev');
var revCollector = require('gulp-rev-collector');

// node 插件
var del = require('del');
var express = require('express');
var path = require('path');

var app = express();

var port = 12002;
var dev = "http://127.0.0.1:8080/car-monitor-web";
//var dev = "http://192.168.1.134:8080/car-monitor-web";
//var prod = "http://101.69.143.226:10001/car-monitor-web";
var prod = "http://gps.korange.cn/car-monitor-web";
var uat = "";
//定义css、js源文件路径
var cssSrc = 'dist/**/*.css', //dist下css所有文件
    jsSrc = 'dist/**/*.js' ; //dist下所有js文件

var setting = {
    src: './src',
    dist: './dist',
    requestUrlPreffix: prod,
    requestPathPlaceHolder: '${requestPath}$',
};

// 清空输出文件
gulp.task('del', function () {
    return del('dist/**/*');
});

// 复制文件 不包含可以'!src/**'
gulp.task('copy', function () {
    //return gulp.src(['src/*/plugins/**','src/*/img/**','src/*/css/**','src/*/**','src/*/css/**/**','src/*/css/**/**/**','src/*/ui/**/**/**','src/*/ui/**/**','src/*/ui/**','src/**/*'], { base: setting.src })
    return gulp.src(['src/*/plugins/**','src/*/img/**','src/*/css/**','src/*/**','src/*/css/**/**','src/*/css/**/**/**','src/*/ui/**/**/**','src/*/ui/**/**','src/*/ui/**','src/**/*'], { base: setting.src })
    //return gulp.src(['src/**'],{base:setting.src})
        .pipe(gulp.dest(setting.dist));
});
// html include 处理 @@include('include/header.html')
gulp.task('include', function () {
    //return gulp.src(['src/**/*.*'], {base: setting.src})
    return gulp.src(['src/*/pages/**','src/*/js/**'], { base: setting.src })
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(replace(setting.requestPathPlaceHolder, setting.requestUrlPreffix))
        .pipe(gulp.dest(setting.dist));
});

/**
 * add by ljc 增加js css版本号解决浏览器缓存问题
 */
//为css中引入的图片/字体等添加hash编码 //未用
gulp.task('assetRev', function(){
    return gulp.src(cssSrc)  //该任务针对的文件
        .pipe(assetRev()) //该任务调用的模块
        .pipe(gulp.dest('rev/asset')); //编译后的路径
});

//CSS生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revCss', function(){
    return gulp.src(cssSrc)
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/css'));
});


//js生成文件hash编码并生成 rev-manifest.json文件名对照映射
gulp.task('revJs', function(){
    return gulp.src(jsSrc)
        .pipe(rev())
        .pipe(rev.manifest())
        .pipe(gulp.dest('rev/js'));
});


//Html替换css、js文件版本
gulp.task('revHtml', function () {
    return gulp.src(['rev/**/*.json', 'dist/**/*.html'])
        .pipe(revCollector())
        .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
    // 监听到变化
    //return gulp.watch('src/**/*.*', function (event) {
    return gulp.watch(['src/admin/js/**/*.*','src/admin/css/**/*.*','src/admin/img/**/*.*','src/admin/pages/**/*.*','src/*.*','src/js/**/*.*','src/img/**/*.*','src/css/**/*.*','src/*.html'], function(event) {
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');

        if (event.type == 'added' || event.type == 'changed' || event.type == 'renamed') {
            gulp.src(event.path, {base: setting.src})
                .pipe(fileinclude({
                    prefix: '@@',
                    basepath: '@file'
                }))
                .pipe(replace(setting.requestPathPlaceHolder, setting.requestUrlPreffix))
                .pipe(gulp.dest(setting.dist));
            gulp.run("include");
        }
    });
});
gulp.task('start', function (cb) {
    // 本地测试 127.0.0.1 和 local host  有跨域
    app.all('*', function (req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        res.header('Access-Control-Allow-Headers', 'Content-Type');
        next();
    });
    app.use(express.static(path.join(__dirname, setting.dist)))
    app.listen(port, () => {
        console.log('App listening at port ' + port);
    });
    cb();
});

// 默认任务
//gulp.task('default', gulpSequence(['del'], ['copy'], ['include'],['assetRev'], ['revCss'],['revJs'],['revHtml'],['watch'], ['start']));
gulp.task('default', gulpSequence(['del'], ['copy'], ['include'], ['watch'], ['start']));
//gulp.task('default', gulpSequence(['del'], ['copy'], ['include'],['watch'], ['start']));
gulp.task("env-uat", function (cb) {
    setting.requestUrlPreffix = uat;
    cb();
});
gulp.task("env-prod", function (cb) {
    setting.requestUrlPreffix = prod;
    cb();
});
gulp.task('uat', gulpSequence(['del'], ['copy'], ['env-uat'], ['include']));
gulp.task('prod', gulpSequence(['del'], ['copy'], ['env-prod'], ['include']));

