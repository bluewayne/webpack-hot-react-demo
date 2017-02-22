/**
 * Created by liujinhe on 17/2/22.
 */

var express = require('express');
var path = require('path');
var http = require('http');

var webpack = require('webpack');

var app = new express();
var server = http.Server(app);


var webpackConfig = require(path.resolve(__dirname, '../..', './webpack/webpack.config.js'));
var webpackDevMid = require('webpack-dev-middleware');
var webpackHotMid = require('webpack-hot-middleware');  //bundle the client for hot reloading
var compiler = webpack(webpackConfig);

app.use(webpackDevMid(compiler, {
    publicPath: `${webpackConfig.output.publicPath}`,
    noInfo: true,
    stats: {
        colors: true
    }
}));

app.use(webpackHotMid(compiler, {
    log: console.log, heartbeat: 10 * 1000
}))

server.listen(3001, function (err) {

    if (err) {
        console.error('hmr server got error!')

    } else {

        console.info('hmr run on port 3001!');

    }

})



