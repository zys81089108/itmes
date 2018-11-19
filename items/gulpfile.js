const gulp = require("gulp"),
	  miniCss = require("gulp-minify-css"),
	  uglify = require("gulp-uglify"),
	  minihtml = require("gulp-htmlmin"),
	  babel = require("gulp-babel"),
	  connect = require("gulp-connect"),
	  sass = require("gulp-sass"),
	  plumber = require("gulp-plumber");


//制定html任务
gulp.task('html', ()=>{
	//把html文件取出放入dist里
	gulp.src('app/index.html')
		.pipe(plumber())
		.pipe(minihtml())
		.pipe(gulp.dest('dist'))
		.pipe(connect.reload());
	gulp.src('app/html/**/*.html')
		.pipe(plumber())
		.pipe(minihtml())
		.pipe(gulp.dest('dist/html'))
		.pipe(connect.reload());
})

//编译
gulp.task('sass', ()=>{
	//把html文件取出放入dist里
	gulp.src('app/sass/**/*.scss')
		.pipe(plumber())
		// .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
		.pipe(sass())
		.pipe(miniCss())
		.pipe(gulp.dest('dist/css'))
		.pipe(connect.reload());
})

gulp.task('js', ()=>{
	//把js文件取出放入dist里
	gulp.src('app/js/**/*.js')
		.pipe(plumber())
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'))
		.pipe(connect.reload());
	gulp.src('app/module/**/*.js')
		.pipe(plumber())
		.pipe(babel({
			presets: ['@babel/env']
		}))
		.pipe(uglify())
		.pipe(gulp.dest('dist/module'))
		.pipe(connect.reload());
	gulp.src('app/lib/**/*.js')
		.pipe(plumber())
		.pipe(gulp.dest('dist/lib'))
		.pipe(connect.reload());
})

gulp.task('img', ()=>{
	gulp.src('app/img/**/*')
		.pipe(plumber())
		.pipe(gulp.dest('dist/img'))
		.pipe(connect.reload());
}) 

gulp.task('json', ()=>{
	gulp.src('app/json/**/*.json')
		.pipe(plumber())
		.pipe(gulp.dest('dist/json'))
		.pipe(connect.reload());
})

gulp.task('watch', ()=>{
	gulp.watch('app/**/*.html', ['html']);
	gulp.watch('app/sass/**/*.scss', ['sass']);
	gulp.watch('app/js/**/*.js', ['js']);
	gulp.watch('app/module/**/*.js', ['js']);
	gulp.watch('app/lib/**/*.js', ['js']);
	gulp.watch('app/img/**/*', ['img']);
	gulp.watch('app/json/**/*.json', ['json']);
})

//制定一个开启服务的任务
gulp.task('server', ()=>{
	connect.server({
		livereload: true,
		port: 8108,
		root: 'dist'
	});
})



gulp.task('default',['html','sass','js', 'img', 'json', 'server', 'watch']);