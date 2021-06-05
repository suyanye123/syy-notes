# Mock.js

模拟生成随机数据，拦截ajax



## 使用方法

#### 1.安装(Node)

```bash
# 安装
npm install mockjs
```

#### 2.新建mock文件

```js
// 使用 Mock
var Mock = require('mockjs')
var data = Mock.mock({
    // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
    'list|1-10': [{
        // 属性 id 是一个自增数，起始值为 1，每次增 1
        'id|+1': 1
    }]
})
// 输出结果
console.log(JSON.stringify(data, null, 4))
```

#### 3.真实使用案例:

```js
//  目录src/mock
const Mock = require('mockjs')

const Random = Mock.Random;

const usersData = function () {
  let users = {
    intro: Random.csentence(5, 30)
    imgPath: Random.dataImage('40x40', 'mock的图片'), 
    name: Random.cname(), 
    date: Random.date() + ' ' + Random.time() 
  }
  return users
}

Mock.mock('/users/index', 'post', usersData)

```

```js
//  目录main.js引入mock
requrie('./mock/mock-login')
```

```js
import {login} from '../../api'

login(params)
		.then(res=>{
			 setTimeout(()=>{
					this.loading.close()
			        localStorage.setItem('register', JSON.stringify(res.data))
			        this.$message.success('登录成功')
			        this.$router.push('/views')
			 },1000)
		})
```

