# [umi]([https://umijs.org/zh/guide/](https://link.zhihu.com/?target=https%3A//umijs.org/zh/guide/) )

> 是一个可插拔的企业级 react 应用框架。umi 以路由为基础的，支持[类 next.js 的约定式路由](https://link.zhihu.com/?target=https%3A//umijs.org/zh/guide/router.html)，以及各种进阶的路由功能，并以此进行功能扩展，比如[支持路由级的按需加载](https://link.zhihu.com/?target=https%3A//umijs.org/zh/plugin/umi-plugin-react.html%23dynamicimport)。然后配以完善的[插件体系](https://link.zhihu.com/?target=https%3A//umijs.org/zh/plugin/)，覆盖从源码到构建产物的每个生命周期，支持各种功能扩展和业务需求，目前内外部加起来已有 50+ 的插件。

## 项目基本目录结构

```text
├── dist/                          // 默认的 build 输出目录
├── mock/                          // mock 文件所在目录，基于 express
├── config/
    ├── config.js                  // umi 配置，同 .umirc.js，二选一
└── src/                           // 源码目录，可选
    ├── layouts/index.js           // 全局布局
    ├── pages/                     // 页面目录，里面的文件即路由
        ├── .umi/                  // dev 临时目录，需添加到 .gitignore
        ├── .umi-production/       // build 临时目录，会自动删除
        ├── document.ejs           // HTML 模板
        ├── 404.js                 // 404 页面
        ├── page1.js               // 页面 1，任意命名，导出 react 组件
        ├── page1.test.js          // 用例文件，umi test 会匹配所有 .test.js 和 .e2e.js 结尾的文件
        └── page2.js               // 页面 2，任意命名
    ├── global.css                 // 约定的全局样式文件，自动引入，也可以用 global.less
    ├── global.js                  // 可以在这里加入 polyfill
    ├── app.js                     // 运行时配置文件
├── .umirc.js                      // umi 配置，同 config/config.js，二选一
├── .env                           // 环境变量
└── package.json
```

## 使用步骤如下：

> 全局安装环境

```text
npm install -g umi
```

> 构建项目 & 创建src目录

```text
mkdir  project &&  cd project  &&  mkdir src &&  cd src
```

> 创建页面／路由组件

```text
umi g page index  //自动生成pages目录，以及index.js index.css
```

> 运行项目

```text
umi dev    //打开localhost:8000   会看到index.js内的组件内容
```

> 构建生产环境

```text
umi build
```

这些就是umi基本的页面构建以及项目启动。

pages中的js组件并列，文件名字便是路由路径。

umi中可以通过导航标签来进行路由切换

```js
import Link from 'umi/link';
<Link to="/list">list</Link>
```

路由传参－3种形式（params，query，state）

```js
state <Link to={{pathname:'/list',state:{id:'hello'}}}>list</Link>
query <Link to={{pathname:'/list',query:{id:'hello'}}}>list</Link>
params <Link to={'/list/111'}>list</Link>
```

接收参数

```text
state {props.location.state.id}
query {props.location.query.id}
params 
首先讲list组件放在list目录下，list.js更名为$id.js，id为保存params传参的变量
使用  {props.match.params.id}
```

> 同时嵌套路由需要构建_layout.js。
> 需要展示子组件的容器通过 {props.children}

## HTML模版定义

－定义title，meta等设置，构建document.ejs

```html
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf8" version='1'/>
    <title>京东(JD.COM)-正品低价、品质保障、配送及时、轻松购物！</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=yes"/>
    <meta name="description"
          content="京东JD.COM-专业的综合网上购物商城,销售家电、数码通讯、电脑、家居百货、服装服饰、母婴、图书、食品等数万个品牌优质商品.便捷、诚信的服务，为您提供愉悦的网上购物体验!"/>
    <meta name="Keywords" content="网上购物,网上商城,手机,笔记本,电脑,MP3,CD,VCD,DV,相机,数码,配件,手表,存储卡,京东"/>
</head>
<body>
	<div id="root"></div>
</body>
</html>
```



## 全局公共css编写

－构建global.css 无需引入，所有pages组件通用样式。



## 插入dva和antd

项目开发中，umi如何使用antd这个ui框架。

> 安装插件umi-plugin-react

```js
yarn add umi-plugin-react  ｜｜  npm install umi-plugin-react
```

> 与src同级构建config目录 ，目录中创建config.js文件，写入以下配置

```js
export default {
  plugins: [
    [
      'umi-plugin-react',
      {
        antd:true, 
        dva: true,
      },
    ]
  ],
};
```

> 使用antd中的组件 例：

```js
import {Button} from 'antd';
<Button type="primary">按钮</Button>
```

以上就是在umi中使用antd这个ui框架。下面我们来说一下如何使用dva。

在src中构建models目录。该目录中存在数据模型，全局模型，所有pages中均可使用模型种的数据。

例如在models中构建info.js 模型。内部代码编写如下：

```js
import * as api from '../until/getpro';  //封装的axio调用接口
export default{
	//命名空间
	namespace:'info',
	state:{
		name:'许凯',
		age:24,
		des:"真帅呀！！！",
		list:[]
	},
	//处理state－－同步
	reducers:{
		change(state,{payload}){
			return {...state,...payload}
		}
	},
	// 异步
	// yield表示后面的方法执行完以后 call表示调用一个api接口
	// put表示一个派发
	effects:{
		*getData(payload,{call,put}){
			console.log(payload)
			const result=yield call(api.getProList,payload.payload)
			console.log(result)
			yield put({
				type:'change',
				payload:{
					list:result.data.data
				}
			})
		}
}
```

> 组件内使用如下：

```js
import {connect} from 'dva';
 function Index(props) {
  return (
    <div>
      <h1>Page index</h1>
	  <Button type="primary"
		onClick={()=>props.dispatch({
			type:'info/change',
			payload:{
				age:props.age-1
			}
		})}
	  >设置年龄</Button>
	  <h2>{props.name}</h2>
	  <h2>{props.age}</h2>
	  <h2>{props.des}</h2>
	  <Button type="primary"
		onClick={()=>props.dispatch({
			type:'info/getData',
			payload:{
				uid:19802,
				pagesize:50
			}
		})}
	  >获取数据</Button>
	  {
		  props.list.map((item)=>{
			  return(<div key={item.pid}>{item.pname}</div>)
		  })
	  }
    </div>
  );
}

export default connect(state=>state.info)(Index)
```

以上就是无状态组件中调用dva管理的数据，原理还是依赖于react-redux 通过connect生成容器组件，获取数据。

无状态组件中定义局部状态，可以选择16.8新增的hook来定义，useState定义局部状态，useEffect模拟生命周期。