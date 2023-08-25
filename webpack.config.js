const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

const docRootPath = path.resolve(__dirname, 'dist');


module.exports = {
    mode: process.env.NODE_ENV,
    entry: {
        main: ['./js/index.js', './scss/main.scss']
    },
    output: {
        filename: '[name].js',
        path: docRootPath,
    },
    module: {
        rules: [
            {
                test: /\.s?[ac]ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.(jpe?g|png)$/i,
                type: "asset",
            }
        ],
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
                        plugins: [
                            ["jpegtran", { progressive: true }],
                            ["optipng", { optimizationLevel: 5 }]
                        ]
                    },
                },
            }),
        ],
        minimize: true,
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css'
        }),
    ],
};