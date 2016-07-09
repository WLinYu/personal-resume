/**
 * Created by trigkit4 on 16/6/3.
 */
var gulp        =   require('gulp');
var rename      =   require('gulp-rename');
var less        =   require('gulp-less');
var jade        =   require('gulp-jade');
var browserSync =   require('browser-sync').create();
var cssmin      =   require('gulp-cssmin');
var plumber     =   require('gulp-plumber');
var runSequence =   require('run-sequence');
var plugins = require('gulp-load-plugins')();

// markdown syntax support
var markdownify = function (json) {
    var jsonStr = JSON.stringify(json);

    return JSON.parse(
        jsonStr
            .replace(/(\*{2})(.*?)\1/g, '<strong>$2</strong>')
            .replace(/`([^`]+)`/g, '<code>$1</code>')
            .replace(/(\\{2})\[([^\\]*)\1\]\1\(([^\\]*)\1\)/g, '<a href=\'$3\' target=\'_blank\'>$2</a>')
    )
};

//compile jade
gulp.task('jade', function () {
    var data = require('./resume.json');

    //locals: JSON.parse( fs.readFileSync('./markup/data/website_data.json', { encoding: 'utf8' }) )

    return gulp
        .src('src/jade/index.jade')
        .pipe(
            plumber()
        )
        .pipe(
            jade({
                pretty: true,
                locals: markdownify(data)
            })
        )
        .pipe(
            rename('index.html')
        )
        .pipe(
            gulp.dest('build')
        )
        .pipe(
            browserSync.stream()
        )
});

//compile less
gulp.task('less', function () {
    return gulp
        .src('src/less/index.less')
        .pipe(
            plumber()
        )
        .pipe(
            less()
        )
        .pipe(
            gulp.dest('build/assets/css')
        )
        .pipe(
            browserSync.stream()
        )
});

//copy static files to build/assets
gulp.task('copy:static', function () {
    return gulp
        .src(['src/!(jade)/**'])
        .pipe(
            gulp.dest('build/assets')
        )
});

//copy js to build/assets/js
gulp.task('copy:js', function () {
    return gulp
        .src([
            'bower_components/jquery/dist/jquery.js',
            'script.js'
        ])
        .pipe(
            gulp.dest('build/assets/js')
        )
        .pipe(
            browserSync.stream()
        )
});

//minify css files
gulp.task('cssmin', function () {
    return gulp
        .src('build/assets/css/*.css')
        .pipe(
            cssmin()
        )
        .pipe(
            gulp.dest('build/assets/css')
        )
});

gulp.task('compile', [
        'jade',
        'less'
    ]);

gulp.task('build', function (cb) {
    runSequence(
        [
            'compile',
            'copy:static',
            'copy:js'
        ],
        cb
    )
});

gulp.task('dev',['build'], function () {
    browserSync.init({
        server: 'build',
        port: 1234
    });

    gulp.watch('src/less/**/*.less',['less']);
    gulp.watch([
        'src/jade/**/*.jade',
        './resume.json'
    ], ['jade']);

    gulp.watch('*.js', function () {
        return gulp
            .src('*.js')
            .pipe(gulp.dest('build/assets/js'))
            .pipe(
                browserSync.stream()
            );
        })
});
gulp.task('build-for-deploy',['less','jade']);

//deploy to github pages
gulp.task('deploy', ['build-for-deploy'], function() {
    return gulp.src('./build/**/*')
        .pipe(plugins.ghPages());
});

gulp.task('default', ['compile']);
