'use strict';

const gulp 				= require('gulp');
const argv          	= require('optimist').argv;
const browserSync 		= require('browser-sync');
const less 				= require('gulp-less');
const plumber 			= require('gulp-plumber');
const autoprefixer 		= require('gulp-autoprefixer');
const cleanCSS 			= require('gulp-clean-css');
const inlineCss 		= require('gulp-inline-css');
const concat 			= require('gulp-concat');
const purgecss 			= require('gulp-purgecss');
const rename 			= require('gulp-rename');
const data 				= require('gulp-data');
const twig 				= require('gulp-twig');
const pageBuilder 		= require('gulp-pagebuilder2');
const uglify 			= require('gulp-uglify');
const imagemin 			= require('gulp-imagemin');
const pngQuant 			= require('imagemin-pngquant'); 
const jpegRecompress 	= require('imagemin-jpeg-recompress'); 
const webp 				= require('imagemin-webp'); 	
const extReplace 		= require('gulp-ext-replace'); 	
const webpHTML 			= require('gulp-webp-html');
const svgSprite 		= require('gulp-svg-sprite');
const svgmin 			= require('gulp-svgmin'); 
const cheerio 			= require('gulp-cheerio');
const replace 			= require('gulp-replace');

const root 				= './projects/' + (argv.project || 'test');
const build 			= root + '/' + 'build';
const src 				= root + '/' + 'src';
const jData 			= require(root + '/src/json/data.twig.json');
const fs 				= require('fs');

const path = {
	build : { 
		root : build,
		html : build,
		css : build + '/css',
		js : build + '/js',
		img : build + '/img',
		svg : build + '/img/svg',
	},
	src : {
		root : src,
		html : src + '/html',
		email : src + '/email',
		less : src + '/less',
		common : src + '/common',
		js : src + '/js',
		img : src + '/img',
		svg : src + '/svg',
		_ : src + '/_',
		block : src + '/block',
		json : src + '/json',
	},
	block : {
		root : root + '/src/block',
		email : root + '/src/block/email',
	}
};
function watching(done){
  gulp.watch(path.src.less + "/**/*.less", styles);
  gulp.watch(path.src.common + "/**/*.less", styles);
  gulp.watch(path.src._ + "/concat.block.less", styles);
  gulp.watch(path.src.block + "/**/*.less", stylesConcat);

  gulp.watch(path.src.html + "/**/*.twig", html);
  gulp.watch(path.src.block + "/**/*.twig", html);
  gulp.watch(path.src.json + "/**/*.json", html);

  gulp.watch(path.src.email + "/**/*.twig", email);
  gulp.watch(path.block.email + "/**/*.twig", email);
  gulp.watch(path.src.json + "/**/*.json", email);

  gulp.watch(path.src.img + "/**/*", webpGen);
  gulp.watch(path.src.img + "/**/*", imgGen);
  gulp.watch(path.src.svg + "/**/*", svg);

	gulp.watch(path.src._ + '/concat.plugin.js', js);
	gulp.watch(path.src._ + '/concat.body.on.js', js);
	gulp.watch(path.src._ + '/concat.document-ready.js', js);
	gulp.watch(path.src._ + '/concat.window-resize.js', js);
	gulp.watch(path.src._ + '/concat.window-scroll.js', js);
	gulp.watch(path.src._ + '/concat.body.changeClass.js', js);
	gulp.watch(path.src._ + '/concat.changeClass.js', js);
	gulp.watch(path.src.js + '/**/*.js', js);

	gulp.watch(path.src.root + '/**/.plugin.js', js_plugin);
	gulp.watch(path.src.root + '/**/body.on.js', js_bodyon);
	gulp.watch(path.src.root + '/**/.document-ready.js', js_ready);
	gulp.watch(path.src.root + '/**/.window-resize.js', js_resize);
	gulp.watch(path.src.root + '/**/.window-scroll.js', js_scroll);
	gulp.watch(path.src.root + '/**/.window-scroll.js', js_scroll);
	gulp.watch(path.src.root + '/**/.changeClass.js', js_сlass);
	gulp.watch(path.src.root + '/**/body.changeClass.js', js_body_сlass);

    done();
}

browserSync.init({
	server : path.build.root,	
  port : parseInt(argv.port) || 10080,
	ui : {
		port : parseInt(argv.port) + 1 || 10081,
	}
});

function html(done){
	return gulp.src(path.src.html + '/**/*.twig')  
    .pipe(plumber()) 
    //.pipe(webpHTML())
   	.pipe(data(function (file) {
		return JSON.parse(
			fs.readFileSync(path.src.json + '/data.twig.json'));
		}))
    .pipe(twig())
		.pipe(gulp.dest(path.build.html))
		.pipe(browserSync.reload({ stream: true }))  
    done();
} 
function email(done){
	return gulp.src(path.src.email + '/**/*.twig')  
    .pipe(plumber()) 
   	.pipe(data(function (file) {
		return JSON.parse(
			fs.readFileSync(path.src.json + '/data.twig.json'));
		}))
    .pipe(twig())
		.pipe(inlineCss({
			applyStyleTags: true,
			applyLinkTags: true,
			removeStyleTags: false,
			removeLinkTags: true,
		}))
	.pipe(gulp.dest(path.build.html))
	.pipe(browserSync.reload({ stream: true }))  
  done();
}

function stylesConcat(done){
	return gulp.src(path.src.block + '/**/*.less')  
    .pipe(plumber())    
	.pipe(concat('concat.block.less'))
	.pipe(gulp.dest(path.src._));
    done();
} 
/*
const min = '';
if(argv.min == "false"){const min = ''} else {const min = .pipe(cleanCSS());}
console.log(argv.min);
console.log(min);*/

function styles(done){
	return gulp.src(path.src.less + '/*.less')  
    .pipe(plumber())
    .pipe(less({ }))
    .pipe(autoprefixer())
    //.pipe(gulp.dest(path.build.css))
   	.pipe(cleanCSS())
	/*.pipe(
      rename({
        suffix: '-min'
      })
    )*/
    .pipe(gulp.dest(path.build.css))
		.pipe(browserSync.reload({ stream: true }))

	/*.pipe(
      purgecss({
        css: [path.build.css+'/style.css'],
        content: [path.build.html+'/*.html']
      })
    )
	.pipe(
      rename({
        suffix: '-purge'
      })
    )
    .pipe(gulp.dest(path.build.css))*/
    done();
}

function js(done){
	return gulp.src(path.src.js + '/**/*.js')  
    .pipe(plumber())
	.pipe(pageBuilder(root, jData)) 
	.pipe(uglify())
	.pipe(gulp.dest(path.build.js))
	.pipe(browserSync.reload({ stream: true }));    
    done();
}
function js_plugin(done){
	return gulp.src(path.src.block + '/**/.plugin.js')  
    .pipe(plumber())
	.pipe(uglify())
	.pipe(concat('concat.plugin.js'))
	.pipe(gulp.dest(path.src._))
	.pipe(browserSync.reload({ stream: true }));    
    done();
}
function js_bodyon(done){
	return gulp.src(path.src.block + '/**/body.on.js')  
    .pipe(plumber())
	.pipe(uglify())
	.pipe(concat('concat.plugin.js'))
	.pipe(gulp.dest(path.src._))
	.pipe(browserSync.reload({ stream: true }));    
    done();
}
function js_ready(done){
	return gulp.src(path.src.block + '/**/.document-ready.js')  
    .pipe(plumber()) 
	.pipe(uglify())
	.pipe(concat('concat.document-ready.js'))
	.pipe(gulp.dest(path.src._))
	.pipe(browserSync.reload({ stream: true }));    
    done();
}
function js_resize(done){
	return gulp.src(path.src.block + '/**/.window-resize.js')  
    .pipe(plumber())
	.pipe(uglify())
	.pipe(concat('concat.window-resize.js'))
	.pipe(gulp.dest(path.src._))
	.pipe(browserSync.reload({ stream: true }));    
    done();
}
function js_scroll(done){
	return gulp.src(path.src.block + '/**/.window-scroll.js')  
    .pipe(plumber())
	.pipe(uglify())
	.pipe(concat('concat.window-scroll.js'))
	.pipe(gulp.dest(path.src._))
	.pipe(browserSync.reload({ stream: true }));    
    done();
}
function js_body_сlass(done){
	return gulp.src(path.src.block + '/**/body.changeClass.js')  
    .pipe(plumber())
	.pipe(uglify())
	.pipe(concat('concat.body.changeClass.js'))
	.pipe(gulp.dest(path.src._))
	.pipe(browserSync.reload({ stream: true }));    
    done();
}
function js_сlass(done){
	return gulp.src(path.src.block + '/**/.changeClass.js')  
    .pipe(plumber())
	.pipe(uglify())
	.pipe(concat('concat.changeClass.js'))
	.pipe(gulp.dest(path.src._))
	.pipe(browserSync.reload({ stream: true }));    
    done();
}

function webpGen(done){
	return gulp.src(path.src.img + '/**/*.{png,jpg,jpeg}')  
    .pipe(plumber())
    .pipe(imagemin([
		webp({
	        quality: 75
      	})
    ]))
	.pipe(extReplace(".webp"))
    .pipe(gulp.dest(path.build.img))
	.pipe(browserSync.reload({ stream: true }));   
    done();
}
function imgGen(done){
	return gulp.src(path.src.img + '/**/*.{png,jpg,jpeg}')  
    .pipe(plumber())    
    .pipe(imagemin([
		jpegRecompress({
			progressive: true,
			max: 80,
			min: 70
		}),
		pngQuant({
			quality: [0.7, 0.8]
		})
    ]))
    .pipe(gulp.dest(path.build.img))
	.pipe(browserSync.reload({ stream: true }));   
    done();
}

function svg(done){
	return gulp.src(path.src.svg + '/**/*.svg')  
    .pipe(plumber())  
	.pipe(svgmin({
		js2svg: {pretty: true}
	}))
	.pipe(cheerio({
		run: function ($) {
			//$('[fill]').removeAttr('fill');
			//$('[stroke]').removeAttr('stroke');
			$('[style]').removeAttr('style');
			$('[id]').removeAttr('id');
			$('[class]').removeAttr('class');
		},
		parserOptions: {xmlMode: true}
	}))
	.pipe(replace('&gt;', '>'))
	.pipe(svgSprite({
		mode: {
			symbol: {
				sprite: "../sprite.svg",
				render: {
					less: {
						dest: '../../../../src/common/less/sprite.less',
						template: path.src.common + "/less/sprite_template.less"
					}
				}
			}
		}
	}))
    .pipe(gulp.dest(path.build.svg))
	.pipe(browserSync.reload({ stream: true })); 
    done();
}

gulp.task('default',gulp.series(styles, html, email, stylesConcat, js, js_plugin, js_bodyon, js_ready, js_resize, js_scroll, js_body_сlass, js_сlass, watching, imgGen, webpGen, svg)); 