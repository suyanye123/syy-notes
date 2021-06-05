# syy-template

各种我二次封装及自定义的项目模板~

## 1.uniapp-template

基于dcloud官方模板，二次封装的uniapp小程序模板，引入了uView UI库，封装了request、微信登录等功能

### #构建过程

#### 下载官方模板

```bash
vue create -p dcloudio/uni-preset-vue syy-uniapp-template	//用vue-cli新建项目
npm install
npm install node-sass
npm install sass-loader
```

#### 引入uView库

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

#### 封装原生request





#### 挂载到全局

uni-app 实现全局变量的几种方式有 

##### 1.公用模块

定义一个专用的模块，例如utils，方便修改维护。

但是缺点是，每次使用都需要在页面引入

##### 2.挂载到vue的原型上

将一些使用频率较高的常量或者方法，直接挂载到 Vue.prototype 上，每个 Vue 对象都会“继承”下来。

```js
//在main.js中写入函数，不支持使用 Vue.use 的方式注册全局组件（在main.js使用Vue.component的方式引入）
import fun from './fun'
Vue.prototype.$fun = fun;
```

**Tips**

- 每个页面中不要在出现重复的属性或方法名。
- 建议挂载的属性或方法，加统一前缀。比如 $，这样维护阅读代码时方便与当前页面的内容区分开。

##### 3.globalData

小程序中有个globalData概念，可以在 App 上声明全局变量。 

Vue 之前是没有这类概念的，但 uni-app 引入了globalData概念，并且多平台支持。

globalData是一种比较简单的全局变量使用方式。

```js
//在App.vue中注册 
export default {  
        globalData: {  
            text: 'text'  
        },  
        onLaunch: function() {  
            console.log('App Launch')  
        }
    }  
//其他页面使用
getApp().globalData.text = 'test'	//赋值
console.log(getApp().globalData.text) // 取值
```

**Tips**：如果需要把globalData的数据绑定到页面上，可在页面的onshow声明周期里进行变量重赋值

##### 4.Vuex

在Vuex 状态管理模式中使用，这里不过多复述

```js
//main.js 挂载 Vuex
import store from './store'  
Vue.prototype.$store = store
```

##### 5.挂载到uni对象

挂载到 uni.这个对象里面，在APP.vue onLaund()引入， 全局可用，多端可用。非官方推荐方法，可能存在与官方变量命名冲突的风险。



### #可能问题：

#### 1.使用uView-version，安装依赖失败

通常是因为 sass下载失败，多安装几次，或者有能力的话建议翻墙



#### 2.使用uView-version，第一次跑项目时出错提示

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