const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const browserSync = require('browser-sync');
const reload = browserSync.reload;

//a task to compile our sass 
gulp.task('styles', () => {
	//** folder structure is called globbing
	return gulp.src('./dev/styles/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(concat('style.css'))
		.pipe(gulp.dest('./public/styles/'))
});

//a task to compile our javascript 
gulp.task('scripts', () => {
	return gulp.src('./dev/scripts/main.js')
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(gulp.dest('./public/scripts/'))
});

//a task to reload html on save
gulp.task('html', () => {
  return gulp.src('*.html')
   .pipe(browserSync.reload({
    stream: true
   }))
});

//browser sync
gulp.task('bs', () => {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
});

//a task o watch all of my other tasks 
//to exit out of the watch task use ctl + c
gulp.task('watch', () => {
	gulp.watch('./dev/styles/**/*.scss', ['styles']);
	gulp.watch('./dev/scripts/main.js', ['scripts']);
	gulp.watch('*.html', ['html']);
	gulp.watch('./public/**', reload);
});

//runs our all of our tasks
gulp.task('default', ['styles', 'scripts', 'bs', 'html', 'watch']);