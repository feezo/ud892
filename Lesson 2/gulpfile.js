var gulp = require('gulp');
 var sass = require('gulp-sass');
 var autoprefixer = require('gulp-autoprefixer');
 var browserSync = require('browser-sync').create();
 var eslint = require('gulp-eslint');
 var jasmine = require('gulp-jasmine-phantom');

 gulp.task('sass', function (done) {
     gulp.watch('sass/**/*.scss', browserSync.reload());
     gulp.src('sass/**/*.scss')
         .pipe(sass().on('error', sass.logError))
         .pipe(autoprefixer({
             browsers: ['last 2 versions']
         }))
         .pipe(gulp.dest('./css'))
     done();
 });

 gulp.task('lint', function () {
     return gulp.src('js/**/*.js')
         // eslint() attaches the lint output to the eslint property
         // of the file object so it can be used by other modules.
         .pipe(eslint())
         // eslint.format() outputs the lint results to the console.
         // Alternatively use eslint.formatEach() (see Docs).
         .pipe(eslint.format())
         // To have the process exit with an error code (1) on
         // lint error, return the stream and pipe to failOnError last.
         .pipe(eslint.failOnError());
 });

 gulp.task('watch', function (done) {
     gulp.watch('sass/**/*.scss', gulp.series('sass'));
     gulp.watch('js/**/*.js', gulp.series('lint'));
     done();
 })

 gulp.task('browserSync', function (done) {
     browserSync.init({
         server: {
             baseDir: './'
         },
     })
     done();
 })

 gulp.task('default',
     gulp.parallel('sass', 'browserSync', 'lint', gulp.parallel('watch'))
 );

 gulp.task('tests', function (done) {
     gulp.src('tests/spec/extraSpec.js')
         .pipe(jasmine({
             integration: true,
             vendor: 'js/**/*.js'
         }));
         done();
 });
