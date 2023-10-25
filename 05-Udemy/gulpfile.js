const { src, dest, watch, series } = require('gulp');

// Compilar CSS
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const cssnano = require('cssnano');
const purgecss = require('gulp-purgecss');
const rename = require('gulp-rename');

// Imagenes
const imagemin = require('gulp-imagemin');

function css( done ) {
    src('src/scss/app.scss') // Identificar el archivo principal
        .pipe( sourcemaps.init() )
        .pipe( sass() )
        .pipe( postcss([ autoprefixer(), cssnano() ]) )
        .pipe( sourcemaps.write('.'))
        .pipe( dest('build/css') ) // Exportarlo o guardarlo en una ubicación
    done();
}

function cssbuild( done ) {
    src('build/css/app.css')
        .pipe( rename({
            suffix: '.min'
        }))
        .pipe( purgecss({
            content: ['index.html']
        }))
        .pipe( dest('build/css'))

    done();
}

function dev( done ) {
    watch('src/scss/**/*.scss', css);
    watch('src/img/**/*', )
    done();
}

function imagenes(done) {
    src('src/img/**/*')
        .pipe( imagemin({ optimizationLevel: 3}) )
        .pipe( dest('build/img') )
    done();
}

exports.css = css;
exports.dev = dev;
exports.imagenes = imagenes;
exports.dev = series( imagenes, css, dev );
exports.build = series( cssbuild );