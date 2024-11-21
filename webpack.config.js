const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const ExtReloader = require('webpack-ext-reloader');

module.exports = {
  mode: 'development',
  watch: true,
  entry: {
    popup: './src/popup.js',
    options: './src/options.js',
    'content-script': './src/content-script.js'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new ExtReloader({
      port: 9090,
      reloadPage: true,
      entries: {
        contentScript: 'content-script',
        extensionPage: ['popup', 'options']
      }
    }),
    new CopyPlugin({
      patterns: [
        { from: "src/manifest.json", to: "manifest.json" },
        { from: "src/popup.html", to: "popup.html" },
        { from: "src/options.html", to: "options.html" }
      ],
    })
  ]
}; 