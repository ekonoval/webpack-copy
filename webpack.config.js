const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
    mode: 'development',

    devtool: 'inline-source-map',

    entry: {
        'main': './assets/fake.js',
    },
    output: {
        filename: '[name].bundle.js',
    },

    externals: {
        jquery: 'jQuery'
    },


    plugins: [
        new CleanWebpackPlugin({verbose: true}),
        new CopyWebpackPlugin([
                {
                    from: './assets/**',
                    ignore: ['*/_src/**/*'],
                    to: '[path][name].[ext]',
                }
            ],
            {copyUnmodified: true}
            //{logLevel: 'debug', copyUnmodified: true}
        )
    ],

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },

            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            publicPath: '/dist/'
                            //     outputPath: 'img',
                            //     name: '[hash].[ext]'
                        }
                    }
                ]
            }
        ],
    },
};