const {src,dest,watch,parallel} = require("gulp");
const sass = require("gulp-sass")(require ("sass"));
const plumber = require ("gulp-plumber");
const autoprefixer=require("autoprefixer");
const cssnano=require("cssnano");
const postcss=require("gulp-postcss");
const sourcemaps=require("gulp-sourcemaps")
//imagenes
const cache= require("gulp-cache");
const webp = require("gulp-webp");
const imagemin = require("gulp-imagemin");
const avif=require("gulp-avif");
//javascript
const terser= require("gulp-terser-js");

function css(callback){
    src("src/scss/**/*.scss")//identifica el archivo sass
    .pipe(sourcemaps.init())
    .pipe(plumber())
    .pipe(sass())//compilarlo
    .pipe(postcss([autoprefixer(),cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(dest("build/css"));//almacena en el disco duro
    
    callback();//callback que avisa al gulp cuando finalizamos 
}
function versionWebp(callback){
    const opciones={
        quality:50
    };
    src("src/img/**/*.{png,jpg}")
    .pipe(webp(opciones))
    .pipe(dest('build/img'))
    callback();
}
function versionAvif(callback){
    const opciones={
        quality:50
    };
    src("src/img/**/*.{png,jpg}")
    .pipe(avif(opciones))
    .pipe(dest('build/img'))
    callback();
}
function imagenes(callback){
    const opciones={
        optimizationLevel:3
    };
    src("src/img/**/*.{png,jpg}")
    .pipe(cache(imagemin(opciones)))
    .pipe(dest('build/img'))
    callback();
}
function javascript(callback){
    src("src/js/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(dest("build/js"))
    callback();
}
function dev(callback){
    watch("src/scss/**/*.scss",css);
    watch("src/js/**/*.js",javascript);
    callback();
}
exports.css = css;
exports.js=javascript;
exports.versionWebp=versionWebp;
exports.versionAvif=versionAvif
exports.imagenes=imagenes;
exports.dev = parallel(imagenes,versionWebp,versionAvif,dev);