const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'production',
    //  where to look for the changes
    //  resolve to an absolute path
    context: path.resolve(__dirname, 'src'),
    entry: {
        app: ['./templates/javascript/index.js']
    },
    output: {
        filename: './templates/javascript/dist/bundle.js',
        //  resolve to an absolute path
        path: path.resolve(__dirname, './src'),
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            url: false
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: function () {
                                return [
                                    require('precss'),
                                    require('autoprefixer')];
                            }
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: "templates/fonts/",
                        }
                    }
                ]
            },
            {
                test:/\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/env'],
                    }
                }
            }
        ],
    },
    performance: {
        hints: false
    },
    devtool: "source-map",
    watch: true,
    plugins: [
        new MiniCssExtractPlugin({
            filename: './templates/css/stylesheet.css',
        })
    ]
}