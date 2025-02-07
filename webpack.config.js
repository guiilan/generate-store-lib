const path = require('path');

module.exports = {
  entry: './src/generate.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'generate-store.js',
    library: 'generate-store',
    libraryTarget: 'umd'
  },
  mode: 'production'
};
