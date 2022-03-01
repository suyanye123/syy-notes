# 详谈后台管理系统的权限控制

### 序

自己在做后台系统的时候涉及到权限管理这一块,于是乎总结了关于这方面的处理方法。权限管理一般是后端配合前端完成的,前端所做的就是控制视图层的展示和控制前端请求,简单理解就是降低非法操作和提高用户体验以及减轻服务器压力

思路如下：
1.导航栏的控制

在登录请求中， 会得到权限数据， 当然， 这个需要后端返回数据的支持． 前端根据权限数据， 展示对应的菜单． 点击菜单， 才能查看相关的界面

2.UI界面的控制

如果用户没有登录， 手动在地址栏敲入管理界面的地址， 则需要跳转到登录界面 如果用户已经登录， 如果手动敲入非权限内的地址， 则需要跳转404 界面或者危险操作提示 如果用户已经登录， 如果手动敲入登录的地址， 则需要提示并不做路由反应

3.按钮的控制

在某个菜单的界面中， 根据权限数据， 展示出可进行操作的按钮，比如删除， 修改， 增加

4.请求和响应的控制

如果用户通过非常规操作， 比如通过浏览器调试工具将某些禁用的按钮变成启用状态， 此时发的请求， 也可以被前端所拦截



## 实现



### 菜单栏控制

用户登录之后,拿到token,然后请求数据,根据这个数据对菜单栏进行渲染,类似于这种,但是最好将token和菜单信息不放在一个接口中,

```
{
 id: 1,
 username: 'admin',
 password: 'admin',
 token: 'abcd12efghqwe23klmnopqrstuvwx31234qr34yz',
 rights: [{
   id: 1,
   authName: '一级菜单',
   icon: 'icon-menu',
   children: [{
     id: 11,
     authName: '一级项目1',
     path: 'goods',
     rights: ['view', 'edit', 'add', 'delete']
   }, {
     id: 11,
     authName: '一级项目2',
     path: 'fetch',
     rights: ['view']
   }]
 }]
}
```

拿到数据后把数据存入vuex中,同时存入本地的sessionStorage中,并保持数据同步,然后主页根据vuex中的数据进行菜单列表的渲染
在退出登陆的时候

```
logOut(){
    sessionStorage.clear()  //删除sessionStorage数据
    this.$router.push('/login')
    window.location.reload()  //删除vue数据,让当前页面刷新
}
```



### 界面的控制

解决在未登录情况下在网址栏输入地址跳转进入管理平台

```
router.beforeEach((to, from, next) => {
if (to.path === '/login') {
 next()
} else {
 const token = sessionStorage.getItem('token')
 if (!token) {
   next('/login')
 } else {
   next()
 }
}
}
```

解决登陆后用户角色权限不够但仍能够使用网址进入所有路由,使用动态路由

首先,将需要权限控制的路由单独定义

```
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'
//默认页面
import Home from '@v/Home.vue'
import Login from '@v//Login.vue'
import NotFound from '@v//NotFound.vue'
import GoodsList from '@c/goods/GoodsList.vue'
import mapList from '@c/goods/mapList.vue'
import fetchList from '@c/goods/fetchList.vue'
//需要权限规则的单独定义

const GoodsRule = { path: '/Goods', component: GoodsList }
const mapRule = { path: '/map', component: mapList }
const fetchRule = { path: '/fetch', component: fetchList }

//后端拿到的路径字符串与权限路由进行映射
const ruleMapping = {
  'goods': GoodsRule,
  'map': mapRule,
  'fetch': fetchRule
}

//不会在路由中定义需要的权限路由,而是动态添加
const routes = [{
  path: '/',
  name: 'Home',
  component: Home,
  redirect: '/menu/one',
  children: [{
    path: '/menu/one',
    component: () =>import('@/views/Page1.vue')
  }]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }]
export function initDynamicRouters() {
  //根据二级权限动态添加路由
  // console.log(router)
  //当前路由信息
  const currentRoutes = router.options.routes
  // 从vuEx拿到数据遍历添加
  const rightList = store.state.rightList
  rightList.forEach(item => {
    item.children.forEach(v => {
      //二级权限(根据字段给它分配对应的路由)
      const temp = ruleMapping[item.path]
      //给路由meta中添加当前角色可做的权限,在按钮控制中需要
    temp.meta=item.rights
      //添加动态路由
      currentRoutes[2].children.push(temp)
    })
  })
  //将更改之后的结果重新设置给路由对象
  router.addRoutes(currentRoutes)
}
```

如果重新刷新的话动态路由就会消失，动态路由是在登录成功之后才会调用的，刷新的时候并没有调用，所以动态路由没有添加上,可以在app.vue中的created中调用添加动态路由的方法initDynamicRouters



### 按钮的控制

虽然用户可以看到某些界面了， 但是这个界面的一些按钮该用户可能是没有权限的。 因此， 我们需要对组件中的一些按钮进行控制， 用户不具备权限的按钮就隐藏或者禁用， 而在这块的实现中， 可以把该逻辑放到自定义指令中,参考 官方描述

```vue
<el-button
    type="success"
    @click="addDiaLogVis=true"
    v-permission="{action:'add' ,effect:'disable'}">
    添加用户
</el-button>
import Vue from "vue"
import router from '@/router.js'
Vue.directive('permission', {
  inserted(el, binding) {
    //拿到例子中action的值,值为`add`,表示进行添加操作
    const action = binding.value.action
    //拿到例子中effect的值,值为`disable`,表示不可操作
    const effect = binding.value.effect
    //可以获取当前路由中用户角色是否具备action的权限
    //console.log(router.currentRoute.meta)
    //判断当前路由中用户角色是否具备action的权限
    if (router.currentRoute.meta.indexOf(action) == -1) {
      if (effect === 'disabled') {
    //禁用
        el.disabled = true
        el.classList.add('is-disabled')
      } else {
    //移除
        el.parentNode.removeChild(el)
      }
    }
  }
})
```
