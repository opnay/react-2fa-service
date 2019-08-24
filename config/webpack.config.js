const fs = require('fs');
const path = require('path');
const projectDir = fs.realpathSync(process.cwd());
const _ = (relPath) => path.resolve(projectDir, relPath);

const port = process.env.PORT || 3000;
const publicUrl = '';

const Webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = function(opt) {
  return {
    mode: opt.mode || 'production',
    devtool: opt.devtool || false,
    devServer: opt.devServer || {},
    target: 'web',
    entry: './src/index.tsx',
    output: {
      filename: opt.output.filename,
      path: _('build'),
      publicPath: publicUrl + '/'
    },
    resolve: {
      modules: ['node_modules'],
      extensions: ['.tsx', '.ts', '.js', 'jsx', '.json', '.css']
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: ['ts-loader', 'eslint-loader']
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            }
          ]
        },
        {
          test: /\.svg$/,
          use: {
            loader: 'svg-url-loader?encoding=base64'
          }
        },
        {
          test: /\.html$/,
          use: {
            loader: 'html-loader',
            options: {
              attrs: [':data-src']
            }
          }
        }
      ]
    },
    plugins: [
      new ForkTsCheckerWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: 'public/index.html',
        favicon: 'public/favicon.ico',
        inject: true,
        minify: {
          removeComments: true
        }
      }),
      new InterpolateHtmlPlugin(HtmlWebpackPlugin, {
        PUBLIC_URL: publicUrl
      }),
      new Webpack.DefinePlugin({ 'process.env.FIREBASE': process.env.FIREBASE })
    ]
  };
};
