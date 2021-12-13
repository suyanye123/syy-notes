# 状态管理库

## 一、vuex

### 1.使用方法

```js
//安装依赖
npm i vuex --save
//引入main.js
import Vuex from 'vuex'
//注册vuex
Vue.use(Vuex)
//vuex实例化
const store = new Vuex.Store({
  //实例化vuex的构造参数 state mutations actions
  state: {
    count:0
  }
})
//把store挂载在vue实例上
new Vue({
	render: h => h(App),
	store //es6写法，变量名和属性名一致，省略写一个即可
}).$mount('#app')
```



### 2.使用state中的数据

>  state中放置所有公共状态的属性

- 原始形式，插值表达式，组件中可以使用this.$store获取到vuex中的store实例对象

```html
<div>
  state中的数据：{{$store.state.count}}
</div>
```



- 计算属性，将state属性定义在计算属性中

```js
computed:{
	count(){
	return this.$store.state.count
	}
}
```

```html
<div>
  state的数据：{{count}}
</div>
```



- 辅助函数，mapState

> mapState是辅助函数，帮助我们把store中的数据映射到组件的计算属性中，属于一种便捷用法

```js
//导入mapState
import {mapState} from 'vuex'
//采用数据形式引入state属性
mapState(['count'])
//利用扩展运算符将导出的状态映射给计算属性
computed:{
	...mapState(['count'])
}
```
```html
<div>
  state的数据：{{count}}
</div>
```



### 3. mutations

> state数据的修改只能通过mutations，并且mutations必须是同步更新，目的是形成数据快照

#### 定义mutation

```js
const store = new Vuex.Store({
	state:{
		count:0
	},
	mutations:{	//mutations是一个对象，对象中存放修改state的方法
		addCount(state，payload){	//每一个mutation方法都有对应的参数
      //第一个参数state指当前vuex中的state对象
      //第二个参数payload载荷，是提交mutation的方法时，传递的参数，可以为任何形式任何类型
      state.count += payload
    }
	}
})

```

#### 组件中调用mutation

- 原始形式，$store

```vue
<script>
	export default{
    methods:{
      addCount(){
        //调用store中的mutations提交给mutations
        this.$store.commit('addCount',10)
      }
    }
  }
</script>
```

- 辅助函数，mapMutations

```js
import {mapMutations} from 'vuex'
methods:{
  ...mapMutations(['addCount'])
}
```

```vue
//调用
<button @click='addCount(100)'></button>
//当需要传递事件参数对象时，写$event,不写参数时也会默认传递事件参数对象
```



### 4.getters

> 除了state之外，有时我们需要从state中衍生出一些状态（类似于组件中的计算属性），这些状态依赖state，此时会用到getters

例如，state中定义了list，然后组件中需要对list中的数据进行筛选

```js
state：{
	list:[1,2,3,4,5,6,7,8,9]
}
```

- 定义getters

```js
const store = new Vuex.Store({
	state:{
		list:[1,2,3,4,5,6,7,8,9]
	},
	mutations:{	
	}，
	getters:{//放置所有的vuex的计算属性
		//state指的就是当前store中的state
		//filterList: function(state){
  	//	return state.list.filter(item => item>5)
		//}
  	filterList: state => state.list.filter(item => item>5)
	}
})

```

