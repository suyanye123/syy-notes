## token过期时，前端该怎么处理

#### 思路：token过期处理方式大概就是：

1. 第一种：跳回登陆页面重新登陆
2. 第二种：`catch` 401 ，然后重新获取 `token`

#### 对于第一种，很简单在vue中我们可以在 `axios` 拦截器中这样写：



```js
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response.data
  },
  function (error) {
    console.log(error)

    if (error.response) {
      if (error.response.status === 401) {
            Message.error('登陆过期请重新登陆！')
            setToken('')
            router.push({
              name: 'login'
            })
        }
      }
    }

    // 对响应错误做点什么
    return Promise.reject(error.response)
  }
)
```



#### 对于第二种，如何重新获取 `token`，这就要涉及到后端的知识了

```js
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response.data
  },
  function (error) {
    console.log(error)

    if (error.response) {
      if (error.response.status === 401) {
       
        // 如果当前路由不是login，并且用户有 “记住密码” 的操作
        // 那么去请求新 token
        if (router.currentRoute.name !== 'login') {
          if (getRemember() && getRefreshToken()) {

            return doRequest(error)
          } else {

            Message.error('登陆过期请重新登陆！')
            setToken('')
            router.push({
              name: 'login'
            })
          }
        }
      }
    }

    // 对响应错误做点什么
    return Promise.reject(error.response)
  }
)
```

```js
async function doRequest (error) {
  const data = await store.dispatch('refreshToken')

  return res
}

// refreshToken 中重新设置了 token 和  refresh_token
commit('setToken', { token, expiresIn })
setRefreshToken(token, refreshTtl / (60 * 60 * 24))
```

然后再发送一次请求

```js
async function doRequest (error) {
  const data = await store.dispatch('refreshToken')
  let { token_type: tokenType, access_token: accessToken } = data

  let token = tokenType + accessToken
  let config = error.response.config
  
  config.headers.Authorization = token

  const res = await axios.request(config)

  return res
}
```

## 封装uni简易路由器

`uni`源码中有 一个`api`名为`addInterceptor`，用来给`uni`统计用的。

类似就是添加拦截器的意思，然后基于这个api我们可以封装一个简易路由器，

实现像vue-router中的beforeEach那样的跳转拦截功能

具体实现如下：

#### 1.首先我们要定义一个页面白名单，在跳转时先判断是否在白名单中，在的话直接跳转，不在则判断登陆状态

```js
import $store from './store/index'
// 页面白名单
const whiteList = [
  '/',
  '/details/pages/login',
  '/pages/home/index',
  '/pages/report/index',
]

function hasPermission(url) {
  let access_token = $store.state.userinfo.hasLogin
  console.log('路由判断你登录了吗', access_token);
  // 在白名单中或有token，直接跳转
  if (whiteList.indexOf(url) !== -1 || access_token) {
    return true
  }
  return false
}

uni.addInterceptor('navigateTo', {
  // 页面跳转前进行拦截, invoke根据返回值进行判断是否继续执行跳转
  invoke(e) {
    if (!hasPermission(e.url)) {
      uni.reLaunch({
        url: '/details/pages/login'
      })
      return false
    }
    return true
  },
  success(e) {
    // console.log(e)
  }
})

uni.addInterceptor('switchTab', {
  // tabbar页面跳转前进行拦截
  invoke(e) {
    // console.log(e)
    if (!hasPermission(e.url)) {
      uni.reLaunch({
        url: '/details/pages/login'
      })
      return false
    }
    return true
  },
  success(e) {
    // console.log(e)
  }
})
```

#### 2.引入main.js

```js
import './router.js'
```

**注意：**拦截器是调用uni.相关的方法才触发的。

小程序切换tabbar并不是调用uni.switchTab，可以使用监听tabbar点击事件做类似处理。

然后app端在触发 switchTab跳转拦截时，可能存在一些问题。

具体参考 [社区问答](https://ask.dcloud.net.cn/question/123904)

