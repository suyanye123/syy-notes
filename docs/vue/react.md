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

