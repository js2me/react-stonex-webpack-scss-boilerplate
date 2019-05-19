const CircularDependencyPlugin = require('circular-dependency-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const Webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const optimize = process.argv.indexOf('-p') >= 0
const outPath = path.join(__dirname, './dist')
const sourcePath = path.join(__dirname, './src')

const ENVIRONMENT = process.env.ENVIRONMENT || 'local'

process.env.NODE_ENV = optimize ? 'production' : 'development'

const copyFile = file =>
  new CopyWebpackPlugin([
    { from: `../${file}`, to: `../dist/${file}`, toType: 'file' },
  ])

const localIdentName = (optimize ? '' : '[local]__') + '[hash:base64:5]'

module.exports = {
  context: sourcePath,
  mode: process.env.NODE_ENV,
  entry: {
    main: './index.js',
    vendor: ['react', 'react-dom', 'react-stonex', 'react-router', 'stonex'],
  },
  output: {
    path: outPath,
    publicPath: '/',
    filename: '[name][hash].js',
    chunkFilename: 'ch-[name][hash].js',
  },
  devtool: optimize ? 'hidden-source-map' : 'cheap-module-eval-source-map',
  target: 'web',
  resolve: {
    extensions: ['.js'],
    mainFields: ['browser', 'main'],
    alias: {
      '@': sourcePath,
      '@api': path.join(sourcePath, './store/api.js'),
      '@assets': path.join(sourcePath, './assets'),
      '@common': path.join(sourcePath, './components/common'),
      '@global_styles': path.join(sourcePath, './global_styles'),
      '@helpers': path.join(sourcePath, './helpers'),
      '@pages': path.join(sourcePath, './components/pages'),
      '@store': path.join(sourcePath, './store'),
    },
  },
  resolveLoader: {
    modules: ['node_modules', path.join(__dirname, '/loaders')],
  },
  module: {
    rules: [
      {
        test: /envs.js$/,
        exclude: /node_modules/,
        loaders: [
          'file-loader?name=[name].[ext]',
          'envs-loader?isProd=' + optimize,
        ],
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      // {
      //   test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      //   // loader: 'file-loader',
      //   use: [
      //     {
      //       loader: 'file-loader',
      //       options: {
      //         name: '[name].[ext]',
      //         outputPath: 'fonts/',
      //       },
      //     },
      //   ],
      // },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        loader: 'url-loader?limit=100000',
        include: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            query: {
              modules: false,
              sourceMap: !optimize,
              minimize: !optimize,
              importLoaders: 2,
              localIdentName: localIdentName,
            },
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'classnames-loader' },
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            query: {
              modules: true,
              sourceMap: !optimize,
              minimize: !optimize,
              importLoaders: 2,
              localIdentName: localIdentName,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: !optimize,
              includePaths: [
                path.resolve(sourcePath, './global_styles'),
                // path.resolve(sourcePath, './node_modules'),
              ],
            },
          },
        ],
        exclude: /\node_modules/,
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-react-loader',
            query: {
              modules: true,
              importLoaders: 1,
              localIdentName: localIdentName,
            },
          },
        ],
        exclude: /\node_modules/,
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
        exclude: /\node_modules/,
        options: {
          attrs: ['link:href'],
        },
      },
      {
        test: filename =>
          /\.(png|jpg|jpeg)$/.test(filename) && !/favicon\.png$/.test(filename),
        exclude: [/node_modules/],
        use: 'file-loader?name=[hash:base64:7].[ext]',
      },
      {
        test: /(favicon\.png)$/,
        exclude: [/node_modules/],
        use: 'file-loader?name=[name].[ext]',
      },
    ],
  },
  plugins: [
    new Webpack.DefinePlugin({
      ENVIRONMENT,
      NODE_ENV: ENVIRONMENT,
      'process.env.ENVIRONMENT': ENVIRONMENT,
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      isDev: !optimize,
    }),
    new Webpack.optimize.AggressiveMergingPlugin(),
    new ExtractTextPlugin({
      filename: 'styles.css',
      disable: !optimize,
    }),
    new HtmlWebpackPlugin({
      template: 'index.html',
    }),
  ].concat(
    optimize
      ? [
          copyFile('.htaccess'),
          copyFile('robots.txt'),
          // copyFile('src/envs.js'),
        ]
      : [
          new CircularDependencyPlugin({
            // exclude detection of files based on a RegExp
            exclude: /a\.js|node_modules/,
            // add errors to webpack instead of warnings
            failOnError: false,
            // set the current working directory for displaying module paths
            cwd: process.cwd(),
          }),
        ]
  ),
  devServer: {
    contentBase: sourcePath,
    hot: true,
    stats: {
      warnings: false,
    },
  },
  optimization: optimize
    ? {
        minimizer: [
          new UglifyJsPlugin({
            cache: true,
            parallel: true,
            uglifyOptions: { output: { comments: false } },
          }),
          new OptimizeCSSAssetsPlugin({}),
        ],
        splitChunks: {
          minSize: 30000,
          maxSize: 0,
          minChunks: 3,
          automaticNameDelimiter: '-',
          chunks: 'all',
        },
      }
    : undefined,
  node: {
    // workaround for webpack-dev-server issue
    // https://github.com/webpack/webpack-dev-server/issues/60#issuecomment-103411179
    fs: 'empty',
    net: 'empty',
  },
}
