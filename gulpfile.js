const gulp = require("gulp");
const uglify = require("gulp-uglify");
const useref = require("gulp-useref");
const gulpIf = require("gulp-if");
const rename = require("gulp-rename");
const replace = require("gulp-replace");
const imagemin = require("gulp-imagemin");
const cleanCSS = require("gulp-clean-css");
const browserSync = require("browser-sync").create();

// Minify js files task
gulp.task("minify-js", function () {
    return gulp
        .src("assets/js/*.js")
        .pipe(uglify())
        .pipe(rename({ extname: ".min.js" }))
        .pipe(gulp.dest("dist/js"));
});

//Minify css files task
gulp.task("minify-css", function () {
    return gulp
        .src("assets/css/*.css")
        .pipe(cleanCSS({ compatibility: "ie8" }))
        .pipe(rename({ extname: ".min.css" }))
        .pipe(gulp.dest("dist/css"));
});

//Minify vendor js files if any
gulp.task("minify-vendor-js", function () {
    return gulp
        .src("vendor/**/*.js")
        .pipe(uglify())
        .pipe(rename({ extname: ".min.js" }))
        .pipe(gulp.dest("dist/vendor"));
});

// Optimize images
gulp.task("images", function () {
    return gulp
        .src("assets/images/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/images"));
});

//move fonts to dist
gulp.task("fonts", function () {
    return gulp.src("assets/fonts/**/*").pipe(gulp.dest("dist/fonts"));
});

// Move HTML files to dist
gulp.task("html", function () {
    return gulp
        .src("./*.html")
        .pipe(useref())
        .pipe(gulpIf("*.js", uglify()))
        .pipe(gulpIf("*.css", cleanCSS()))
        .pipe(gulpIf("*.css", replace("../images/", "/images/")))
        .pipe(gulpIf("*.css", replace("../fonts/", "/fonts/")))
        .pipe(replace("/assets/images/", "/images/"))
        .pipe(gulp.dest("dist"));
});

// Static server + watching scss/js/html files
gulp.task(
    "serve",
    gulp.series(
        "minify-js",
        "minify-vendor-js",
        "minify-css",
        "images",
        "fonts",
        "html",
        function () {
            browserSync.init({
                server: "./dist",
            });

            gulp.watch("assets/js/*.js", gulp.parallel("minify-js")).on(
                "change",
                browserSync.reload
            );
            gulp.watch("assets/css/*.css", gulp.parallel("minify-css")).on(
                "change",
                browserSync.reload
            );
            gulp.watch("web_pages/*.html", gulp.parallel("html")).on(
                "change",
                browserSync.reload
            );
        }
    )
);

// Default task: runs the 'serve' task when you just run 'gulp'
gulp.task("default", gulp.series("serve"));

// Build task: runs all tasks needed for your project
gulp.task(
    "build",
    gulp.parallel(
        "minify-js",
        "minify-vendor-js",
        "minify-css",
        "fonts",
        "images",
        "html"
    )
);
