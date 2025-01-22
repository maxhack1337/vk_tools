var BomPlugin = require('webpack-utf8-bom');
const path = require('path');

module.exports = {
  entry: {
    sw: './src/modules/bg/sw.ts',
    content_script: './src/modules/content/content_script.ts',
    main: './src/modules/inject/main.ts'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build/src'),
    clean: true,
  },
  plugins: [
    new BomPlugin(true)
  ],
  module: {
    rules: [{
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.css'],
    alias: {
        'hls.js': path.resolve(__dirname, 'node_modules/hls.js'),
    },
  },
};