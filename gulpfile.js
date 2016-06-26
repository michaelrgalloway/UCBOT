var gulp = require("gulp");
var typescript = require("typescript");
var ts = require("gulp-typescript");
var minjs = require("gulp-uglify");

var serverTSConfig = ts.createProject("tsconfig.json", { typescript: typescript });

gulp.task('buildsts', function () {
    return gulp.src(["./src/**/*.ts", "typings/globals/**/*.ts"])
        .pipe(ts(serverTSConfig))
        .pipe(gulp.dest("./dist"));
});


gulp.task("build-app", [ 'buildsts'], function() {
    
});
