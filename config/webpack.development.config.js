const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js', // ваш основной файл приложения
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },
  devtool: 'eval-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
      publicPath: '/',
    },
    compress: true,
    port: 3000,
    hot: true, // Включаем Hot Module Replacement
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*', // CORS заголовки
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
    }
  },
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets')
    },
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],  // Добавьте нужные расширения
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript' // если используете TS
            ]
          }
        }
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ['@svgr/webpack', 'file-loader'], // Для использования SVG как React-компонентов
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        type: "asset/resource",
        generator: {
          filename: 'images/[name][ext]',
        }
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                auto: true // Для CSS-модулей
              }
            }
          },
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html' // ваш HTML шаблон
    })
  ]
};