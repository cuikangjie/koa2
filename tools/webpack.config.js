const webpack = require('webpack');
const path = require('path')
const nodeExternals = require('webpack-node-externals')
let DEV = true
if (process.argv.includes('--release')) {
   DEV = false
}

let nodeConfig = {
  entry: {
    app: ["babel-polyfill", path.resolve(__dirname, '../src/app.js')],
    ...(!DEV ? {start: [path.resolve(__dirname, '../pm2/index.js')]} : {})
  },
  target: 'node',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: '[name].js',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    modules: ['node_modules', 'src']
  },
  externals: nodeExternals({whitelist:['kin-toolkits/pm2/index.js']}),
  node: {
    console: true,
    global: true,
    process: true,
    Buffer: true,
    __filename: false,
    __dirname: false,
    setImmediate: true
  },
  module: {
    rules: [{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }]
  },
  plugins: [
    // ...( DEV ? [] : [
    //   new webpack.optimize.UglifyJsPlugin(),
    // ]),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': DEV ? '"development"' : '"production"',
      __DEV__ :DEV

    }),
  ]
};


module.exports = nodeConfig
