# Postcss

在研究学习tailwind的过程中，我了解到了postcss，它可以通过各种loader，配置 weebpack配置项，然后操作js来生成css



## postcss+webpack解析

### 如何让scss变量能够当做js变量来使用

当前我们使用scss变量有两个痛点：

1. 需要手动导入
2. 无法与js建立联系或者很难，后续不能在此基础上做一些骚操作 为了解决这两个问题，我们以创建js文件以json格式定义scss变量，然后通过配置webpack的解析规则来达到即能像普通scss一样使用，又能作为js变量使用的目的。

#### 变量创建

所有scss变量在style/variables.scss.js编写，格式要求为：

1. 只允许使用小写字母
2. 单词间以下划线"_"连接
3. 命名应简洁易懂，以一个大的模块或高级别的单词开头_后面跟功能描述单词结尾

```
const variables = {
  'header_height': '60px',
  'header_background': `#ededed`
}

module.exports = variables;
```

注意：命名以下划线连接是为了在js文件中能够单个import, 使用中已经在webpack进行转换，必须按照此格式！
在scss变量中使用是正常的scss变量：$header-height
在js中使用是定义时的变量格式：import { header_height } from "@/style/variables.scss.js";

#### 变量使用

配置webpack中sass解析方式，一般来说项目构建者已经处理完毕，项目成员无需关心。
使用时无需引入，直接在样式文件中正常使用即可。

> scss中使用示例

```
.the-nav{
  height: $header-height;
}
```

> js中使用示例

```
import { header_height } from "@/style/variables.scss.js";

...
data(){
  return {
    header_height: header_height
  }
}
...
```

#### 配置讲解

> vue.config.js 中 cuecli3+

```
let scssVariables = require('./src/style/variables.scss.js');

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: Object.keys(scssVariables)
          .map(k => `\$${k.replace('_', '-')}: ${scssVariables[k]};`)
          .join('\n')
      }
    }
  }
};
```

注意：此处有个坑，新版本的sass-loader更换了api参数prependData但是似乎没有文档说明

> 老版本的sass-loader vue.config.js 中 cuecli3+

```
let scssVariables = require('./src/style/variables.scss.js');

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        data: Object.keys(scssVariables)
          .map(k => `\$${k.replace('_', '-')}: ${scssVariables[k]};`)
          .join('\n')
      }
    }
  }
};
```

#### 老版本data => 新版本 prependData

> webpack.config.js中 vuecli2

```
let scssVariables = require('./src/style/variables.scss.js');

...
{
  test: /\.scss$/,
  use: [
    'css-loader',
    'postcss-loader',
    {
      loader: 'sass-loader',
      options: {
        data: Object.keys(scssVariables)
          .map(k => `\$${k.replace('_', '-')}: ${scssVariables[k]};`)
          .join('\n')
      }
    }
  ]
}
...
```

经过一番姿势，到这里已经可以成功解锁新世界啦~~~~

