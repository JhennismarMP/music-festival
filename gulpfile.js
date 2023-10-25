const { src, dest,watch, parallel } = require('gulp')
const sass=require('gulp-sass')(require('sass'))
const plumber=require('gulp-plumber');
const { Exception } = require('sass');
const imagemin=require('gulp-imagemin');
const cache=require('gulp-cache');
const webp=require('gulp-webp');
const avif=require('gulp-avif');
function css(done) {
    src('src/scss/**/*.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(dest('build/css'))
    done();
}
function dev(done) {
    watch('src/scss/**/*.scss',css);
    done();
}
function images(done){
    const options={
        optimizationLevel:3
    }

src('src/img/**/*.{jpg,png}')
.pipe(cache(imagemin(options)))
.pipe(dest('build/img'))

done();
}
function versionWebp(done){
    const options={
        quality:50
    }

    src('src/img/**/*.{jpg,png}')
    .pipe(webp(options))
    .pipe(dest('build/img'))
    done();
}

function versionAvif(done){
    const options={
        quality:50
    }

    src('src/img/**/*.{jpg,png}')
    .pipe(avif(options))
    .pipe(dest('build/img'))
    done();
}

exports.css=css;
exports.images=images;
exports.dev=parallel(images,dev,versionAvif,versionWebp);