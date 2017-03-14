"use strict";

/* REMEMBER THIS (because of gulp-sass):
 - open tools > Projects and Solutions > External Web Tools
 - add "C:\Program Files\nodejs" 
 - move to top of the list
*/

var gulp = require("gulp");
var webserver = require('gulp-webserver');
var sass = require("gulp-sass");
var autoprefixer = require("gulp-autoprefixer");
var sourcemaps = require("gulp-sourcemaps");
var babel = require("gulp-babel");

gulp.task('watch', function() {
    gulp.src('./')
    .pipe(webserver({
        port: '8080',
        host: 'localhost',
        livereload: true,
        open: true
    }));
    gulp.watch('./scss/**/**', ['scss']);
}); 

gulp.task('scss', function() {
    return gulp.src('./scss/scaffold.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on("error", sass.logError))
        .pipe(autoprefixer({
            browsers: ["last 2 versions"],
            cascade: false
        }))
        .pipe(gulp.dest('./css/'))
});

gulp.task('js', function() {
    return gulp.src('./js/*')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(gulp.dest('script'))
}); 
