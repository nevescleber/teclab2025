import gulp from 'gulp'
import gulpSass from 'gulp-sass'
import nodeSass from 'node-sass'
import autoprefixer from 'gulp-autoprefixer'
import cleanCSS from 'gulp-clean-css'
import browserSync from 'browser-sync'
import sourcemaps from 'gulp-sourcemaps'
import uglify from 'gulp-uglify'
import rename from 'gulp-rename'
import path from 'path'
import { fileURLToPath } from 'url'

const sass = gulpSass(nodeSass)
const bs = browserSync.create()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Configurações dos caminhos
const paths = {
    scss: {
        src: 'assets/scss/**/*.scss',
        main: 'assets/scss/main.scss',
        dest: 'assets/css'
    },
    js: {
        src: 'assets/js/*.js',
        files: ['assets/js/main.js', 'assets/js/script.js'],
        dest: 'assets/js'
    },
    php: '**/*.php'
}

// Compilar SCSS
export function compileSass() {
    return gulp.src(paths.scss.main)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.scss.dest))
        .pipe(bs.stream())
}

// Compilar CSS sem minificar (para desenvolvimento)
export function compileSassDev() {
    return gulp.src(paths.scss.main)
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded'
        }).on('error', sass.logError))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.scss.dest))
        .pipe(bs.stream())
}

// Compilar JavaScript
export function compileJS() {
    return gulp.src(paths.js.files, { allowEmpty: true })
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.js.dest))
        .pipe(bs.stream())
}

// Watch para desenvolvimento
export function watchFiles() {
    gulp.watch(paths.scss.src, compileSassDev)
    gulp.watch(paths.js.files, compileJS)
}

// BrowserSync e watch
export function serve() {
    bs.init({
        proxy: 'localhost/teclab-wp',
        host: 'localhost',
        port: 3000,
        open: true,
        notify: true,
        logLevel: 'info',
        files: [
            '**/*.php',
            'assets/css/*.css',
            'assets/js/*.js',
            'assets/js/*.min.js'
        ],
        ignore: [
            'node_modules/**/*',
            'assets/css/*.map'
        ],
        reloadDelay: 0,
        reloadDebounce: 100,
        reloadThrottle: 0,
        injectChanges: true,
        watchEvents: ['change', 'add', 'unlink'],
        middleware: function(req, res, next) {
            // Log para debug
            console.log('BrowserSync: ' + req.method + ' ' + req.url);
            next();
        }
    })
    
    // Watch files e reload
    gulp.watch(paths.scss.src, compileSassDev)
    gulp.watch(paths.js.files, compileJS)
    gulp.watch(['**/*.php', 'assets/css/*.css', 'assets/js/*.min.js']).on('change', function(file) {
        console.log('File changed:', file.path);
        bs.reload();
    })
}

// Tarefa de build para produção
export const build = gulp.series(
    gulp.parallel(compileSass, compileJS)
)

// Tarefa de desenvolvimento
export const dev = gulp.series(
    gulp.parallel(compileSassDev, compileJS),
    serve
)

// Tarefa watch sem servidor
export const watch = watchFiles

// Tarefa padrão
export default dev