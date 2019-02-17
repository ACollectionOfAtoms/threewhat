const path = require('path');

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  resolve: {
    modules: ['./node_modules', path.resolve(__dirname, 'src')],
    extensions: ['.ts', '.glsl']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(glsl)$/,
        exclude: /node_modules/,
        use: [
          'raw-loader',
          'glslify-loader'
        ]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js'
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    inline: false,
    port: 9000
  }
};
