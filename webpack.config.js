const path = require('path');

module.exports = {
  entry: {
    sw: './src/modules/bg/sw.ts',
    content_script: './src/modules/content/content_script.ts'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'build/src'),
    clean: true,
  },
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
  },
};
