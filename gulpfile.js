var watchify = require('watchify');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');
var assign = require('lodash.assign');
var babel = require('babelify');
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');

/*
 * BUILD
 */
 gulp.task('build', ['js', 'sass', 'img'], function(done) {
   done();
 });

/*
 * JAVASCRIPT
 */

// add custom browserify options here
var customOpts = {
  entries: ['./source/js/entry.js'],
  debug: true,
  transform: babel.configure({
    presets: ["es2015"] //sets the preset to transpile to es2015 (you can also just define a .babelrc instead)
  })
};
var opts = assign({}, watchify.args, customOpts);
var bw = watchify(browserify(opts));

// add transformations here
// i.e. b.transform(coffeeify);
gulp.task('js:watch', bundle); // so you can run `gulp js` to build the file
bw.on('update', bundle); // on any dep update, runs the bundler
bw.on('log', gutil.log); // output build logs to terminal

function bundle() {
  return bw.bundle()
    // log errors if they happen
    .on('error', gutil.log.bind(gutil, 'Browserify Error'))
    .pipe(source('bundle.min.js'))
    // optional, remove if you don't need to buffer file contents
    .pipe(buffer())
    // optional, remove if you dont want sourcemaps
    .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
       // Add transformation tasks to the pipeline here.
       .pipe(uglify())
       .on('error', gutil.log)
    .pipe(sourcemaps.write('./')) // writes .map file
    .pipe(gulp.dest('./dist/js'))
}

gulp.task('js', function () {
  // set up the browserify instance on a task basis
  var b = browserify(opts);

  return b.bundle()
    .pipe(source('bundle.min.js'))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
        .on('error', gutil.log)
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./dist/js/'));
});

/*
 * SCSS
 */
 gulp.task('sass', function () {
  return gulp.src('./source/sass/**/*.scss')
   .pipe(sourcemaps.init())
   .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
   .pipe(sourcemaps.write('./'))
   .pipe(gulp.dest('./dist/css'));
 });

 gulp.task('sass:watch', function () {
  gulp.watch('./source/sass/**/*.scss', ['sass']);
});

/*
 * IMAGES
 */
 gulp.task('img', () =>
  gulp.src('./source/images/**/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/images'))
);
