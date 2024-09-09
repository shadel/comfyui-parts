const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: 'ComfyUIParts',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  target: 'web',
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.BROWSER': JSON.stringify(true),
    }),
  ],
  resolve: {
    fallback: {
      "fs": false // Exclude fs module for browser bundles
    },
  },
};
