# syy-uniapp-template

基于dcloud官方模板，二次封装的uniapp小程序模板，引入了uView UI库，封装了request、微信登录等功能

### #构建过程

#### 1.下载官方模板

```bash
vue create -p dcloudio/uni-preset-vue syy-uniapp-template	//用vue-cli新建项目
npm install
npm install node-sass
npm install sass-loader
```

#### 2.引入uView库

```bash
npm install uView-ui
```

```js
// main.js
import uView from "uview-ui";
Vue.use(uView);

/* uni.scss */
@import 'uview-ui/theme.scss';

// App.vue
@import "uview-ui/index.scss";

// pages.json
{
	"easycom": {
		"^u-(.*)": "uview-ui/components/u-$1/u-$1.vue"
	}
}
```

#### 3.封装原生request





#### 4.挂载到全局

Vue自定义函数挂到全局的方法有

1.挂载到vue的原型上

```
//在mian.js中写入函数
import fun from './fun'
Vue.use(fun);
```

2.全局变量模块文件

需要的地方引用进全局变量模块文件，然后通过文件里面的变量名字获取全局变量参数值。



### #可能问题：

1.使用uView-version，安装依赖失败

通常是因为 sass下载失败，多安装几次，或者有能力的话建议翻墙



2.使用uView-version，第一次跑项目时出错提示

```bash
TypeError: this.getOptions is not a function
```

是因为 sass 和 sass-loader 对应本地的 node版本匹配的原因

查看自己的node版本  `node -v`

<img src="..\.vuepress\alias\sass-v.png" alt="image-20210531154308278"  />

如图所示，比如我的node版本为14，那么就应该安装 sass 4.14版本

对应的loader版本为7.3.1

```markdown
sass-loader 4.1.1，node-sass 4.3.0
sass-loader 7.0.3，node-sass 4.7.2
sass-loader 7.3.1，node-sass 4.7.2
sass-loader 7.3.1，node-sass 4.14.1
```

所以

```
npm uninstall node-sass sass-loader		//卸载sass及loader
npm install sass-loader@版本号 node-sass@版本号    //安装对应的版本
```

或者升级或降级本地node版本