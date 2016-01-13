'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var jshint = require('gulp-jshint');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var buffer = require('vinyl-buffer');
var jade = require('gulp-jade');
var del = require('del');
var runSequence = require('run-sequence');


// Establish server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: './dest'
    },
  })
});

// Clean
gulp.task('clean:dest', function() {
  return del.sync('dest');
})

// AMD
gulp.task('browserify', function() {
  var b = browserify({
    entries: './app/js/app.js',
    debug: true
  });

  return b.bundle()
    .pipe(source('app.min.js'))
    .pipe(buffer())
    // .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .on('error', gutil.log)
    // .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dest/js/'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Sass cpmpiler
gulp.task('sass', function(){
  return gulp.src('app/sass/app.scss')
    .pipe(sass({outputStyle: 'compressed'}))
    .on('error', gutil.log)
    .pipe(gulp.dest('dest/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Compile Jade to HTML
gulp.task('jade', function() {
    gulp.src('app/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('dest/'))
    .pipe(browserSync.reload({
      stream: true
    }))

    gulp.src('app/views/**/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('dest/views'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

// Check out javascript 
gulp.task('jshint', function() {
  return gulp.src('app/js/**/*.js')
    .pipe(jshint())
    .on('error', gutil.log)
    .pipe(jshint.reporter('jshint-stylish'));
});

// Configure main tasks 
gulp.task('default', function (callback) {
  runSequence('clean:dest', ['browserSync', 'sass', 'jade', 'browserify'],
    function() {
      gulp.watch('app/sass/**/*.scss', ['sass']);
      gulp.watch('app/**/*.jade', ['jade']);
      gulp.watch('app/js/**/*.js', ['jshint', 'browserify']);
    });
});


