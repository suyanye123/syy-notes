# 打包工具

## 一、Webpack 简介

### 1.1 webpack 是什么

webpack 是一种**前端资源构建工具**，一个静态模块打包器(module bundler)。

在webpack 看来, 前端的所有资源文件(js/json/css/img/less/...)都会作为模块处理。
它将根据模块的依赖关系进行静态分析，打包生成对应的静态资源(bundle)。

### 1.2 webpack 五个核心概念

#### 1.2.1 Entry

入口(Entry)：指示 webpack 以哪个文件为入口起点开始打包，分析构建内部依赖图。

#### 1.2.2 Output

输出(Output)：指示 webpack 打包后的资源 bundles 输出到哪里去，以及如何命名。

#### 1.2.3 Loader

Loader：让 webpack 能够去处理那些非 JS 的文件，比如样式文件、图片文件(webpack 自身只理解
JS)

#### 1.2.4 Plugins

插件(Plugins)：可以用于执行范围更广的任务。插件的范围包括，从打包优化和压缩，
一直到重新定义环境中的变量等。

#### 1.2.5 Mode

模式(Mode)：指示 webpack 使用相应模式的配置。

| 选项        | 描述                                                         | 特点                       |
| ----------- | ------------------------------------------------------------ | -------------------------- |
| development | 会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 development。启用 NamedChunksPlugin 和 NamedModulesPlugin。 | 能让代码本地调试运行的环境 |
| production  | 会将 DefinePlugin 中 process.env.NODE_ENV 的值设置为 production。启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 TerserPlugin。 | 能让代码优化上线运行的环境 |

## 二、Webpack 初体验

### 2.1 初始化配置

1. 初始化 package.json：npm init

2. 下载安装webpack：(webpack4以上的版本需要全局/本地都安装webpack-cli)

   全局安装：cnpm i webpack webpack-cli -g

   本地安装：cnpm i webpack webpack-cli -D

### 2.2 编译打包应用

创建 src 下的 js 等文件后，不需要配置 webpack.config.js 文件，在命令行就可以编译打包。

指令：

- 开发环境：webpack ./src/index.js -o ./build/built.js --mode=development

  webpack会以 ./src/index.js 为入口文件开始打包，打包后输出到 ./build/built.js 整体打包环境，是开发环境

- 生产环境：webpack ./src/index.js -o ./build/built.js --mode=production

  webpack会以 ./src/index.js 为入口文件开始打包，打包后输出到 ./build/built.js 整体打包环境，是生产环境

结论：

1. webpack 本身能处理 js/json 资源，不能处理 css/img 等其他资源
2. 生产环境和开发环境将 ES6 模块化编译成浏览器能识别的模块化，但是不能处理 ES6 的基本语法转化为 ES5（需要借助 loader）
3. 生产环境比开发环境多一个压缩 js 代码

## 三、Webpack 开发环境的基本配置

webpack.config.js 是 webpack 的配置文件。

作用: 指示 webpack 干哪些活（当你运行 webpack 指令时，会加载里面的配置）

所有构建工具都是基于 nodejs 平台运行的，模块化默认采用 commonjs。

开发环境配置主要是为了能让代码运行。主要考虑以下几个方面：

- 打包样式资源
- 打包 html 资源
- 打包图片资源
- 打包其他资源
- devServer

下面是一个简单的开发环境webpack.confg.js配置文件

```js
// resolve用来拼接绝对路径的方法
const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin') // 引用plugin

module.exports = {
  // webpack配置
  entry: './src/js/index.js', // 入口起点
  output: {
    // 输出
    // 输出文件名
    filename: 'js/build.js',
    // __dirname是nodejs的变量，代表当前文件的目录绝对路径
    path: resolve(__dirname, 'build'), // 输出路径，所有资源打包都会输出到这个文件夹下
  },
  // loader配置
  module: {
    rules: [
      // 详细的loader配置
      // 不同文件必须配置不同loader处理
      {
        // 匹配哪些文件
        test: /\.less$/,
        // 使用哪些loader进行处理
        use: [
          // use数组中loader执行顺序：从右到左，从下到上，依次执行(先执行css-loader)
          // style-loader：创建style标签，将js中的样式资源插入进去，添加到head中生效
          'style-loader',
          // css-loader：将css文件变成commonjs模块加载到js中，里面内容是样式字符串
          'css-loader',
          // less-loader：将less文件编译成css文件，需要下载less-loader和less
          'less-loader'
        ],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        // url-loader：处理图片资源，问题：默认处理不了html中的img图片
        test: /\.(jpg|png|gif)$/,
        // 需要下载 url-loader file-loader
        loader: 'url-loader',
        options: {
          // 图片大小小于8kb，就会被base64处理，优点：减少请求数量（减轻服务器压力），缺点：图片体积会更大（文件请求速度更慢）
          // base64在客户端本地解码所以会减少服务器压力，如果图片过大还采用base64编码会导致cpu调用率上升，网页加载时变卡
          limit: 8 * 1024,
          // 给图片重命名，[hash:10]：取图片的hash的前10位，[ext]：取文件原来扩展名
          name: '[hash:10].[ext]',
          // 问题：因为url-loader默认使用es6模块化解析，而html-loader引入图片是conmonjs，解析时会出问题：[object Module]
          // 解决：关闭url-loader的es6模块化，使用commonjs解析
          esModule: false,
          outputPath: 'imgs',
        },
      },
      {
        test: /\.html$/,
        // 处理html文件的img图片（负责引入img，从而能被url-loader进行处理）
        loader: 'html-loader',
      },
      // 打包其他资源(除了html/js/css资源以外的资源)
      {
        // 排除html|js|css|less|jpg|png|gif文件
        exclude: /\.(html|js|css|less|jpg|png|gif)/,
        // file-loader：处理其他文件
        loader: 'file-loader',
        options: {
          name: '[hash:10].[ext]',
          outputPath: 'media',
        },
      },
    ],
  },
  // plugin的配置
  plugins: [
    // html-webpack-plugin：默认会创建一个空的html文件，自动引入打包输出的所有资源（JS/CSS）
    // 需要有结构的HTML文件可以加一个template
    new HtmlWebpackPlugin({
      // 复制这个./src/index.html文件，并自动引入打包输出的所有资源（JS/CSS）
      template: './src/index.html',
    }),
  ],
  // 模式
  mode: 'development', // 开发模式
  // 开发服务器 devServer：用来自动化，不用每次修改后都重新输入webpack打包一遍（自动编译，自动打开浏览器，自动刷新浏览器）
  // 特点：只会在内存中编译打包，不会有任何输出（不会像之前那样在外面看到打包输出的build包，而是在内存中，关闭后会自动删除）
  // 启动devServer指令为：npx webpack-dev-server
  devServer: {
    // 项目构建后路径
    contentBase: resolve(__dirname, 'build'),
    // 启动gzip压缩
    compress: true,
    // 端口号
    port: 3000,
    // 自动打开浏览器
    open: true,
  },
}
```

其中，大部分配置都在注释中给出解释。

- 运行项目的两个指令：
  webpack 会将打包结果输出出去（build文件夹）
  npx webpack-dev-server 只会在内存中编译打包，没有输出

- loader 和 plugin 的不同：（plugin 一定要先引入才能使用）

   loader：1. 下载 2. 使用（配置 loader）

   plugins：1.下载 2. 引入 3. 使用

## 四、Webpack 生产环境的基本配置

而生产环境的配置需要考虑以下几个方面：

- 提取 css 成单独文件
- css 兼容性处理
- 压缩 css
- js 语法检查
- js 兼容性处理
- js 压缩
- html 压缩

下面是一个基本的生产环境下的webpack.config.js配置

```
const { resolve } = require('path')
const MiniCssExtractorPlugin = require('mini-css-extract-plugin')
const OptimiziCssAssetsWebpackPlugin = require('optimizi-css-assets-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 定义node.js的环境变量，决定使用browserslist的哪个环境
process.env.NODE_ENV = 'production'

// 复用loader的写法
const commonCssLoader = [
  // 这个loader取代style-loader。作用：提取js中的css成单独文件然后通过link加载
  MiniCssExtractPlugin.loader,
  // css-loader：将css文件整合到js文件中
  // 经过css-loader处理后，样式文件是在js文件中的
  // 问题：1.js文件体积会很大2.需要先加载js再动态创建style标签，样式渲染速度就慢，会出现闪屏现象
  // 解决：用MiniCssExtractPlugin.loader替代style-loader
  'css-loader',
  /*
    postcss-loader：css兼容性处理：postcss --> 需要安装：postcss-loader postcss-preset-env
    postcss需要通过package.json中browserslist里面的配置加载指定的css兼容性样式
    在package.json中定义browserslist：
    "browserslist": {
      // 开发环境 --> 设置node环境变量：process.env.NODE_ENV = development
      "development": [ // 只需要可以运行即可
        "last 1 chrome version",
        "last 1 firefox version",
        "last 1 safari version"
      ],
      // 生产环境。默认是生产环境
      "production": [ // 需要满足绝大多数浏览器的兼容
        ">0.2%",
        "not dead",
        "not op_mini all"
      ]
    },
  */
  {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss', // 基本写法
      plugins: () => [
        // postcss的插件
        require('postcss-preset-env')(),
      ],
    },
  },
]

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [...commonCssLoader],
      },
      {
        test: /\.less$/,
        use: [...commonCssLoader, 'less-loader'],
      },
      /*
        正常来讲，一个文件只能被一个loader处理
        当一个文件要被多个loader处理，那么一定要指定loader执行的先后顺序
        先执行eslint再执行babel（用enforce）
      */
      {
        /*
          js的语法检查： 需要下载 eslint-loader eslint
          注意：只检查自己写的源代码，第三方的库是不用检查的
          airbnb(一个流行的js风格) --> 需要下载 eslint-config-airbnb-base eslint-plugin-import
          设置检查规则：
            package.json中eslintConfig中设置
              "eslintConfig": {
                "extends": "airbnb-base"， // 继承airbnb的风格规范
                "env": {
                  "browser": true // 可以使用浏览器中的全局变量(使用window不会报错)
                }
              }
        */
        test: /\.js$/,
        exclude: /node_modules/, // 忽略node_modules
        enforce: 'pre', // 优先执行
        loader: 'eslint-loader',
        options: {
          // 自动修复
          fix: true,
        },
      },
      /*
        js兼容性处理：需要下载 babel-loader @babel/core
          1. 基本js兼容性处理 --> @babel/preset-env
            问题：只能转换基本语法，如promise高级语法不能转换
          2. 全部js兼容性处理 --> @babel/polyfill
            问题：只要解决部分兼容性问题，但是将所有兼容性代码全部引入，体积太大了
          3. 需要做兼容性处理的就做：按需加载  --> core-js
      */
      {
        // 第三种方式：按需加载
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          // 预设：指示babel做怎样的兼容性处理
          presets: [
            '@babel/preset-env', // 基本预设
            {
              useBuiltIns: 'usage', //按需加载
              corejs: { version: 3 }, // 指定core-js版本
              targets: { // 指定兼容到什么版本的浏览器
                chrome: '60',
                firefox: '50',
                ie: '9',
                safari: '10',
                edge: '17'
              },
            },
          ],
        },
      },
      {
        // 图片处理
        test: /\.(jpg|png|gif)/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          outputPath: 'imgs',
          esModule: false, // 关闭url-loader默认使用的es6模块化解析
        },
      },
      // html中的图片处理
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      // 处理其他文件
      {
        exclude: /\.(js|css|less|html|jpg|png|gif)/,
        loader: 'file-loader',
        options: {
          outputPath: 'media',
        },
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      // 对输出的css文件进行重命名
      filename: 'css/built.css',
    }),
    // 压缩css
    new OptimiziCssAssetsWebpackPlugin(),
    // HtmlWebpackPlugin：html文件的打包和压缩处理
    // 通过这个插件会自动将单独打包的样式文件通过link标签引入
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // 压缩html代码
      minify: {
        // 移除空格
        collapseWhitespace: true,
        // 移除注释
        removeComments: true,
      },
    }),
  ],
  // 生产环境下会自动压缩js代码
  mode: 'production',
}
```

## 五、Webpack 优化配置

### 5.1 开发环境性能优化

#### 5.1.1 HMR（模块热替换）

HMR: hot module replacement 热模块替换 / 模块热替换

作用：一个模块发生变化，只会重新打包构建这一个模块（而不是打包所有模块） ，极大提升构建速度

代码：只需要在 devServer 中设置 hot 为 true，就会自动开启HMR功能（只能在开发模式下使用）

```
devServer: {
  contentBase: resolve(__dirname, 'build'),
  compress: true,
  port: 3000,
  open: true,
  // 开启HMR功能
  // 当修改了webpack配置，新配置要想生效，必须重启webpack服务
  hot: true
}
```

每种文件实现热模块替换的情况：

- 样式文件：可以使用HMR功能，因为开发环境下使用的 style-loader 内部默认实现了热模块替换功能

- js 文件：默认不能使用HMR功能（修改一个 js 模块所有 js 模块都会刷新）

  --> 实现 HMR 需要修改 js 代码（添加支持 HMR 功能的代码）

  ```
  // 绑定
  if (module.hot) {
    // 一旦 module.hot 为true，说明开启了HMR功能。 --> 让HMR功能代码生效
    module.hot.accept('./print.js', function() {
      // 方法会监听 print.js 文件的变化，一旦发生变化，只有这个模块会重新打包构建，其他模块不会。
      // 会执行后面的回调函数
      print();
    });
  }
  ```

  注意：HMR 功能对 js 的处理，只能处理非入口 js 文件的其他文件。

- html 文件: 默认不能使用 HMR 功能（html 不用做 HMR 功能，因为只有一个 html 文件，不需要再优化）

  使用 HMR 会导致问题：html 文件不能热更新了（不会自动打包构建）

  解决：修改 entry 入口，将 html 文件引入（这样 html 修改整体刷新）

  ```
  entry: ['./src/js/index.js', './src/index.html']
  ```

#### 5.1.2 source-map

source-map：一种提供**源代码到构建后代码的映射**的技术 （如果构建后代码出错了，通过映射可以追踪源代码错误）

参数：`[inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map`

代码：

```
devtool: 'eval-source-map'
```

可选方案：[生成source-map的位置|给出的错误代码信息]

- source-map：外部，错误代码准确信息 和 源代码的错误位置
- inline-source-map：内联，只生成一个内联 source-map，错误代码准确信息 和 源代码的错误位置
- hidden-source-map：外部，错误代码错误原因，但是没有错误位置（为了隐藏源代码），不能追踪源代码错误，只能提示到构建后代码的错误位置
- eval-source-map：内联，每一个文件都生成对应的 source-map，都在 eval 中，错误代码准确信息 和 源代码的错误位
- nosources-source-map：外部，错误代码准确信息，但是没有任何源代码信息（为了隐藏源代码）
- cheap-source-map：外部，错误代码准确信息 和 源代码的错误位置，只能把错误精确到整行，忽略列
- cheap-module-source-map：外部，错误代码准确信息 和 源代码的错误位置，module 会加入 loader 的 source-map

内联 和 外部的区别：1. 外部生成了文件，内联没有 2. 内联构建速度更快

开发/生产环境可做的选择：

**开发环境**：需要考虑速度快，调试更友好

- 速度快( eval > inline > cheap >... )
  1. eval-cheap-souce-map
  2. eval-source-map
- 调试更友好
  1. souce-map
  2. cheap-module-souce-map
  3. cheap-souce-map

**最终得出最好的两种方案 --> eval-source-map（完整度高，内联速度快） / eval-cheap-module-souce-map（错误提示忽略列但是包含其他信息，内联速度快）**

**生产环境**：需要考虑源代码要不要隐藏，调试要不要更友好

- 内联会让代码体积变大，所以在生产环境不用内联
- 隐藏源代码
  1. nosources-source-map 全部隐藏
  2. hidden-source-map 只隐藏源代码，会提示构建后代码错误信息

**最终得出最好的两种方案 --> source-map（最完整） / cheap-module-souce-map（错误提示一整行忽略列）**

### 5.2 生产环境性能优化

### 5.2.1 优化打包构建速度

#### 5.2.1.1 oneOf

oneOf：匹配到 loader 后就不再向后进行匹配，优化生产环境的打包构建速度

代码：

```
module: {
  rules: [
    {
      // js 语法检查
      test: /\.js$/,
      exclude: /node_modules/,
      // 优先执行
      enforce: 'pre',
      loader: 'eslint-loader',
      options: {
        fix: true
      }
    },
    {
      // oneOf 优化生产环境的打包构建速度
      // 以下loader只会匹配一个（匹配到了后就不会再往下匹配了）
      // 注意：不能有两个配置处理同一种类型文件（所以把eslint-loader提取出去放外面）
      oneOf: [
        {
          test: /\.css$/,
          use: [...commonCssLoader]
        },
        {
          test: /\.less$/,
          use: [...commonCssLoader, 'less-loader']
        },
        {
          // js 兼容性处理
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: {version: 3},
                  targets: {
                    chrome: '60',
                    firefox: '50'
                  }
                }
              ]
            ]
          }
        },
        {
          test: /\.(jpg|png|gif)/,
          loader: 'url-loader',
          options: {
            limit: 8 * 1024,
            name: '[hash:10].[ext]',
            outputPath: 'imgs',
            esModule: false
          }
        },
        {
          test: /\.html$/,
          loader: 'html-loader'
        },
        {
          exclude: /\.(js|css|less|html|jpg|png|gif)/,
          loader: 'file-loader',
          options: {
            outputPath: 'media'
          }
        }
      ]
    }
  ]
},
```

#### 5.2.1.2 babel 缓存

**babel 缓存**：类似 HMR，将 babel 处理后的资源缓存起来（哪里的 js 改变就更新哪里，其他 js 还是用之前缓存的资源），让第二次打包构建速度更快

代码：

```
{
  test: /\.js$/,
  exclude: /node_modules/,
  loader: 'babel-loader',
  options: {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'usage',
          corejs: { version: 3 },
          targets: {
            chrome: '60',
            firefox: '50'
          }
        }
      ]
    ],
    // 开启babel缓存
    // 第二次构建时，会读取之前的缓存
    cacheDirectory: true
  }
},
```

**文件资源缓存**

文件名不变，就不会重新请求，而是再次用之前缓存的资源

1.hash: 每次 wepack 打包时会生成一个唯一的 hash 值。

 问题：重新打包，所有文件的 hsah 值都改变，会导致所有缓存失效。（可能只改动了一个文件）

2.chunkhash：根据 chunk 生成的 hash 值。来源于同一个 chunk的 hash 值一样

 问题：js 和 css 来自同一个chunk，hash 值是一样的（因为 css-loader 会将 css 文件加载到 js 中，所以同属于一个chunk）

3.contenthash: 根据文件的内容生成 hash 值。不同文件 hash 值一定不一样(文件内容修改，文件名里的 hash 才会改变)

修改 css 文件内容，打包后的 css 文件名 hash 值就改变，而 js 文件没有改变 hash 值就不变，这样 css 和 js 缓存就会分开判断要不要重新请求资源 --> 让代码上线运行缓存更好使用

#### 5.2.1.3 多进程打包

多进程打包：某个任务消耗时间较长会卡顿，多进程可以同一时间干多件事，效率更高。

优点是提升打包速度，缺点是每个进程的开启和交流都会有开销（babel-loader消耗时间最久，所以使用thread-loader针对其进行优化）

```
{
  test: /\.js$/,
  exclude: /node_modules/,
  use: [
    /* 
      thread-loader会对其后面的loader（这里是babel-loader）开启多进程打包。 
      进程启动大概为600ms，进程通信也有开销。(启动的开销比较昂贵，不要滥用)
      只有工作消耗时间比较长，才需要多进程打包
    */
    {
      loader: 'thread-loader',
      options: {
        workers: 2 // 进程2个
      }
    },
    {
      loader: 'babel-loader',
      options: {
        presets: [
          [
            '@babel/preset-env',
            {
              useBuiltIns: 'usage',
              corejs: { version: 3 },
              targets: {
                chrome: '60',
                firefox: '50'
              }
            }
          ]
        ],
        // 开启babel缓存
        // 第二次构建时，会读取之前的缓存
        cacheDirectory: true
      }
    }
  ]
},
```

#### 5.2.1.4 externals

externals：让某些库不打包，通过 cdn 引入

webpack.config.js 中配置：

```
externals: {
  // 拒绝jQuery被打包进来(通过cdn引入，速度会快一些)
  // 忽略的库名 -- npm包名
  jquery: 'jQuery'
}
```

需要在 index.html 中通过 cdn 引入：

```
<script src="https://cdn.bootcss.com/jquery/1.12.4/jquery.min.js"></script>
```

#### 5.2.1.5 dll

dll：让某些库单独打包，后直接引入到 build 中。可以在 code split 分割出 node_modules 后再用 dll 更细的分割，优化代码运行的性能。

webpack.dll.js 配置：(将 jquery 单独打包)

```
/*
  node_modules的库会打包到一起，但是很多库的时候打包输出的js文件就太大了
  使用dll技术，对某些库（第三方库：jquery、react、vue...）进行单独打包
  当运行webpack时，默认查找webpack.config.js配置文件
  需求：需要运行webpack.dll.js文件
    --> webpack --config webpack.dll.js（运行这个指令表示以这个配置文件打包）
*/
const { resolve } = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    // 最终打包生成的[name] --> jquery
    // ['jquery] --> 要打包的库是jquery
    jquery: ['jquery']
  },
  output: {
    // 输出出口指定
    filename: '[name].js', // name就是jquery
    path: resolve(__dirname, 'dll'), // 打包到dll目录下
    library: '[name]_[hash]', // 打包的库里面向外暴露出去的内容叫什么名字
  },
  plugins: [
    // 打包生成一个manifest.json --> 提供jquery的映射关系（告诉webpack：jquery之后不需要再打包和暴露内容的名称）
    new webpack.DllPlugin({
      name: '[name]_[hash]', // 映射库的暴露的内容名称
      path: resolve(__dirname, 'dll/manifest.json') // 输出文件路径
    })
  ],
  mode: 'production'
};
```

webpack.config.js 配置：(告诉 webpack 不需要再打包 jquery，并将之前打包好的 jquery 跟其他打包好的资源一同输出到 build 目录下)

```
// 引入插件
const webpack = require('webpack');
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');

// plugins中配置：
plugins: [
  new HtmlWebpackPlugin({
    template: './src/index.html'
  }),
  // 告诉webpack哪些库不参与打包，同时使用时的名称也得变
  new webpack.DllReferencePlugin({
    manifest: resolve(__dirname, 'dll/manifest.json')
  }),
  // 将某个文件打包输出到build目录下，并在html中自动引入该资源
  new AddAssetHtmlWebpackPlugin({
    filepath: resolve(__dirname, 'dll/jquery.js')
  })
],
```

### 5.2.2 优化代码运行的性能

#### 5.2.2.1 缓存

#### 5.2.2.2 tree shaking（树摇）

tree shaking：去除无用代码

前提：1. 必须使用 ES6 模块化 2. 开启 production 环境 （这样就自动会把无用代码去掉）

作用：减少代码体积

在 package.json 中配置：

`"sideEffects": false` 表示所有代码都没有副作用（都可以进行 tree shaking）

这样会导致的问题：可能会把 css / @babel/polyfill 文件干掉（副作用）

所以可以配置：`"sideEffects": ["*.css", "*.less"]` 不会对css/less文件tree shaking处理

#### 5.2.2.3 code split（代码分割）

代码分割。将打包输出的一个大的 bundle.js 文件拆分成多个小文件，这样可以并行加载多个文件，比加载一个文件更快。

1.多入口拆分

```
entry: {
    // 多入口：有一个入口，最终输出就有一个bundle
    index: './src/js/index.js',
    test: './src/js/test.js'
  },
  output: {
    // [name]：取文件名
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'build')
  },
```

2.optimization：

```
optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
```

- 将 node_modules 中的代码单独打包（大小超过30kb）
- 自动分析多入口chunk中，有没有公共的文件。如果有会打包成单独一个chunk(比如两个模块中都引入了jquery会被打包成单独的文件)（大小超过30kb）

3.import 动态导入语法：

```
/*
  通过js代码，让某个文件被单独打包成一个chunk
  import动态导入语法：能将某个文件单独打包(test文件不会和index打包在同一个文件而是单独打包)
  webpackChunkName:指定test单独打包后文件的名字
*/
import(/* webpackChunkName: 'test' */'./test')
  .then(({ mul, count }) => {
    // 文件加载成功~
    // eslint-disable-next-line
    console.log(mul(2, 5));
  })
  .catch(() => {
    // eslint-disable-next-line
    console.log('文件加载失败~');
  });
```

#### 5.2.2.4 lazy loading（懒加载/预加载）

1.懒加载：当文件需要使用时才加载（需要代码分割）。但是如果资源较大，加载时间就会较长，有延迟。

2.正常加载：可以认为是并行加载（同一时间加载多个文件）没有先后顺序，先加载了不需要的资源就会浪费时间。

3.预加载 prefetch（兼容性很差）：会在使用之前，提前加载。等其他资源加载完毕，浏览器空闲了，再偷偷加载这个资源。这样在使用时已经加载好了，速度很快。所以在懒加载的基础上加上预加载会更好。

代码：

```
document.getElementById('btn').onclick = function() {
  // 将import的内容放在异步回调函数中使用，点击按钮，test.js才会被加载(不会重复加载)
  // webpackPrefetch: true表示开启预加载
  import(/* webpackChunkName: 'test', webpackPrefetch: true */'./test').then(({ mul }) => {
    console.log(mul(4, 5));
  });
  import('./test').then(({ mul }) => {
    console.log(mul(2, 5))
  })
};
```

#### 5.2.2.5 pwa（离线可访问技术）

pwa：离线可访问技术（渐进式网络开发应用程序），使用 serviceworker 和 workbox 技术。优点是离线也能访问，缺点是兼容性差。

webpack.config.js 中配置：

```
const WorkboxWebpackPlugin = require('workbox-webpack-plugin'); // 引入插件

// plugins中加入：
new WorkboxWebpackPlugin.GenerateSW({
  /*
    1. 帮助serviceworker快速启动
    2. 删除旧的 serviceworker

    生成一个 serviceworker 配置文件
  */
  clientsClaim: true,
  skipWaiting: true
})
```

index.js 中还需要写一段代码来激活它的使用：

```
/*
  1. eslint不认识 window、navigator全局变量
    解决：需要修改package.json中eslintConfig配置
    "env": {
      "browser": true // 支持浏览器端全局变量
    }
  2. sw代码必须运行在服务器上
    --> nodejs
    或-->
      npm i serve -g
      serve -s build 启动服务器，将打包输出的build目录下所有资源作为静态资源暴露出去
*/
if ('serviceWorker' in navigator) { // 处理兼容性问题
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js') // 注册serviceWorker
      .then(() => {
        console.log('sw注册成功了~');
      })
      .catch(() => {
        console.log('sw注册失败了~');
      });
  });
}
```

## 六、Webpack 配置详情

### 6.1 entry

entry: 入口起点

1. string --> './src/index.js'，单入口

   打包形成一个 chunk。 输出一个 bundle 文件。此时 chunk 的名称默认是 main

2. array --> ['./src/index.js', './src/add.js']，多入口

   所有入口文件最终只会形成一个 chunk，输出出去只有一个 bundle 文件。

   （一般只用在 HMR 功能中让 html 热更新生效）

3. object，多入口

   有几个入口文件就形成几个 chunk，输出几个 bundle 文件，此时 chunk 的名称是 key 值

--> 特殊用法：

```
entry: {
  // 最终只会形成一个chunk, 输出出去只有一个bundle文件。
  index: ['./src/index.js', './src/count.js'], 
  // 形成一个chunk，输出一个bundle文件。
  add: './src/add.js'
}
```

### 6.2 output

```
output: {
  // 文件名称（指定名称+目录）
  filename: 'js/[name].js',
  // 输出文件目录（将来所有资源输出的公共目录）
  path: resolve(__dirname, 'build'),
  // 所有资源引入公共路径前缀 --> 'imgs/a.jpg' --> '/imgs/a.jpg'
  publicPath: '/',
  chunkFilename: 'js/[name]_chunk.js', // 指定非入口chunk的名称
  library: '[name]', // 打包整个库后向外暴露的变量名
  libraryTarget: 'window' // 变量名添加到哪个上 browser：window
  // libraryTarget: 'global' // node：global
  // libraryTarget: 'commonjs' // conmmonjs模块 exports
},
```

### 6.3 module

```
module: {
  rules: [
    // loader的配置
    {
      test: /\.css$/,
      // 多个loader用use
      use: ['style-loader', 'css-loader']
    },
    {
      test: /\.js$/,
      // 排除node_modules下的js文件
      exclude: /node_modules/,
      // 只检查src下的js文件
      include: resolve(__dirname, 'src'),
      enforce: 'pre', // 优先执行
      // enforce: 'post', // 延后执行
      // 单个loader用loader
      loader: 'eslint-loader',
      options: {} // 指定配置选项
    },
    {
      // 以下配置只会生效一个
      oneOf: []
    }
  ]
},
```

### 6.4 resolve

```
// 解析模块的规则
resolve: {
  // 配置解析模块路径别名: 优点：当目录层级很复杂时，简写路径；缺点：路径不会提示
  alias: {
    $css: resolve(__dirname, 'src/css')
  },
  // 配置省略文件路径的后缀名（引入时就可以不写文件后缀名了）
  extensions: ['.js', '.json', '.jsx', '.css'],
  // 告诉 webpack 解析模块应该去找哪个目录
  modules: [resolve(__dirname, '../../node_modules'), 'node_modules']
}
```

这样配置后，引入文件就可以这样简写：`import '$css/index';`

### 6.5 dev server

```
devServer: {
  // 运行代码所在的目录
  contentBase: resolve(__dirname, 'build'),
  // 监视contentBase目录下的所有文件，一旦文件变化就会reload
  watchContentBase: true,
  watchOptions: {
    // 忽略文件
    ignored: /node_modules/
  },
  // 启动gzip压缩
  compress: true,
  // 端口号
  port: 5000,
  // 域名
  host: 'localhost',
  // 自动打开浏览器
  open: true,
  // 开启HMR功能
  hot: true,
  // 不要显示启动服务器日志信息
  clientLogLevel: 'none',
  // 除了一些基本信息外，其他内容都不要显示
  quiet: true,
  // 如果出错了，不要全屏提示
  overlay: false,
  // 服务器代理，--> 解决开发环境跨域问题
  proxy: {
    // 一旦devServer(5000)服务器接收到/api/xxx的请求，就会把请求转发到另外一个服务器3000
    '/api': {
      target: 'http://localhost:3000',
      // 发送请求时，请求路径重写：将/api/xxx --> /xxx （去掉/api）
      pathRewrite: {
        '^/api': ''
      }
    }
  }
}
```

其中，跨域问题：同源策略中不同的协议、端口号、域名就会产生跨域。

正常的浏览器和服务器之间有跨域，但是服务器之间没有跨域。代码通过代理服务器运行，所以浏览器和代理服务器之间没有跨域，浏览器把请求发送到代理服务器上，代理服务器替你转发到另外一个服务器上，服务器之间没有跨域，所以请求成功。代理服务器再把接收到的响应响应给浏览器。这样就解决开发环境下的跨域问题。

### 6.6 optimization

contenthash 缓存会导致一个问题：修改 a 文件导致 b 文件 contenthash 变化。
因为在 index.js 中引入 a.js，打包后 index.js 中记录了 a.js 的 hash 值，而 a.js 改变，其重新打包后的 hash 改变，导致 index.js 文件内容中记录的 a.js 的 hash 也改变，从而重新打包后 index.js 的 hash 值也会变，这样就会使缓存失效。（改变的是a.js文件但是 index.js 文件的 hash 值也改变了）
解决办法：runtimeChunk --> 将当前模块记录其他模块的 hash 单独打包为一个文件 runtime，这样 a.js 的 hash 改变只会影响 runtime 文件，不会影响到 index.js 文件

```
output: {
  filename: 'js/[name].[contenthash:10].js',
  path: resolve(__dirname, 'build'),
  chunkFilename: 'js/[name].[contenthash:10]_chunk.js' // 指定非入口文件的其他chunk的名字加_chunk
},
optimization: {
  splitChunks: {
    chunks: 'all',
    /* 以下都是splitChunks默认配置，可以不写
    miniSize: 30 * 1024, // 分割的chunk最小为30kb（大于30kb的才分割）
    maxSize: 0, // 最大没有限制
    minChunks: 1, // 要提取的chunk最少被引用1次
    maxAsyncRequests: 5, // 按需加载时并行加载的文件的最大数量为5
    maxInitialRequests: 3, // 入口js文件最大并行请求数量
    automaticNameDelimiter: '~', // 名称连接符
    name: true, // 可以使用命名规则
    cacheGroups: { // 分割chunk的组
      vendors: {
        // node_modules中的文件会被打包到vendors组的chunk中，--> vendors~xxx.js
        // 满足上面的公共规则，大小超过30kb、至少被引用一次
        test: /[\\/]node_modules[\\/]/,
        // 优先级
        priority: -10
      },
      default: {
        // 要提取的chunk最少被引用2次
        minChunks: 2,
        prority: -20,
        // 如果当前要打包的模块和之前已经被提取的模块是同一个，就会复用，而不是重新打包
        reuseExistingChunk: true
      }
    } */
  },
  // 将index.js记录的a.js的hash值单独打包到runtime文件中
  runtimeChunk: {
    name: entrypoint => `runtime-${entrypoint.name}`
  },
  minimizer: [
    // 配置生产环境的压缩方案：js/css
    new TerserWebpackPlugin({
      // 开启缓存
      cache: true,
      // 开启多进程打包
      parallel: true,
      // 启用sourceMap(否则会被压缩掉)
      sourceMap: true
    })
  ]
}
```

## 七、Webpack5 介绍和使用

此版本重点关注以下内容:

- 通过持久缓存提高构建性能.
- 使用更好的算法和默认值来改善长期缓存.
- 通过更好的树摇和代码生成来改善捆绑包大小.
- 清除处于怪异状态的内部结构，同时在 v4 中实现功能而不引入任何重大更改.
- 通过引入重大更改来为将来的功能做准备，以使我们能够尽可能长时间地使用 v5.

### 下载

npm i webpack@next webpack-cli -D

### 自动删除 Node.js Polyfills

早期，webpack 的目标是允许在浏览器中运行大多数 node.js 模块，但是模块格局发生了变化，许多模块用途现在主要是为前端目的而编写的。webpack <= 4 附带了许多 node.js 核心模块的 polyfill，一旦模块使用任何核心模块（即 crypto 模块），这些模块就会自动应用。

尽管这使使用为 node.js 编写的模块变得容易，但它会将这些巨大的 polyfill 添加到包中。在许多情况下，这些 polyfill 是不必要的。

webpack 5 会自动停止填充这些核心模块，并专注于与前端兼容的模块。

迁移：

- 尽可能尝试使用与前端兼容的模块。
- 可以为 node.js 核心模块手动添加一个 polyfill。错误消息将提示如何实现该目标。

Chunk 和模块 ID

添加了用于长期缓存的新算法。在生产模式下默认情况下启用这些功能。

```
chunkIds: "deterministic", moduleIds: "deterministic"
```

### Chunk ID

你可以不用使用 `import(/* webpackChunkName: "name" */ "module")` 在开发环境来为 chunk 命名，生产环境还是有必要的

webpack 内部有 chunk 命名规则，不再是以 id(0, 1, 2)命名了

### Tree Shaking

1. webpack 现在能够处理对嵌套模块的 tree shaking

```
// inner.js
export const a = 1;
export const b = 2;

// module.js
import * as inner from './inner';
export { inner };

// user.js
import * as module from './module';
console.log(module.inner.a);
```

在生产环境中, inner 模块暴露的 `b` 会被删除

1. webpack 现在能够多个模块之前的关系

```
import { something } from './something';

function usingSomething() {
  return something;
}

export function test() {
  return usingSomething();
}
```

当设置了`"sideEffects": false`时，一旦发现`test`方法没有使用，不但删除`test`，还会删除`"./something"`

1. webpack 现在能处理对 Commonjs 的 tree shaking

### Output

webpack 4 默认只能输出 ES5 代码

webpack 5 开始新增一个属性 output.ecmaVersion, 可以生成 ES5 和 ES6 / ES2015 代码.

如：`output.ecmaVersion: 2015`

SplitChunk

```
// webpack4
minSize: 30000;
// webpack5
minSize: {
  javascript: 30000,
  style: 50000,
}
```

### Caching

```
// 配置缓存
cache: {
  // 磁盘存储
  type: "filesystem",
  buildDependencies: {
    // 当配置修改时，缓存失效
    config: [__filename]
  }
}
```

缓存将存储到 `node_modules/.cache/webpack`

### 监视输出文件

之前 webpack 总是在第一次构建时输出全部文件，但是监视重新构建时会只更新修改的文件。

此次更新在第一次构建时会找到输出文件看是否有变化，从而决定要不要输出全部文件。

### 默认值

- `entry: "./src/index.js`
- `output.path: path.resolve(__dirname, "dist")`
- `output.filename: "[name].js"`

## 更多内容

[github](https://github.com/webpack/changelog-v5)

### 参考

[尚硅谷2020最新版Webpack5实战教程(从入门到精通)](https://www.bilibili.com/video/BV1e7411j7T5?p=1)

### 1.vue-cli性能分析

```bash
npm run preview -- --report
```

这个命令会从我们的入口 main.js文件进行依赖分析，分析出最大的包，生成报告页面，方便我们进行观察和优化。



### 2.webpack排除打包

把体积较大的功能性插件或文件，放到CDN服务器上再引入，可以减轻整体包的大小，并且cdn的加速服务可以加快我们对于插件的访问速度。

##### 使用方法：

在 vue.config.js 文件中，configureWebpack属性内，添加 externals属性，让webpack不打包它

```js
externals:
	{ //key是要排除的包名,value是指实际引入的包的全局变量名
	'vue':'Vue',
	'element-ui':'ELEMENT',
	'xlsx':'XLSX'
	}
```



### 3.CDN文件配置及注入

采用cdn的方式，在页面模板中预先引入

vue.config.js

```js
const cdn ={
	css:[
	//element-ui css
	'https://unpkg.com/element-ui/lib/theme-chalk/index.css'
	],
	js:[
	//vue must at first
	'https://unpkg.com/vue/dist/vue.js',
	'https://unpkg.com/element-ui/lib/index.js'
	'https://cdn.jsdelivr.net/npm/xlsx@0.16.6/dist/jszip.min.js'
	'https://cdn.jsdelivr.net/npm/xlsx@0.16.6/dist/xlsx.full.min.js'
	]
}
```

开发环境时没必要使用cdn，所以使用环境变量进行区分使用

```js
let cdn = {css:[],js:[]}
const isProd = process.env.NODE_ENV === 'production'
let externals = {}
if (isProd){
    cdn ={
		css:[
		//element-ui css
		'https://unpkg.com/element-ui/lib/theme-chalk/index.css'
		],
		js:[
		//vue must at first
		'https://unpkg.com/vue/dist/vue.js',
		'https://unpkg.com/element-ui/lib/index.js'
		'https://cdn.jsdelivr.net/npm/xlsx@0.16.6/dist/jszip.min.js'
		'https://cdn.jsdelivr.net/npm/xlsx@0.16.6/dist/xlsx.full.min.js'
		]
	}
	externals={
		'vue':'Vue',
		'element-ui':'ELEMENT',
		'xlsx':'XLSX'
	}
}
```

最后通过html-webpack-plugin注入cdn文件到index.html模板之中

### 一个基本的webpack.config.js文件配置

```
const webpack=require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
var path = require('path') //不希望涉及到的路径和执行webpack命令时的具体路径相关，而是希望相对于配置文件的路径的话，就需要使用path模块
module.exports = {
  entry: {
    app: './src/main.js'//指定入口文件，从这个文件找到你的项目所有依赖的模块
  },
  output: {
    path: path.resolve(__dirname, './dist'), //打包到dist目录下
    filename: '[name].js', //name变量与entry中的key值对应
  },
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, './dist'), //本地服务器所加载的页面所在的目录
    host: 'localhost', //可以通过127.0.0.1或则localhost去访问
    historyApiFallback: true, //不跳转
    inline: true, //实时刷新
    open: true, //项目启动时,会默认帮你打开浏览器
    hot: true //在单页面应用开发中,我们修改了代码后是整个页面都刷新,开启hot后,将只刷新对应的组件
  },
  module: {
    rules: [ //针对不同类型的文件,我们定义不同的识别规则,最终目的都是打包成js文件
      {
        test: /\.vue$/,
        exclude: /node_modules/,
        use: [
          "vue-loader" //处理.vue文件
        ]
      },
      {
        test: /\.css$/, //处理css
        exclude: /node_modules/,
        use: [
          "style-loader",
          "css-loader"
        ],
        options: {
          modules:{ //指定启用css modules
            localIdentName: '[name]__[local]--[hash:base64:5]' //指定css的类名格式
          }
        }
      },
      {
        test: /\.js?$/, //处理js
        use: [
          {
            loader: 'babel-loader', //引入babel-loader兼容代码
            options: {
              presets: ['@babel/preset-env', '@babel/react'],
              plugins: [
                [require("@babel/plugin-proposal-decorators"), { "legacy": true }]
              ]
            }
          }
        ],
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/
      },
      {
        test: /\.(png|gif|jpg|jpeg|svg)$/, //处理图片
        exclude: /node_modules/,
        use: [
          "url-loader"
        ]
      }
    ]
  },
  plugins: [
    new webpack.BannerPlugin('版权所有，翻版必究'), //添加版权声明的插件
    new HtmlWebpackPlugin({ //html-webpack-plugin 可以指定template模板文件，将会在output目录下，生成html文件，并引入打包后的js.
      template: './index.html' //new一个这个插件的实例，并传入相关的参数
    }),
    new webpack.HotModuleReplacementPlugin()//热加载插件
  ]
};
```

## devtool

生成Source Maps提供了一种对应编译文件和源文件的方法，使得编译后的代码可读性更高，也更容易调试。
它的选项有以下四个,打包速度由快到慢;

1. cheap-module-eval-source-map：方法构建速度更快，但是不利于调试，推荐在大型项目考虑时间成本时使用;

2. eval-source-map：可以在不影响构建速度的前提下生成完整的sourcemap但是由于对打包后输出的JS文件的执行具有性能和安全的隐患。在开发阶段这是一个非常好的选项，在生产阶段则一定不要启用这个选项;

3. cheap-module-source-map：不带列映射提高了打包速度，但是也使得浏览器开发者工具只能对应到具体的行，不能对应到具体的列(符号),会对调试造成不便;

4. source-map：在一个单独的文件中产生一个完整且功能完全的文件。这个文件具有最好的source map，但是它会减慢打包速度;

   ## loaders

   通过使用不同的loader，webpack有能力调用外部的脚本或工具，实现对不同格式的文件的处理,需要单独安装并且需要在modules关键字下进行配置。

- test：用以匹配loaders所处理文件的拓展名的正则表达式(必须);
- loader：loader的名称(必须);
- include:添加必须处理的文件(文件夹)(可选)；
- exclude:屏蔽不需要处理的文件(文件夹)(可选);
- query：为loaders提供额外的设置选项(可选);

### 介绍几个常用的loader

Babel

可以通过编译JavaScript，让你能使用最新的ES6、ES7，而不用管其是否被当前使用的浏览器完全支持；让你能使用基于JavaScript进行了拓展的语言React的JSX。

- babel-env-preset包解析Es6;
- babel-preset-react包解析JSX;
  还可以在.babelrc文件里配置babel选项,webpack会自动调用。

CSS

- style-loader将所有的计算后的样式加入页面中;
- css-loader使你能够使用类似@import 和 url(...)的方法实现 require()的功能;
  注意：style-loader要配置在css-loader之前

这样,样式表就可以嵌入webpack打包后的JS文件中。
scss和less也有相对应的处理loaders，还有postcss-loader，stylus-loader等。
css modules技术：在options中配置modules：true直接把CSS的类名传递到组件的代码中，这样做有效避免了全局污染。

## plugins

插件（Plugins）是用来拓展Webpack功能的,直接对整个构建过程其作用。

### 常用的插件

- webpack.BannerPlugin添加给打包后代码添加版权声明的插件。

- HtmlWebpackPlugin依据一个简单的index.html模板，生成一个自动引用你打包后的JS文件的新index.html。这在每次生成的js文件名称不同时非常有用（比如添加了hash值）。

- Hot Module Replacement（HMR）修改组件代码后，自动刷新实时预览修改后的效果。热加载需要两项配置：devServer中添加hot参数和添加HMR插件。

- 而当你写的是react的时候，可以使用react-transform-hrm的插件，可以在不对React模块进行额外的配置的前提下让HMR正常工作。

  #### 生产环境

  在复杂的项目中，生产环境可能还需要对打包的文件进行额外的处理，比如说优化，压缩，缓存以及分离CSS和JS

  这时需要创建一个webpack.prod.config.js，其中的配置大部分保持不变

  devtool要修改为 'null', 这能大大压缩我们的打包代码。

### 优化插件

- OccurenceOrderPlugin :为组件分配ID，通过这个插件webpack可以分析和优先考虑使用最多的模块，并为它们分配最小的ID(内置插件)
- UglifyJsPlugin：压缩JS代码(内置插件)
- ExtractTextPlugin：分离CSS和JS文件

然后在plugins中引用：

```
new webpack.optimize.OccurrenceOrderPlugin(),
new webpack.optimize.UglifyJsPlugin(),
new ExtractTextPlugin("style.css")
```

### 缓存

使用缓存的最好方法是保证你的文件名和文件内容是匹配的（内容改变，名称相应改变）。webpack可以把一个哈希值添加到打包>的文件名中，添加特殊的字符串混合体（[name], [id] and [hash]）到输出文件名前。如filename: "[name].[hash].js"



# [Webpack vs Gulp ](https://www.cnblogs.com/iovec/p/7921177.html)

**阅读目录**

- 理想的前端开发流程
- Gulp 为何物
- webpack 又是从哪冒出来的
- 结论

文章有点长，总共 1800 字，阅读需要 18 分钟。

## 理想的前端开发流程

在说构建工具之前得先说说咱期望的前端开发流程是怎样的？

- 写业务逻辑代码（例如 es6，scss，pug 等）
- 处理成浏览器认识的（js，css，html）
- 浏览器自动刷新看到效果

前端开发就是在不断的 123..123..123.... 循环中进行的，上面的后两步（也就是 2 和 3）应该是 **自动化** 的，前端开发者理应只需关注第 1 步——写业务逻辑代码。

自动化的事情应该交由构建工具来做，时下流行的前端构建工具有 gulp 和 webpack（有人说 webpack 不算是构建工具，我觉得这没什么好争的。横看成岭侧成峰，我觉得从当前 webpack 所能做的事情来看，说它是构建工具丝毫不为过）。本文不会对 [gulp](http://www.gulpjs.com.cn/) 和 [webpack](http://webpack.github.io/) 的概念和内容做深入解析，而是希望从宏观的角度研究他们的优势短缺和适用场景，从而说清长期弥漫在前端圈二者之间扑朔迷离的关系。

**什么是构建工具**
构建工具是一段自动根据源代码生成可使用文件的程序，构建过程包括打包、编译、压缩、测试等一切需要对源代码进行的相关处理。构建工具的目的是实现构建过程的自动化，使用它可以让咱们避免机械重复的劳动（这怕是程序员最不能忍受的了），从而解放我们的双手。

**解放了双手干什么**
哇槽，爱干什么干什么。

## Gulp 为何物

先来听听 Ta 的官网是怎么说：

Gulp 致力于 **自动化和优化** 你的工作流，它是一个自动化你开发工作中 **痛苦又耗时任务** 的工具包。

想一想咱们日常的开发工作中痛苦又耗时任务有哪些呢？

- 用 es6，typescript 编写的脚本文件需要编译成浏览器认识的 javascript
- 用 scss，less 编写的样式文件需要编译成浏览器认识的 css
- 检查代码是否符合书写规范，跑单元测试和集成测试
- 开发环境如果有 sourcemaps 的话调试起来就方便多了，修改完代码浏览器能自动刷新立即看到效果就更好了
- 生产环境部署代码需要压缩合并静态文件，添加文件指纹控制缓存
- blabla...更多的你自己想吧

**Gulp** 声称要帮咱们实现 **自动化**，那他是怎样帮助咱们实现自动化的呢？这就不得不先提一嘴牛逼哄哄的 **NodeJS**。

Node 背景小知识

Node 使前端 Jser 有了脱离浏览器工作的能力，要搁以前的话咱们写的 js 要么嵌到 html 页面里，然后用浏览器打开 html 页面才能运行js，要么就是在浏览器开发者工具的 Console 面板里编写运行代码片段。总之没了浏览器这个宿主，咱们的 js 就 run 不起来。Node 这货突发奇想，把开发者工具的 Console 给抠下来了，从此 js 可以脱离浏览器直接在 node 里运行。**相当于 js 现在有了两个宿主环境，一个是浏览器，一个是 node**。当然了，Node 可不是开发者工具里的 Console，那只是打个比方。它是基于Chrome V8 引擎实现的一个 JavaScript 运行环境，功能其实类似 Console 面板，但提供了大量实用的 API，感兴趣的同学可前往 [Node官网](https://nodejs.org/en/) 详细了解，英文吃力的骚年 [戳这里](http://nodejs.cn/)。Node 可以算是前端革命式的创新，随 node 一起发布的 node 包管理器 npm(node package manager) 也已经是全球最大的开源库生态系统。node/npm 这对组合一出，前端生态迎来了大爆发，一时间为解决各种问题的 node 包层出不穷，遍地开花。gulp 就是披荆斩棘，一路过五关斩六将闯出来的一个小 node 包。

扯谈完毕，接下来就来看看 **gulp** 是不是在装逼，他到底能不能帮我们实现自动化。

作为一个 node 包，标准打开方式当然是：

```bash
npm i -g gulp
```

然后呢，这里以编译 less 为例，首先安装编译 less 需要用到的 node 包：

```bash
npm i --save-dev gulp gulp-less
```

**前面已经全局安装过 gulp 了，怎么又本地安装了一遍**
前面的 `-g` 是全局安装，是为了执行你所编写的 gulp 任务，即 gulp yourTask。而后面的 --save-dev 是本地安装，是为了咱们编写任务时使用 gulp 提供的 api，例如 `gulp.src()`、`gulp.task()`、`gulp.dest()` 等等。当然也是可以直接使用全局安装的 gulp 的 api 的，但是强烈不推荐，因为这样涉及到 gulp 版本控制的问题，而且使用全局 gulp 的 api 的话就会产生环境依赖（你假设环境已经全局安装了gulp，万一没装呢，程序不就出错了）。

接着在项目的根目录下新建一个 **gulpfile.js** 文件，这是 gulp 的默认配置文件。

**gulpfile.js 必须放在项目根目录？**
当然也可放在其他目录，但这样的话就得在启动 gulp 任务时手动指定 gulp 配置文件 gulp yourTask --gulpfile yourGulpfilePath，可能还需要全局安装 gulp-cli，所以除非有特殊需要，否则就放在项目根目录就行了，这样最简单。

**配置文件的名字必须是 gulpfile.js 吗？**
不区分大小写，取成 gULPFile.js 的话 gulp 也能认识，只要 toLowerCase 之后是 gulpfile 就行了，如果取其它名字那你就又得使用 --gulpfile 选项去指定了。

现在工程目录结构已经成了下面的样子：

![img](https://images2018.cnblogs.com/blog/882926/201711/882926-20171129154902769-897844315.png)

构建前 gulp 工程目录结构

接下来就是在 gulpfile.js 里编写 **gulp task**（gulp 把为每个痛苦又耗时任务编写的处理方法称为一个 **task**）：

```js
const gulp = require('gulp');
const less = require('gulp-less');

gulp.task('build:less', function(){
    return gulp.src('./src/*.less')
        .pipe(less())
        .pipe(gulp.dest('./dist'));
});
```

最后就是打开一个终端，在终端里运行 gulp build:less。好了，编译后的文件已经被输出到了 **dist** 目录：

![img](https://images2018.cnblogs.com/blog/882926/201711/882926-20171129155301362-376259255.png)

构建后 gulp 工程目录结构

至此你已经算是一个 gulp 砖家了，这基本上就是 gulp 的全部内容。怎么样，是不是够简单，够丝滑。这也是 gulp 的突出特点——易于学习，易于使用，五分钟成砖家。如果想要执行解决其他痛苦又耗时的任务，只需下载安装对应的 gulp 插件包，然后依次类推写一个 `gulp.task` 出来就行了。

**这些源代码具体是怎样被处理的**
这通常不需要关心，因为 gulp 插件包已为你做好了，并且封装的非常漂亮，你只需要告诉 gulp 你要什么，gulp 及其插件会帮你打点好一切。这就好比你把一份电子文档传进打印机，告诉它我要一份 A4 纸打印，呲呲呲~，打印机就吐出来一张 A4 纸，上面是你的文档内容。源代码就是你的电子文档，gulp 插件就是打印机，生成的可用文件就是你手里的那张 A4 纸，你不用关心打印机内部是怎样工作的，因为它封装的很好，或者你可以把打印机拆了一探究竟也行。

**Gulp 是基于流的？**
流（Stream）不是 gulp 创造的概念，而是从 unix 时代就开始使用的 I/O 机制，一直到现在仍在广泛使用。Node 封装了一个 [stream](http://nodejs.cn/api/stream.html) 模块专门用来对流进行操作。gulp 所基于的流即是 Node 封装起来的 stream。上面 `gulp.task()` 代码里面的 [pipe](http://nodejs.cn/api/stream.html#stream_readable_pipe_destination_options) 方法并不是 gulp 提供的 api，而是 node 的 api，准确的说应该是 node 的 stream 模块提供的 api。具体是怎么实现的呢：`gulp.src()` 的返回值是 node Stream 的一个实例，之后的 `pipe` 调用的其实是这个实例的 `pipe` 方法，而 `pipe` 方法的返回值依然是 node Stream 实例，以此实现前面的 `.pipe().pipe().pipe()` 这种串联写法。熟悉 jQuery 的同学应该很清楚这种技巧。

## webpack 又是从哪冒出来的

gulp 似乎是完美的，对前端开发工作中每一项痛苦又耗时任务都能见招拆招，各个击破。然而前端发展速度之快超乎想象，对页面性能和用户体验更是追求极致，以至于 gulp 某些领域尤其大型 **SPA**（单页应用）显得有些不够用了：

- 单页应用的核心是模块化，ES6 之前 JavaScript 语言本身一直是没有模块系统的，导致 AMD，CMD，UMD 各种轮子模块化方案都蹦出来。对这种模块化乱象，gulp 显得无能为力，gulp 插件对这一块也没有什么想法。不过也可以理解，模块化解决方案可不是谁都能 hold 住的，需要考虑的问题太多了；
- 对前沿的 SPA 技术 gulp 处理起来显得有些力不从心，例如 Vue 的单文件组件，gulp 配合一些插件可以勉强处理，但是很蹩脚。其实归根结底，还是模块化处理方面的不足；
- 优化页面加载速度的一条重要法则就是减少 http 请求。gulp 只是对静态资源做流式处理，处理之后并未做有效的优化整合，也就是说 gulp 忽略了系统层面的处理，这一块还有很大的优化空间，尤其是移动端，那才真的是一寸光阴一寸金啊，哪怕是几百毫秒的优化所带来的收益（用户？流量？付费？）绝对超乎你的想象。别跟我说 gulp-concat，CSS Sprites，这俩玩意儿小打小闹还行，遇上大型应用根本拿不上台面。现在的页面动辄上百个零碎资源（图片，样式表，脚本），也就是上百个 http 请求，因此这个优化需求还是相当迫切的。关于为何减少 http 请求可以有效降低页面加载时间[戳这里](http://www.cnblogs.com/iovec/p/7904416.html)。
- blabla... 你自己想吧，主要就是大型单页应用方面有短板；

时势造英雄。webpack 一声吼，大张旗鼓地挖起了gulp 的墙角。

老规矩，先看看webpack官网怎么~~吹牛逼~~介绍自己的：

**Webpack** 是当下最热门的前端资源模块化 **管理和打包** 工具。它可以将许多松散的模块按照依赖和规则打包成符合生产环境部署的前端资源。还可以将按需加载的模块进行代码分割，等到实际需要的时候再异步加载。

是不是看完一脸懵逼，不明觉厉。其实翻译过来就是 “在我眼里，什么都是模块”。webpack “万物皆模块” 的理念和 SPA 配合起来简直是金童玉女，天作之合。这也是 webpack 短时间内名声大噪，直接撼动 gulp 地位的主要原因。

webpack 的理念比较前卫，它本身也带来了很多新的概念和内容，诸如加载器（loader）、依赖图（Dependency Graph）等等。和 gulp 两小时成砖家的学习难度相比，webpack 或许你研究两天仍然会晕头转向。

接下来简单看一下 webpack 的主要工作方式。

webpack 和 gulp 一样也是一个小 node 包，打开方式自然是：

```bash
npm i -g webpack
npm i --save-dev webpack
 
```

和 gulp 一样，全局安装是为了执行 webpack 任务，本地安装是为了使用 webpack 提供的 api。

安装完 webpack 之后在项目根目录下新建一个 **webpack.config.js**，这是 webpack 的默认配置文件，同 gulp 的 gulpfile.js 的功能类似。webpack.config.js 同样是不区分大小写的，取成 webPACk.CONfig.js 的话 webpack 也能认识，但是取成其他名字或放在别的目录就需要使用 --config 选项去指定配置文件了。

现在工程目录结构如下：

![img](https://images2017.cnblogs.com/blog/882926/201712/882926-20171206114604300-1207786283.png)

构建前webpack工程目录结构

接下来就是在 webpack.config.js 里配置需要的选项，注意了，webpack 与 gulp 的重要不同就是使用方式 **由编程式变成了配置式**：

```js
const path = require('path');

module.exports = {
    entry: './src/index.js',        // 告诉 webpack 你要编译哪个文件
    output: {                       // 告诉 webpack 你要把编译后生成的文件放在哪
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    }
};
```

最后仍然和 gulp 类似，就是在终端里运行 webpack（终端里一般会出现一大坨编译信息）。好了，现在 webpack 已经把编译好的文件输出到了 dist 目录：

![img](https://images2017.cnblogs.com/blog/882926/201712/882926-20171206115136253-991690971.png)

构建后webpack工程目录结构

看到这是不是已经一头雾水了，在你还没明白发生了什么的时候 webpack 已经把事情干完了。这也是 webpack 和 gulp 作业方式的重要不同：**Gulp** 是搭了个台子，让 gulp 插件在上面唱戏，尽情表演，所有构建相关的具体事情都交由 gulp 插件去做。而 **Webpack** 就牛逼了，webpack 先搭了个台子，然后自己在上面唱嗨了，仔细一听，他在上面唱的是《我们不一样》，当然了他也是让 webpack 插件在上面唱戏的。

也就是说 webpack 把很多功能都封装进了自己身体里面，使得自己强大同时臃肿。现在你可以在 `./src/index.js` 文件里直接写 ES6 代码，因为 webpack 把编译 ES6 的工作已经封装到自己的实现里了，使得 webpack 看起来原生支持 ES6 而不需要借助第三方插件，其实他内部也是用了第三方插件的，所以你不用再专门去下一个 babel 之类的插件去转译 ES6。这样封装的好处是使用起来很方便，不好的地方就是使用者完全不知道发生了什么，构建完了还一脸懵逼。

上面仅是 webpack 使用的最最最简单示例，简直连 “hello world” 都算不上。具体怎样打包各种资源（typescript，样式表，图片，字体等等）可前往 [webpack官网](http://webpack.github.io/) 深入学习，想看中文的同学使劲 [戳这里](http://www.css88.com/doc/webpack/)。

webpack “一切皆模块” 的特点完美解决了上面 gulp 暴露的几个短板，连 webpack 官网也说自己是因为看到现存的模块打包器都不太适合大型 SPA 应用，于是决定打造一个适合大型 SPA 应用的模块打包器，也就是说 [webpack 其实就是为大型 SPA 而生的](http://webpack.github.io/docs/what-is-webpack.html)。

**webpack 怎么实现像 gulp 一样对大量源文件进行流式处理**
人家 webpack 本来就没打算做这事。webpack 不是以取代 gulp 为目的的，而是为了给大型 SPA 提供更好的构建方案。对大量源文件进行流式处理是 gulp 擅长的事，webpack 不想抢，也没必要抢。即使抢，也无非是再造一个蹩脚的 gulp 出来而已。

**既然 webpack 模块化这么强，那以后模块化就全用 webpack 好了**
webpack 模块化是强，但是他胖啊，不是所有人都抱得动，主要是他为了提供更多的功能封装进了太多东西，所以选择上还是需要因地制宜。如果单纯只是打包 js（多页应用往往是这种需求），完全可以使用 rollup，browserify 这种小而美的实现，因为他们只做一件事——打包js。而如果需要将图片，样式，字体等所有静态资源全部打包，webpack 毫无疑问是首选。这也是为什么越来越多的流行库和框架开始从 webpack 转向使用 rollup 进行打包，因为他们只需要打包 js，webpack 好多强大功能根本用不到。连 rollup 官网也坦言如果你在构建一个库，rollup 绝对是首选，但如果是构建一个应用，那么请选 webpack。

## 结论

我看好多人说 gulp 和 webpack 不是一类东西，我不这么觉得，虽然说两者的出发点确实是不一样的，gulp 走的是流式处理路线，webpack 走的是模块处理路线，但是两者所要达成的目标却是一样的，那就是**促进前端领域的自动化和工程化管理**。webpack 发展到现在，已经非常强大了，强大到在构建方面 gulp 能做的事 webpack 基本上都可以胜任，gulp 做不了的 webpack 也能搞。同样的那些开发工作中痛苦又耗时的任务，gulp 和 webpack 都能解决，只是解决思路有天壤之别。

下表是从各个角度对 gulp 和 webpack 做的对比：

|          | Gulp                                                         | Webpack                                                      |
| -------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 定位     | 基于流的自动化构建工具                                       | 一个万能模块打包器                                           |
| 目标     | 自动化和优化开发工作流，为通用 website 开发而生              | 通用模块打包加载器，为移动端大型 **SPA** 应用而生            |
| 学习难度 | 易于学习，易于使用，api总共只有5个方法                       | 有大量新的概念和api，不过好在有详尽的官方文档                |
| 适用场景 | 基于流的作业方式适合多页面应用开发                           | 一切皆模块的特点适合单页面应用开发                           |
| 作业方式 | 对输入（gulp.src）的 js，ts，scss，less 等源文件依次执行打包（bundle）、编译（compile）、压缩、重命名等处理后输出（gulp.dest）到指定目录中去，为了构建而打包 | 对入口文件（entry）递归解析生成依赖关系图，然后将所有依赖打包在一起，在打包之前会将所有依赖转译成可打包的 js 模块，为了打包而构建 |
| 使用方式 | 常规 js 开发，编写一系列构建任务（task）。                   | 编辑各种 JSON 配置项                                         |
| 优点     | 适合多页面开发，易于学习，易于使用，接口优雅。               | 可以打包一切资源，适配各种模块系统                           |
| 缺点     | 在单页面应用方面输出乏力，而且对流行的单页技术有些难以处理（比如 Vue 单文件组件，使用 gulp 处理就会很困难，而 webpack 一个 loader 就能轻松搞定） | 不适合多页应用开发，灵活度高但同时配置很繁琐复杂。“打包一切” 这个优点对于 HTTP/1.1 尤其重要，因为所有资源打包在一起能明显减少浏览器访问页面时的资源请求数量，从而减少应用程序必须等待的时间。但这个优点可能会随着 HTTP/2 的流行而变得不那么突出，因为 HTTP/2 的多路复用可以有效解决客户端并行请求时的瓶颈问题。 |
| 结论     | 浏览器多页应用(MPA)首选方案                                  | 浏览器单页应用(SPA)首选方案                                  |

**gulp 为何不吸取百家之长，把 webpack 的东西集成进来，反正都是开源的**
腾讯那么牛逼，你说他怎么不把阿里巴巴集成进来。集成应该是没可能，因为 gulp 和 webpack 的定位不一样。所以，没有放之天下而皆准的解决方案，只有具体问题具体分析选择适合的解决方案才能正确地解决问题。gulp 和 webpack 只是我们解决问题的工具，不要被工具束缚了手脚不能前进。

**扯了这么多，到底谁会被拍死在沙滩上**
可以看出来，这两个工具其实各有优缺，都有用武之地。合理地配合使用，取长补短，才能发挥最大的威力，所以这俩基友并不是互斥的，而是互补的，谁也不会被拍死在沙滩上。