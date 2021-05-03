# 打包及性能优化

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

