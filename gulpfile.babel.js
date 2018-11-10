import gulp from 'gulp';
import responsive from 'gulp-responsive';
import del from 'del';
import runSequence from 'run-sequence';

// Create responsive images for jpg files
gulp.task('jpg-images', function() {
  return gulp.src('images/**/*.jpg')
    .pipe(responsive({
      // Resize all jpg images to 5 (small-2x and large-1x are the same) different sizes: -small-2x-large-1x, -large-2x, -medium-1x, -medium-2x, -small-1x
      '**/*.jpg': [{
        width: 640,
        quality: 70,
        rename: { suffix: '-small-2x-large-1x'}
      },{
        width: 1280,
        quality: 90,
        rename: { suffix: '-large-2x'}
      },{
        width: 480,
        quality: 60,
        rename: { suffix: '-medium-1x'}
      },{
        width: 960,
        quality: 80,
        rename: { suffix: '-medium-2x'}
      },{
        width: 320,
        quality: 50,
        rename: { suffix: '-small-1x'}
      }]
    },))
    .pipe(gulp.dest('img/'));
});

// Just copy any other images to img folder
gulp.task('other-images', function() {
  return gulp.src(['!images/**/*.jpg', 'images/**/*.*'])
    .pipe(gulp.dest('img/'));
});

// clean img folder
gulp.task('clean', function(done) {
  return del(['img/'], done);
});

// Run this task for your images.
gulp.task("images", function(done) {
  runSequence(
    'clean',
    ['jpg-images','other-images'],
    done
  );
});