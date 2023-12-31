// const gulp = require("gulp");

// const sass = require("gulp-sass");
// const cssnano = require("gulp-cssnano");
// const rev = require("gulp-rev");

import gulp from "gulp";
import gulpSass from "gulp-sass";
import dartSass from "sass";
const sass = gulpSass(dartSass);
import cssnano from "gulp-cssnano";
import rev from "gulp-rev";
import uglify from "gulp-uglify";

gulp.task("css", function (done) {
  console.log("minifying css...");

  gulp
    .src("./assets/sass/**/*.scss")
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest("./assets.css"));

  gulp
    .src("./assets/**/*.css")
    .pipe(rev())
    .pipe(gulp.dest("./public/assets"))
    .pipe(
      rev.manifest({
        cwd: "public",
        merge: true,
      })
    )
    .pipe(gulp.dest("./public/assets"));

  done();
});

gulp.task("js", function (done) {
  console.log("minifying js...");
  gulp
    .src("/assets/**/*.js")
    .pipe(uglify())
    .pipe(rev())
    .pipe(gulp.dest("./public/assets"))
    .pipe(
      rev.manifest({
        cwd: "public",
        merge: true,
      })
    )
    .pipe(gulp.dest("./public/assets"));

  done();
});
