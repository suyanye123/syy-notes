# React

### 组件间通信

1.通过props传递，只能一层一层传递

2.消息订阅和发布机制

通过工具库PubSubJS来实现

```js
//发布消息
Pubsub.pubulish('search',searchName)
//订阅消息
componentDidMount(){
	Pubsub.subscribe('search',function(msg,searchName){
	//指定了新的search，回调函数发起请求
	......
	})
}
```

3.redux

一个存放数据的容器

redux三大核心  

1.单一数据源store

整个应用的state被存储在一棵object tree中，并且这个object  tree只存在于唯一一个store中

通过creatStore 来构建 store

通过 subscribe来注册监听

2.state是只读的，唯一改变state的方法就是触发action

```
store.dispatch({type:'COMPLETE_TODO',index:1})
```

3.使用纯函数reducer来执行修改 

为了描述action如何改变state tree，你需要去编写reducers

reducers只是一些纯函数，接受先前的state和action，并返回新的state

响应发送过来的action，函数接受两个参数，一个是初始化state，一个是发送过来的action，必须有return返回值