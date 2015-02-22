"use strict";

var gulp = require("gulp");
var del = require("del");
var runSequence = require("run-sequence");
var gutil = require("gulp-util");
var size = require("gulp-size");
var browserSync = require("browser-sync");
var imagemin = require("gulp-imagemin");
var rubySass = require("gulp-ruby-sass-ns");
var minifyCSS = require("gulp-minify-css");
var concatCss = require("gulp-concat-css");
var pngquant = require("imagemin-pngquant");
var proxy = require("proxy-middleware");
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");

var webpackConfig = require("./webpack.config.js");

// +--------------+
// | SHARED TASKS |
// +--------------+

gulp.task("clean", function () {
  return del([__dirname + "/dist/**/*", "!" + __dirname + "/dist/index.html"]);
});

// +-------------------+
// | DEVELOPMENT TASKS |
// +-------------------+

// Proxy `/assets/javascript/` requests to
// served files from `webpack-dev-server`
var webpackProxy = function () {
  var url = require("url");
  var options = url.parse("http://localhost:8090/bundle/");
  options.route = "/bundle/";
  return proxy(options);
};

gulp.task("connect", function () {
  browserSync({
    port: 8080,
    server: {
      baseDir: __dirname + "/dist",
      middleware: [
        webpackProxy()
      ]
    },
  });
});

gulp.task("webpack-dev-server", function (cb) {
  var config = Object.create(webpackConfig);
  config.devtool = "eval";
  config.debug = true;
  config.entry = [
    "webpack-dev-server/client?http://localhost:8090",
    "webpack/hot/only-dev-server",
    __dirname + "/app/main.jsx"
  ];
  config.module.loaders = [{
    test: /\.js/,
    loaders: ["react-hot", "babel-loader"],
    exclude: /node_modules/
  }];
  config.plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ];

  new WebpackDevServer(webpack(config), {
    publicPath: config.output.publicPath,
    hot: true,
    quite: false,
    noInfo: true
  }).listen(8090, "localhost", function (err) {
    if (err) {
      throw new gutil.PluginError("webpack-dev-server", err);
    }
    gutil.log("[webpack-dev-server]", "started on port 8090");
    cb();
  });
});

gulp.task("images", function () {
  return gulp.src(__dirname + "/app/images/**/*")
    .pipe(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(__dirname + "/dist/img"))
    .pipe(size());
});

gulp.task("sass", function () {
  return gulp.src(__dirname + "/app/styles/**/*.scss")
    .pipe(rubySass())
    .pipe(gulp.dest(__dirname + "/.tmp/css"));
});

gulp.task("styles", ["sass"], function () {
  return gulp.src(__dirname + "/.tmp/css/**/*.css")
    .pipe(concatCss("styles.css"))
    .pipe(gulp.dest(__dirname + "/dist/css"))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task("static:styles", function() {
  return gulp.src([
      __dirname + "/node_modules/bootstrap/dist/css/**/*.min.css",
      __dirname + "/node_modules/font-awesome/css/**/*.min.css"
    ])
    .pipe(gulp.dest(__dirname + "/dist/css"))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task("static:assets", function() {
  return gulp.src([
      __dirname + "/node_modules/bootstrap/dist/fonts/**/*",
      __dirname + "/node_modules/font-awesome/fonts/**/*"
    ])
    .pipe(gulp.dest(__dirname + "/dist/fonts"))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task("static:scripts", function() {
  return gulp.src([
    __dirname + "/node_modules/jquery/dist/jquery.min.js",
    __dirname + "/node_modules/jquery/dist/jquery.min.map",
    __dirname + "/node_modules/bootstrap/dist/js/bootstrap.min.js"
  ])
    .pipe(gulp.dest(__dirname + "/dist/js"))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task("dev", function () {
  runSequence(
    "clean",
    "images",
    "styles",
    "static:styles",
    "static:assets",
    "static:scripts",
    "webpack-dev-server",
    "connect"
  );
  gulp.watch(__dirname + "/app/images/**/*", ["images"]);
  gulp.watch(__dirname + "/app/styles/**/*", ["styles"]);
});

// +-------------+
// | BUILD TASKS |
// +-------------+

gulp.task("webpack:build", function (callback) {
  var config = Object.create(webpackConfig);
  config.plugins = [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ];

  webpack(config, function (err, stats) {
    if (err) {
      throw new gutil.PluginError("webpack:build", err);
    }
    gutil.log("[webpack:build]", stats.toString({
      colors: true
    }));
    return callback();
  });
});

gulp.task("build:styles", ["styles"], function () {
  return gulp.src(__dirname + "/dist/css/styles.css")
    .pipe(minifyCSS())
    .pipe(gulp.dest(__dirname + "/dist/css/"));
});

gulp.task("build", function(cb) {
  runSequence("clean", ["build:styles", "images", "webpack:build"], cb);
});
