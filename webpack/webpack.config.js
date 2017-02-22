/**
 * Created by liujinhe on 17/2/22.
 */
//refer to link http://blog.csdn.net/zhbhun/article/details/47208885
let path = require('path');
let webpack = require('webpack');

let ExtractTextPlugin = require('extract-text-webpack-plugin');
//为什么要HMR:Hot Module Replacement (HMR) exchanges, adds, or removes modules while an application is running without a page reload.

const contextRoot = path.resolve(__dirname, '..');

const devScript = "webpack/hot/dev-server";//bundle the client for hot reloading
const hotScript = "webpack-hot-middleware/client?path=http://127.0.0.1:3001/__webpack_hmr&timeout=20000";//bundle the client for webpack dev server

//and connect to the provided endpoint


var publicPath = 'http://127.0.0.1:3001/assets/';
//assets/ 也可以，但是做服务端渲染的时候，需要指明具体ip地址。如果不加上的话，客户端渲染引用的是/assets/,服务器引用的是http:/127.0.0.1:xxxx/assets
// 因为服务端渲染的服务器和客户端hmr服务器是不同的，
//如果用的相对地址 /assets/的话
// 客户端渲染引用的是http://127.0.0.1:(hmr:端口)/assets/,
// 服务器引用的是http:/127.0.0.1:(服务器渲染服务器端口)/assets/,因为服务器的配置文件是拷贝服务端的webpack.config.js文件的

module.exports = {
    context: contextRoot,//webpack处理entry选项时的基础路径（绝对路径），默认值为process.cmd()，即webpack.config.js文件所在路径
    entry: [
        hotScript,
        devScript,
        './src/client/web/entry.js'
    ],
    output: {
        path: '/build',
        publicPath: publicPath,
        filename: 'bundle.js',
        chunkFilename: '[name][chunkhash].js'//用于指定非程序入口模块集的文件名称
    }
    , module: {
        rules: [
            {
                test: /\.js$/,
                use: ['react-hot-loader','babel-loader'],
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.json$/,
                use: 'json-loader',
                exclude: /(node_modules|bower_components)/
            },
            {
                test: /\.(jpe?g|png|gif|svg|less|css)$/i,
                use: 'url-loader?limit=1000'
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader', loader: [
                        {
                            loader: 'css-loader', options: {
                            discardComments: {removeAll: true}
                        }
                        }
                    ]
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract(
                    {
                        fallback: 'style-loader', loader: [
                        {
                            loader: 'css-loader',
                            options: {
                                discardComments: {
                                    removeAll: true
                                }
                            }
                        }
                        , {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [
                                        require('autoprefixer')

                                    ]
                                }
                            }

                        },
                        {
                            loader: 'sass-loader'
                        }
                    ]
                    }
                )
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract(
                    {
                        fallback: 'style-loader', loader: [
                        {
                            loader: 'css-loader',
                            options: {
                                discardComments: {
                                    removeAll: true
                                }
                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: function () {
                                    return [
                                        require('autoprefixer')
                                    ]
                                }
                            }
                        },
                        {
                            loader: 'less-loader'
                        }
                    ]
                    }
                )
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),//the plugin is a useful addition to better understand what modules are being updated when using HMR.
        new webpack.NoEmitOnErrorsPlugin(),//用来跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误
        new ExtractTextPlugin({filename: 'style.css', allChunks: true})//https://webpack.github.io/docs/stylesheets.html(allChunks: true,Additional files required with require.ensure don’t contain embedded styles)
    ]
}