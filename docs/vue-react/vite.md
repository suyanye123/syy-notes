## vite 的使用方式

同常见的开发工具一样，vite 提供了用 npm 或者 yarn 一建生成项目结构的方式，使用 yarn 在终端执行

### 创建项目

```js
npm install create-vite-app -g	//全局安装vite, yarn
npm init vite-app <project-name>  //创建项目
yarn create vite-app <project-name>	//创建项目，"vite": "^1.0.0-rc.13",不用这个
yarn create vite <project-name>	//创建项目，"vite": "^2.9.5"最新的
```

#### 安装路由

```js
npm install vue-router@next -S
```

安装路由，并且配置路由文件

`history: createWebHashHistory() hash` 模式

`history:createWebHistory()` 正常模式

```js
//src/router/index.js
import { createRouter,createWebHashHistory } from 'vue-router'

const router = createRouter({
    history:createWebHashHistory(),
    routes:[
        {
            path:'/Home',
            name:'name',
            component:()=>import('../pages/Home.vue')
        }
    ],
})

export default router

```

