const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const path = require('path');

module.exports = {
    entry: {
        lib: './src/bundles/lib.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: './.errors/[name].[contentHash].bundle.js',
    },
    optimization: {
        minimizer: [
            new OptimizeCssAssetsPlugin(),
            new TerserPlugin(),
        ],
    },
    mode: 'production',
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            chunks: ['lib'],
            filename: '404.html',
            template: './src/html/404.html'
        }),
        new HtmlWebpackPlugin({
            chunks: ['lib'],
            filename: '50x.html',
            template: './src/html/50x.html'
        }),
        new CompressionPlugin({
            filename: '[path].br[query]',
            algorithm: 'brotliCompress',
            test: /\.(js|css|html|wasm)$/,
        }),
        new CompressionPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.(js|css|html|wasm)$/,
        }),
        new MiniCssExtractPlugin({filename: './.errors/[name].[contentHash].css'}),
    ],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: [
                    'file-loader',
                ],
            }
        ]
    },
};