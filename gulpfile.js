var gulp = require('gulp'),
    postcss  = require('gulp-postcss'),
    sass = require('gulp-ruby-sass'), // enable sass
    prefix = require('autoprefixer-core'), // autorprefixer
    minifycss = require('gulp-minify-css'), // build .min.css
    rename = require('gulp-rename'), // rename to .min.css
    connect = require('gulp-connect-php'), // open php server
    argv = require('yargs').argv; // pass argument to open port

gulp.task('styles', function() {
    return sass('sass', { style: 'expanded' })
        .pipe(postcss([ prefix({ browsers: ['> 1%'] }) ]))
        .pipe(gulp.dest('css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('css'));
});

gulp.task('watch', function() {
  gulp.watch('sass/*.scss', ['styles']);
});

gulp.task('connect', function() {
    connect.server({
        port: argv.p === undefined ? 8000 : argv.p
    });
});

gulp.task('default', ['watch', 'connect'], function() {

});
