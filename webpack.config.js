// module.exports — это синтаксис экспорта в Node.js
const path = require('path'); // подключаем path к конфигу вебпак. Нужен для работы относительных путей
const HtmlWebpackPlugin = require('html-webpack-plugin'); // плагин для работы с html
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // подключили плагин для чистки dist
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); // плагин для минификации css

module.exports = {
  // указали первое место, куда заглянет webpack, — файл index.js в папке src
  entry: { main: './src/scripts/index.js' },
  // указали в какой файл будет собираться весь js и дали ему имя
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: ''
  },
  mode: 'development', //режим разработчика
  devServer: {
    contentBase: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
    compress: true, // это ускорит загрузку в режиме разработки
    port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080

    open: true // сайт будет открываться сам при запуске npm run dev
  },
  module: {
    rules: [ // rules — это массив правил
      // добавим в него объект правил для бабеля
      {
        // регулярное выражение, которое ищет все js файлы
        test: /\.js$/,
        // при обработке этих файлов нужно использовать babel-loader
        use: {
          loader: 'babel-loader',
          options: {
            plugins: ["@babel/plugin-proposal-class-properties"]
          }
        },
        // исключает папку node_modules, файлы в ней обрабатывать не нужно
        exclude: '/node_modules/'
      },
      // добавили правило для обработки файлов
      {
        // регулярное выражение, которое ищет все файлы с такими расширениями
        test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
        type: 'asset/resource'
      },
      // правила для css
      {
        // применять это правило только к CSS-файлам
        test: /\.css$/,
        // при обработке этих файлов нужно использовать
        // MiniCssExtractPlugin.loader и css-loader
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
          // добавьте объект options для postcss-loader
          options: { importLoaders: 1 }
        },
          // postcss-loader для css
          'postcss-loader']
      }
    ]
  },
  plugins: [ //Магия подключения html
    new HtmlWebpackPlugin({
      template: './src/index.html' // путь к файлу index.html
    }),
    new CleanWebpackPlugin(), // использовали плагин для чистки dist
    new MiniCssExtractPlugin() // подключение плагина для минификации css
  ]
};

