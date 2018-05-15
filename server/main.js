// @flow
const express = require('express')
const debug = require('debug')('app:server')
const path = require('path')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const webpackConfig = require('../config/webpack.config')
const project = require('../config/project.config')
const compress = require('compression')

const app = express()

// Apply gzip compression
app.use(compress())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser('express_react_cookie'))
app.use(session({
  secret:'express_react_cookie',
  resave: true,
  saveUninitialized:true,
  cookie: { maxAge: 60 * 1000 * 30 }// 过期时间
}))
mongoose.Promise = require('bluebird')
mongoose.connect(`mongodb://${project.dbHost}:${project.dbPort}/live`, function (err) {
  if (err) {
    console.log(err, '数据库连接失败')
    return
  }
  console.log('数据库连接成功')
})
// 导入并使用数据库路由
app.use('/user', require('../src/server/user'))
// app.use('/post', require('../src/server/post'))
// ------------------------------------
// Apply Webpack HMR Middleware
// ------------------------------------
if (project.env === 'development') {
  const compiler = webpack(webpackConfig)

  debug('Enabling webpack dev and HMR middleware')
  app.use(require('webpack-dev-middleware')(compiler, {
    publicPath  : webpackConfig.output.publicPath,
    historyApiFallback: true,
    contentBase : project.paths.client(),
    hot         : true,
    quiet       : project.compiler_quiet,
    noInfo      : project.compiler_quiet,
    lazy        : false,
    stats       : project.compiler_stats
  }))
  app.use(require('webpack-hot-middleware')(compiler))

  // Serve static assets from ~/public since Webpack is unaware of
  // these files. This middleware doesn't need to be enabled outside
  // of development since this directory will be copied into ~/dist
  // when the application is compiled.
  app.use(express.static(project.paths.public()))

  // This rewrites all routes requests to the root /index.html file
  // (ignoring file requests). If you want to implement universal
  // rendering, you'll want to remove this middleware.
  app.use('*', function (req, res, next) {
    const filename = path.join(compiler.outputPath, 'index.html')
    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err)
      }
      res.set('content-type', 'text/html')
      res.send(result)
      res.end()
    })
  })
} else {
  debug(
    'Server is being run outside of live development mode, meaning it will ' +
    'only serve the compiled application bundle in ~/dist. Generally you ' +
    'do not need an application server for this and can instead use a web ' +
    'server such as nginx to serve your static files. See the "deployment" ' +
    'section in the README for more information on deployment strategies.'
  )

  // Serving ~/dist by default. Ideally these files should be served by
  // the web server and not the app server, but this helps to demo the
  // server in production.
  app.use(express.static(project.paths.dist()))
}

module.exports = app
