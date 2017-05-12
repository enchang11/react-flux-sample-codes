var gulp = require('gulp');
var clean = require('gulp-clean');
var browserify = require('browserify');
var runSequence = require('run-sequence');
var reactify = require('reactify');
var source = require('vinyl-source-stream');

gulp.task('browserify', function(){
  browserify('./app/src/app.js')
    .transform('reactify')
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('public/js'))
});

gulp.task('copy', function(){
  gulp.src('app/*.html')
    .pipe(gulp.dest('public'));
  gulp.src('app/lib/**/*.*')
    .pipe(gulp.dest('public/lib'));
  gulp.src('app/css/**')
    .pipe(gulp.dest('public/css'));
  gulp.src('app/js/**')
    .pipe(gulp.dest('public/js'));
  gulp.src('app/images/**')
    .pipe(gulp.dest('public/images'));

});

gulp.task('clean', function() {
  return gulp.src('public/*', {read:false})
  .pipe(clean({force:true}));
});

gulp.task('default', ['clean', 'browserify', 'copy'], function(){
  return gulp.watch('app/**/*.*', ['clean', 'browserify','copy'])
});

gulp.task('default', function() {
  runSequence(
    'clean',
   ['browserify'],
    'copy'
  );
  return gulp.watch('app/**/*.*', ['browserify','copy'])
});