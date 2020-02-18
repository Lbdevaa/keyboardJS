var gulp           = require('gulp'),
		gutil          = require('gulp-util' ),
		sass           = require('gulp-sass'),
		browserSync    = require('browser-sync'),
		concat         = require('gulp-concat'),
		uglify         = require('gulp-uglify'),
		cleancss       = require('gulp-clean-css'),
		rename         = require('gulp-rename'),
		autoprefixer   = require('gulp-autoprefixer'),
		notify         = require("gulp-notify"),
		imagemin      = require('gulp-imagemin'),
		del           = require('del'),
		iconfont = require('gulp-iconfont'),
		iconfontCss = require('gulp-iconfont-css'),
		runTimestamp = Math.round(Date.now()/1000),
    fontName = 'Icons';

gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
		open: false,
		// online: false, // Offline work
		//tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
	});
});

gulp.task('js', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/js/common.js', // Always at the end
		])
	.pipe(concat('scripts.min.js'))
	// .pipe(uglify()) // Minimize js
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('sass', function() {
	return gulp.src('app/sass/**/*.sass')
	.pipe(sass({outputStyle: 'expanded'}).on("error", notify.onError()))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Comment when debugging
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.stream());
});

gulp.task('iconfont', function(){
  return gulp.src(['app/icons/*.svg'])
	.pipe(iconfontCss({
		path: 'app/sass/_icons_template.sass',
		fontName: fontName,
		targetPath: '../sass/_icons.sass',
		fontPath: '../fonts/'
	}))
	.pipe(iconfont({
		fontName: fontName,
		prependUnicode: true,
		fontHeight: 1000,
		normalize: true, 
		timestamp: runTimestamp
	}))
	.pipe(gulp.dest('app/fonts/'));
});

gulp.task('watch', function() {
	gulp.watch('app/sass/**/*.sass', gulp.parallel('sass'));
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], gulp.parallel('js'));
	gulp.watch('app/*.html').on('change', browserSync.reload);
	gulp.watch('app/icons/*.svg', gulp.parallel('iconfont'));
});

gulp.task('default', gulp.parallel('sass', 'js', 'browser-sync', 'watch'));

gulp.task('clean', function() {
  return del(['dist']);
});

gulp.task('compress', function() {
  return gulp.src('app/img/**/*')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/img'))
});

gulp.task('buildCss', function(){
	return gulp.src('app/css/main.min.css')
  .pipe(gulp.dest('dist/css'));
});

gulp.task('buildFonts', function(){
	return gulp.src('app/fonts/**/*')
  .pipe(gulp.dest('dist/fonts'));
});

gulp.task('buildJs', function(){
	return gulp.src('app/js/scripts.min.js')
  .pipe(gulp.dest('dist/js'));
});

gulp.task('buildHtml', function(){
	return gulp.src('app/*.html')
  .pipe(gulp.dest('dist'));
});

gulp.task('build', gulp.series(
	'clean',
	'compress',
	gulp.parallel('sass', 'js', 'buildCss', 'buildFonts', 'buildJs', 'buildHtml')
));