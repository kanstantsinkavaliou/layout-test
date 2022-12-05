const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

let mode = 'development'
if (process.env.NODE_ENV === 'production'){
    mode = 'production'
}

console.log("mode = " + mode)

module.exports = {
    mode,
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
            chunks: ['main']
        }),
        new HtmlWebpackPlugin({
            template: "./src/pages/channel/channel-page.html",
            filename: 'channel-page.html',
            chunks: ['channel-page']
        }),
        new MiniCssExtractPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    mode !== 'development' ? "style-loader" : MiniCssExtractPlugin.loader,
                    "css-loader",
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions:{
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {

                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "sass-loader",
                ],
            }
        ]
    },
    output: {
        path: __dirname + '/dist', // Folder to store generated bundle
        publicPath: '/',
        filename: '[name].[contenthash].js',
        clean: true,
    },
    devtool: 'source-map',
    optimization: {
        minimizer: [
        '...',
        new CssMinimizerPlugin(),
        ],
    },
}