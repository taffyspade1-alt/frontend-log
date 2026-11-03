// 动态导入文件路径
const path = require('path')

// HTML 插件
const htmlwebpackPlugin = require('html-webpack-plugin');

// CSS
const MiniCssExtractPlugin =
  require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin =
  require('optimize-css-assets-webpack-plugin'); // 压缩 CSS 的插件

module.exports = {
  mode: 'production', // production 和 development
  entry: './index.js', // webpack 打包时的入口文件
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/bundle.js' // 打包成功之后的文件名
  },
  module: {
    rules: [
      // 从右往左处理 loader
      {
        test: /.(css|scss)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      }
    ]
  },
  // 插件
  plugins: [
    new htmlwebpackPlugin({
      template: './src/index.html',
      minify: { // 压缩 HTML 文件
        removeComments: true, // 删除注释
        collapseWhitespace: true, // 删除空格
        removeEmptyAttributes: true, // 删除空的属性
      }
    }),
    new MiniCssExtractPlugin({
      filename: "css/style.css", // 都移到 dist 目录下的 CSS 目录中
    }),
    new OptimizeCssAssetsPlugin() // 压缩 CSS 文件
  ],
  devServer: {
    contentBase: path.resolve(__dirname, 'public'),
    host: 'localhost',
    inline: true,
    port: 8081
  }
}
