# React

## React 基本认识

用于构建用户界面的 JavaScript 库（只关注于 View），由 Facebook 开源。

**特点**

1. Declarative（声明式编码）
2. Component-Based（组件化编码）
3. Learn Once，Write Anywhere（支持客户端与服务器渲染，React-Native）
4. 高效
5. 单向数据流

**高效的原因**

1. 虚拟（virtual）DOM，不总是操作 DOM
2. DOM Diff 算法，最小化页面重绘

### React 基本使用

**相关 js 库**

1. react.js：React 的核心库
2. react-dom.js：提供操作 DOM 的 react 扩展库
3. babel.min.js：解析 JSX 语法代码转为纯 JS 语法代码的库

**使用 React 开发者工具调试**

React_DeveloperTools 浏览器插件



### 虚拟 DOM

1.创建虚拟 DOM（特别的 js 对象）的两种方式：

a. React 提供的 API 来创建（纯 JS，一般不用）

```js
var vDom = React.createElement('h1', {id: myId}, msg)
```

 b. JSX 语法（需要 babel 转换为 js）

```jsx
var vDom = <h1 id={myId}>{msg}</h1>
```

2.虚拟 DOM 对象最终都会被 React 转换为真实的 DOM

3.我们编码时基本只需要操作 react 的虚拟 DOM 的相关数据，react 会转换为真实的 DOM 变化从而更新界面（因为虚拟 DOM 很“轻”，而真实 DOM 很“重”；真实 DOM 改变会重绘，而虚拟 DOM 变化不会更新界面，只有在渲染后才更新）

> 在 Web 开发中，我们总需要将变化的数据实时反应到 UI 上，这时就需要对 DOM 进行操作。而复杂或频繁的DOM操作通常是性能瓶颈产生的原因，React 为此引入了虚拟 DOM（Virtual DOM）的机制：
>
> 在浏览器端用 JS 实现了一套 DOM API。基于 React 进行开发时所有的 DOM 构造都是通过虚拟 DOM 进行，每当数据变化时，React 都会重新构建整个 DOM 树，然后 React 将当前整个 DOM 树和上一次的 DOM 树进行对比，得到 DOM 结构的区别，然后仅仅将需要变化的部分进行实际的浏览器 DOM 更新。而且 React 能够批处理虚拟 DOM 的刷新，在一个事件循环（Event Loop）内的两次数据变化会被合并，例如你连续的先将节点内容从 A 变成 B，然后又从 B 变成 A，React 会认为 UI 不发生任何变化，而如果通过手动控制，这种逻辑通常是极其复杂的。尽管每一次都需要构造完整的虚拟 DOM 树，但是因为虚拟 DOM 是内存数据，性能是极高的（很“轻”），而对实际 DOM 进行操作的仅仅是 Diff 部分，因而能达到提高性能的目的。
>
> 这样，在保证性能的同时，开发者将不再需要关注某个数据的变化如何更新到一个或多个具体的 DOM 元素，而只需要关心在任意一个数据状态下，整个界面是如何 Render 的。

### 组件的组合

#### 功能界面的组件化编码流程（无比重要）

1.拆分组件：拆分界面，抽取组件（有几个组件）

2.实现静态组件：使用组件实现静态页面效果（写 render）只有静态界面，没有动态数据和交互

3.实现动态组件

 a. 动态显示初始化数据（数据定义在哪一个组件中）

 b. 交互功能（从绑定事件监听开始）

###  收集表单数据

**理解**

1.问题：在 react 应用中，如何收集表单输入数据

2.包含表单的组件分类

a. **受控组件**：表单项输入数据能自动收集成状态（onChange）

更贴近 react 思想，尽量少操作 DOM（一般更推荐这种写法）

```
密码：<input type="password" value={this.state.pwd} onChange={this.handleChange} />
```

b. **非受控组件**：需要时才手动读取表单输入框中的数据（ref）

写起来轻松，但是操作了原生 DOM（this.nameInput.value）

```
用户名：<input type="text" ref={input => this.nameInput = input} />
```



## JSX

> 内部仅仅是createElement()方法的语法糖
>
> JSX语法被 @babel/preset-react插件编译为createElement()方法

全称：JavaScript XML

react 定义的一种类似于 XML 的 JS 扩展语法 XML + JS

作用：用来创建 react 虚拟 DOM（元素）对象

- `var vDom = <h1>Hello JSX!</h1>`

- 注意1：它不是字符串，也不是 HTML/XML 标签

- 注意2：它最终产生的就是一个 JS 对象

标签名任意：HTML 标签或其它标签（可以自定义）

标签属性任意：HTML 标签属性或其它（可以自定义）

基本语法规则

- 遇到 '<' 开头的代码，以标签的语法解析：html 同名标签转换为 html 同名元素，其它标签需要特别解析

- 遇到 '{' 开头的代码，以 JS 语法解析：**标签中的 js 代码必须用 {} 包含**
- 也就是说：js 中可以直接嵌套<标签>，但标签要嵌套 js 需要放在 {} 中

babel.js 的作用

- 浏览器不能直接解析 JSX 代码，需要 babel 转译为纯 JS 的代码才能运行

- 只要用了 JSX，都要在 script 标签中加上 `type="text/babel"` 来声明需要 babel 来处理

#### 1.3.3 渲染虚拟 DOM(元素)

语法：`ReactDOM.render(virtualDOM, containerDOM)`

>  a. 参数一：纯 js 或 jsx 创建的虚拟 dom 对象
>
>  
>
>  b. 参数二：用来包含虚拟 DOM 元素的真实 dom 元素对象(一般是一个 div)

作用：将虚拟 DOM 元素渲染到页面中的真实容器 DOM 中显示

```js
const element = React.createElement('h1',{className:'greeting'},'Hello JSX')
```



```jsx
//jsx的条件渲染


//js的列表渲染  使用数组的map方法，并记得添加唯一值 key属性
const songs = [{id:1,name:'xxx'},{id:2,name:'xxx'}]
const list = (<ul>
             		{songs.map(item=><li key={item.id}>{item.name}</li>)}
             </ul>)

//js的样式处理

```



## 组件

> 组件的两种创建方式：函数组件和类组件
>
> 函数组件：无状态组件，负责静态结构展示
>
> 类组件：有状态组件，负责更新UI界面 

1.定义组件的两种方式

```jsx
// 方式1：工厂函数组件（是简单组件，没有state状态）
function MyComponent() {
  return <h2>工厂函数组件（简单组件）</h2>
}
// 方式2：ES6类组件（是复杂组件，可以有state）
class MyComponent2 extends React.Component {
  render() {
    console.log(this) // MyComponent2的实例对象
    return <h2>ES6类组件（复杂组件）</h2>
  }
}
```

2.渲染组件标签

```jsx
ReactDOM.render(<MyComponent />, document.getElementById('example1'))
```

3.注意：

- 组件名必须首字母大写
- 虚拟 DOM 元素只能有一个根元素
- 虚拟 DOM 元素必须有结束标签

4.render() 渲染组件标签的基本流程：

1. React 内部会创建组件实例对象
2. 得到包含的虚拟 DOM 并解析为真实 DOM
3. 插入到指定的页面元素内部

### 组件三大属性

#### 1.props

**理解**

1.每个组件对象都会有 props（properties）属性

2.组件标签的所有属性都保存在 props 中

**作用**

1.通过标签属性从组件外向组件内传递变化的数据

2.注意：组件内部不要修改 props 数据

**编码**

```jsx
// 1.内部读取某个属性值
this.props.propertyName
// 2.对 props 中的属性值进行类型限制和必要性限制
Person.propTypes = { // 使用 prop-types 库
  name: PropTypes.string.isRequired,
  age: PropTypes.number
}
// 3.扩展属性：将对象的所有属性通过 props 传递
<Person {...person} />
// 4.默认属性
Person.defaultProps = {
  name: 'Mary'
}
// 5.组件类的构造函数
constructor(props) {
  super(props)
  console.log(props) // 查看所有属性
}
```

**问题**

请区别一下组件的 props 和 state 属性

1.state：组件自身内部可变化的数据

2.props：从组件外部向组件内部传递数据，组件内部只读不修改



>props的三大特性：
>
>1.可以给组件传递任意类型的数据
>
>2.props是只读的对象，只能读取属性的值，无法修改对象
>
>3.注意：！使用类组件时，如果写了构造函数，应将props传递给super()，否则无法在构造函数中获取到props

```jsx
class Hello extends React.Component{
  constructor(props){
    super(props)
  }
  render(){
    return <div>接收到的数据：{this.props.age}</div>
  }
}
```

组件是封闭的，要接受外部数据应该通过props来实现

props的作用：接收传递给组件的数据

```jsx 
//通过给组件标签添加属性的方式来传递属性，例如下面传递了name和age
<Hello name='jack' age={19} />
//接收数据：函数组件通过参数props接收数据，类组件通过this.props接收数据
function Hello(props){
  return (
  	<div>接收到数据：{props.name}</div>
  )
}
class Hello extends React.Component{
  render(){
    return (
    	<div>接收到数据：{this.props.age}</div>
    )
  }
}
```

#### props深入

```jsx
//children属性：表示组件标签的子节点。当组件标签有子节点时，props就会有该属性
//children属性与普通的props一样，可以为任意值（文本、元素、组件、函数）
const App = props =>{
   return (
   	 <div>
     	 <h1>组件标签的子节点</h1>
       {props.children}
     </div>
   )
}
ReactDOM.render(<App>我是子节点</App>，document.getElementById('root'))
```

```jsx
//props校验
//作用：捕获使用组件时因为props导致的错误，给出明确的错误提示，增强组件的健壮性
//安装 prop-types 
//使用 组件名.propTypes = {} 来给组件的props添加校验规则
function App(props){
  return(
  	<h1>Hi,{props.colors}</h1>
  )
}
App.propTypes = {
  //约定colors属性为array类型
  colors：PropsTypes.array
}

//常见的约束规则
//1.常见类型：array\bool\func\number\object\string
PropTypes.func
//2.React元素类型：element
PropTypes.element
//3.必填项：isRequired
PropTypes.func.isRequired
//4.特定结构的对象：shape({})
PropTypes.shape({
  color:PropTypes.string,
  fontSize:PropTypes.number
})
```

```jsx
//props的默认值
function App(props){
  return (
  	<div>
    	此处展示props的默认值：{props.pageSize}
    </div>
  )
}
App.defaultProps = {
  pageSize: 10
}
ReactDOM.render(<App />，document.getElementById('root'))
```



#### 2.state

> 组件内私有属性，用来渲染UI

**理解**

1.state 是组件对象最重要的属性，值是对象（可以包含多个数据）

2.组件被称为"状态机"，通过更新组件的 state 来更新对应的页面显示（重新渲染组件）

**编码**

```
1.初始化状态
constructor (props) {
  super(props)
  this.state = {
    stateProp1 : value1,
    stateProp2 : value2
  }
  // 将新增的方法中this强制绑定为组件对象（新添加的方法：内部this默认不是组件对象，而是undefined）
  this.handleClick = this.handleClick.bind(this) // bind返回一个新的处理过的函数
}
// 2.读取某个状态值
this.state.statePropertyName
// 3.更新状态 --> 组件界面更新
this.setState({
  stateProp1 : value1,
  stateProp2 : value2
})
```

**setState()是异步更新数据的，不会立即更新状态**

```js
//注意：使用该语法时，后面的setState() 不要依赖于前面的 setState()
//可以调用多次 setState()， 但只会触发一次重新渲染 render()
//推荐语法，使用回调函数的形式  setState((state,props)=>{})
this.setState((state,props)=>{
  return{
    //这里的参数 state和props都是表示最新的state和props
    count: state.count +1
  }
})
```

```jsx
//setState方法的第二个参数，是一个回调函数，用于在状态更新(页面完成重新渲染)后立即执行某个操作（类似nextTik）   与componentDidUpdate()有一点类似
// setState(updater[,callback])
this.setState(
	(state,props) => {},
  () => {console.log('这个函数会在状态更新后立即执行')}
)
```



#### 3.refs

1.组件内的标签都可以定义 ref 属性来标识自己

 a. `<input type="text" ref={input => this.msgInput = input} />`

 b. ref 中的回调函数在组件初始化渲染完或卸载时自动调用（将 input 这个元素赋给组件实例对象的 this.msgInput）

2.在组件中可以通过 this.msgInput.value 来得到对应的真实 DOM 元素的值

3.作用：通过 ref 获取组件内容特定标签对象，进行读取其相关数据



### 表单处理

> React将state与表单元素值value绑定到一起，由state的值来控制表单元素的值

#### 受控组件

> <input type='text' value= { this.state.txt } onChange = { e => this.setState({ txt：e.target.value }) }/>
>
> 把其值受到React控制的表单元素，称为受控组件

```jsx
//多表单元素优化
//1.给表单元素添加name属性，名称与state相同
state = { txt:'' }
render(){
  return (
  	<input type='text' value={this.state.txt} name='txt' onChange={this.handleForm} />
  )
}

//2.根据表单类型获取对应的值（有的表单元素获取的是value，有的获取的是checked）
handleForm = (e)=>{
  const target = e.target 
  const value = target.type==='checkbox'?target.checked:target.value
}

//3.根据name设置对应的state
handleForm = (e)=>{
  const target = e.target 
  const value = target.type==='checkbox'?target.checked:target.value
  const name = target.name
  this.setState({
  [name]:value
})
}
```

#### 非受控组件

> 借助于ref，使用原生DOM方式来获取表单元素值
>
> ref的作用：获取DOM或组件

```jsx
//1.调用React.createRef()方法创建一个ref对象
constructor(){
  super()
  this.txtRef = React.createRef()
}

//2.将创建好的ref对象添加到文本框中
<input type='text' ref={this.txtRef} />

  //3.通过ref对象获取到DOM元素，文本框的值
console.log(this.txtRef.current.value)

class App extends React.Component{
  constructor(){
    super()
    this.txtRef=React.creatRef()
  }
  get=()=>{
    console.log(this.txtRef.current.value)
  }
  render(){
    return(
      <div>
    		<input type='text' ref={this.txtRef} />
        <button onClick={this.get}></button>
			</div>
    )
  }
}
ReactDOM.render(<App/>,document.getElementById('root'))
```



### 项目实战

```js
//写一个评论案例
import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// 根组件
class App extends React.Component {
  // 初始化state
  state = {
    comments: [
      { id: 1, name: "jack", content: "沙发！！！" },
      { id: 2, name: "rose", content: "板凳~" },
      { id: 3, name: "tom", content: "楼主好人" },
    ],
    user: "",
    content: "",
    isShow: false,
  };
  // 受控组件
  changeAll = (e) => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value,
    });
  };
  //提交表单
  commit = () => {
    const { user, content, comments } = this.state;
    if (user.trim() === "" || content.trim() === "") {
      alert("请不要输入空内容");
    } else {
      let newComments = [
        {
          id: Math.random(),
          name: user,
          content,
        },
        ...comments,
      ];
      this.setState({
        comments: newComments,
        user: "",
        content: "",
      });
    }
  };
  //渲染评论列表
  renderList() {
    return this.state.comments.lenght === 0 ? (
      <div className="no-comment">暂无评论,快去评论吧~</div>
    ) : (
      <ul>
        {this.state.comments.map((item) => (
          <li key={item.id}>
            <h3>评论人：{item.name}</h3>
            <p>评论内容：{item.content}</p>
          </li>
        ))}
      </ul>
    );
  }
  render() {
    const { user, content } = this.state;
    return (
      <div className="app">
        {/* 上部分 */}
        <div>
          <input
            className="user"
            type="text"
            name="user"
            placeholder="请输入评论人"
            value={user}
            onChange={this.changeAll}
          />
          <br />
          <textarea
            className="content"
            name="content"
            cols="30"
            rows="10"
            placeholder="请输入评论内容"
            value={content}
            onChange={this.changeAll}
          />
          <br />
          <button onClick={this.commit}>发表评论</button>
        </div>
        {/* 下部分,条件渲染 */}
        {this.renderList()}
      </div>
    );
  }
}

// 渲染组件
ReactDOM.render(<App />, document.getElementById("root"));

```



### 高阶组件和 render Props模式

> 用于组件逻辑代码抽离复用

#### render props

```jsx
//作用：封装复用的状态逻辑代码（1.状态 2.操作状态的方法）
class Mouse extends React.Component{
	state={
    x:0,
    y:0
  }
	handleMouseMove = (e) =>{
    this.setState({
      x:e.clientX,
      y:e.clientY
    })
  }
//在挂载阶段监听绑定鼠标移动事件
	componentDidMount(){
    window.addEventListener('mousemove',this.handleMouseMove)
  }
//我的理解：以类似于子传父props的模式，把自己的私有state以回调函数的参数形式传给要使用的组件
	render(){
    return this.props.render(this.state)
  }
}
class App extends React.Component{
  render(){
    return (
    	<div>
      	<h1>render props 模式</h1>
        <Mouse render={mouse=>{
            return (
            	<p>
              	鼠标位置为：{mouse.x} {mouse.y}
              </p>
            )
          }}>
        </Mouse>
      </div>
    )
  }
}
```

```jsx
//优化为 children方式
// {({x,y}) => <p>鼠标的位置是{x}，{y}</P> }
// this.props.children(this.state)
//作用：封装复用的状态逻辑代码（1.状态 2.操作状态的方法）
class Mouse extends React.Component{
	state={
    x:0,
    y:0
  }
	handleMouseMove = (e) =>{
    this.setState({
      x:e.clientX,
      y:e.clientY
    })
  }
//在挂载阶段监听绑定鼠标移动事件
	componentDidMount(){
    window.addEventListener('mousemove',this.handleMouseMove)
  }
	componentWillUnmount(){
  window.removeEventListener('mousemove',this.handleMouseMove)
	}
//我的理解：以类似生于组件插槽的模式，把要渲染的内容插入封装复用的组件中，
//作为组件的子节点children，可以更方便的去拿组件内部的state数据
	render(){
    return this.props.children(this.state)
  }
}
class App extends React.Component{
  render(){
    return (
    	<div>
      	<h1>render props 模式</h1>
        <Mouse>
          {mouse => {
              return (
            	<p>
              	鼠标位置为：{mouse.x} {mouse.y}
              </p>
            	)
           }}
        </Mouse>
      </div>
    )
  }
}
```

```jsx
方式//context中的用法,可以发现与render props模式的children方法一模一样
<Consumer>
	{data => <span>data参数表示接收到的数据--{data}</span>}
</Consumer>
```



#### 高阶组件（HOC）

> 创建一个函数，名称约定 以with开头
>
> 指定函数参数，参数以大写字母开头(作为要渲染的组件)
>
> 在函数内部创建一个类组件，提供复用的状态逻辑代码，并返回

```jsx
function WithMouse(WrappedComponent){
  class Mouse extends React.Componnet{
    state={...}
    ....//复用逻辑
    render(){
      //通过props将复用的状态传递给被包装组件 WrappedComponent
      return <WrappedComponent {...this.state} />
    }
  }
	return Mouse
}
```

我的个人理解：以包装（装饰器）的设计思想，把要使用的组件以参数传入，然后在高阶组件函数内部新建一个类组件，提供复用的状态逻辑代码，通过props的形式，把这些要复用的state传递给 参数组件，最后把参数组件return出去用于渲染

```jsx
function WithMouse(WrappedComponent){
  class Mouse extends React.Componnet{
    state={
      x:0,
      y:0
    }
  handleMouseMove = (e) =>{
    this.setState({
      x:e.clientX,
      y:e.clientY
    })
  }
  componentDidMount(){
    window.addEventListener('mousemove',this.handleMouseMove)
 	 }
	componentWillUnmount(){
 		window.removeEventListener('mousemove',this.handleMouseMove)
	}
  render(){
   //通过props将复用的状态传递给被包装组件 WrappedComponent
      return <WrappedComponent {...this.state} {...this.props} />
    }
  }
	return Mouse
}

const Postion = props => (
	<p>
  	鼠标当前位置：(x: {props.x}, y:{props.y})
  </p>
)
const MousePosition = withMouth(Position)

class App extends React.Component {
  render(){
    return (
    	<div>
      	<h1>高阶组件</h1>
 				//渲染增强后的组件
        <MousePosition></MousePosition>
      </div>
    )
  }
}
ReactDOM.render(<App />,document.getElementById('root'))
```

**设置displayName**

```js
//为了区分增强后的不同组件
//组件内调用函数生成不同名字
Mouse.displayName = `WithMouse ${getDisplayName(WrappedComponent)}`
//组件外定义函数
function getDisplayName(WrappedComponent){
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}
```



### 组件更新机制

```js
//父组件重新渲染时，也会重新渲染子组件，但只会渲染当前组件子树。
```



### 组件性能优化

#### 1.减轻state： 只存储与组件渲染相关的数据

不用做渲染的数据不要放到state中，比如定时器id等
对于这种需要在组件内多个方法中共享用到的数据，应该放在this中

#### 2.避免不必要的重新渲染

父组件更新时会引起子组件被更新，即使子组件没有任何变化时也会重新渲染
解决方法：使用钩子函数 `shouldComponentUpdate(nextProps,nextState)`，通过返回值决定是否重新渲染，返回true表示重新渲染

触发时机：更新阶段的钩子函数，组件重新渲染前执行（shouldComponentUpdate => render）

```js
class Hello extends Component{
	shouldComponentUpdate(nextProps,nextState){
		//根据条件，决定是否重新渲染组件 nextProps,nextState分别代表最新的
    console.log(nextState) //最新的状态
    console.log(this.state) //更新前的状态
    return false
	}
  render(){.....}
}
```

案例：随机数

```jsx
//通过nextState
class App extends React.Component{
  state = {
    number:0
  }
	handleClick = () =>{
    this.setState(()=>{
      return {
        number:Math.floor(Math.random()*3)
      }
    })
  }
  //因为两次生成的随机数可能相同，如果相同，不需要重新渲染
  shouldComponentUpdate(nextProps,nextState){
    if(nextState.number !== this.state.number){
      return true
    }
    return false
  }
//优化一下 return nextState.number !== this.state.number
  
  render(){
    return(
    	<div>
      	<h1>随机数：{this.state.number}</h1>
        <button onClick={this.handleClick}>重新生成</button>
      </div>
    )
  }
}
```

```jsx
//通过nextProps
class App extends React.Component{
  state = {
    number:0
  }
	handleClick = () =>{
    this.setState(()=>{
      return {
        number:Math.floor(Math.random()*3)
      }
    })
  } 
  render(){
    return(
    	<div>
      	<<NumberBox number={this.state.number}></NumberBox>
        <button onClick={this.handleClick}>重新生成</button>
      </div>
    )
  }
}
class NumberBox extends React.Component {
 //如果相同，不需要重新渲染
  shouldComponentUpdate(nextProps,nextState){
    return nextProps.number !== this.props.number
  }
  render(){
    return <h1>随机数：{this.props.number}</h1>
  }
}
```

#### 3.纯组件

> 纯组件： PureComponent 与 React.Component 功能相似
>
> 区别：PureComponent 内部自动实现了 shouldComponentUpdate钩子，不需要手动比较
>
> 原理： 纯组件内部通过分别对比前后两次 props和state的值，来决定是否重新渲染组件

```jsx
class Hello extends React.PureComponent {
	render(){
		return (
    	<div>纯组件</div>
    )
	}
}
```

**注意** ：**纯组件内部的对比是shallow compare（浅层对比）**

对于值类型，比较两个值是否都相同。对于引用类型来说，只比较对象的引用地址是否相同

所以：state或props中属性值为引用类型时，应该创建新数据，不要直接修改原数据

```js
//对象
const newObj = {...state.obj , number:2 }
setState({ obj:newObj })

//数组
//不要用数组的push、unshift等直接修改当前数组的方法
//而应该用 concat 或 slice 等这些返回新数组的方法
this.setState({
	list: [...this.state.list, {新数据}]
})
```

## 事件

### 事件处理

1.通过 onXxx 属性指定组件的事件处理函数（如：onClick、onBlur，注意需要大写）

 a. React 使用的是自定义（合成）事件，而不是使用的原生 DOM 事件

 b. React 中的事件是通过事件委托方式处理的（委托给组件最外层的元素）

2.通过 event.target 得到发生事件的 DOM 元素对象

```
<input onFocus={this.handleFocus}/>

handleFocus(event) {
  event.target  //返回事件发生的input元素对象
}
```

**注意**

1.组件内置的方法中的 this 为组件对象

2.在组件类中自定义的方法中 this 为 null

 a. 强制绑定 this：通过函数对象的 bind()

 b. 箭头函数（ES6模块化编码时才能使用）

### 事件监听理解

#### 5.2.1 原生 DOM 事件

1.绑定事件监听

 a. 事件名(类型)：只有有限的几个，不能随便写

 b. 回调函数

2.触发事件

 a. 用户操作界面

 b. 事件名(类型)

 c. 数据()

#### 5.2.2 自定义事件(消息机制)

1.绑定事件监听

 a. 事件名(类型)：任意

 b. 回调函数：通过形参接收数据，在函数体处理事件

2.触发事件(编码)

 a. 事件名(类型)：与绑定的事件监听的事件名一致

 b. 数据：会自动传递给回调函数

### 事件绑定

> 采用小驼峰命名法

注意this指向问题

```jsx
class App extends React.Component{
  state={
    count:0
  }
//事件处理程序
	onIncrement(){				//注意！！！！！此处的this是undefined
    this.setState({
      count:this.state.count+1
    })
  }
	render(){
    return (
    	<div>
      	<h1>计数器</h1>
        <button onClick={this.onIncrement}>+1</button>
      </div>
    )
  }
}
//结果会报错，this.setState是undefined，并未指向组件实例
```

解决this问题的三种方法

```jsx
//1.使用箭头函数
render(){
    return (
    	<div>
      	<h1>计数器</h1>
        //谁调用的this就是谁，同时箭头函数的this指向外部环境，所以此处是render()方法
        <button onClick={()=>this.onIncrement()}>+1</button>
      </div>
    )
  }


//2.Function.prototype.bind() 利用ES5的bind()方法
class Hello extends React.Component{
  constructor(){
    super()
    this.onIncrement = this.onIncrement.bind(this)
  }
	render(){
    return (
    	<div>
      	<h1>计数器</h1>
        <button onClick={this.onIncrement}>+1</button>
      </div>
    )
  }
}

//3.class的实例方法 利用箭头函数的class实例方法，该语法是实验性语法，但是在babel中可以直接使用
class Hello extends React.Component{
 	onIncrement = () => {				
    this.setState({
      count:this.state.count+1
    })
  }
	render(){
    return (
      <button onClick={this.onIncrement}>+1</button>
    )
  }
}

```



## 组件生命周期	

####  理解

1.组件对象从创建到死亡它会经历特定的生命周期阶段

2.React 组件对象包含一系列的**钩子函数**（生命周期回调函数），在生命周期特定时刻回调

3.我们在定义组件时，可以重写特定的生命周期回调函数，做特定的工作

#### 生命周期流程图

![image-20200823105645557](https://img-blog.csdnimg.cn/20200830142058207.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwNTA4ODMy,size_16,color_FFFFFF,t_70#pic_center)

#### 生命周期详述

1.组件的三个生命周期状态：

- Mount：挂载过程，第一次将组件插入到真实 DOM
- Update：更新过程，组件被重新渲染
- Unmount：卸载过程，被移出真实 DOM

2.**生命周期流程**：

1）创建阶段（第一次初始化渲染显示）

> ReactDOM.render()

- constructor()：`super(props)` 指定 this，`this.state={}` 创建初始化状态（getDefaultProps、getInitialState）

- componentWillMount()

  ：组件将要挂载到页面上

  - 可以在这里调用 setState() 方法修改 state

- render()：创建虚拟 DOM 但是还没有挂载上去

- componentDidMount()

  ：已经挂载到页面上（初始界面已经渲染完毕）

  - 可以在这里通过 this.getDOMNode() 来进行访问 DOM 结构
  - 可以在这里发送 ajax 请求
  - 添加监听器/订阅

2）运行阶段（二次渲染）

> 父组件传递的 `props` 发生更新，就会调用 componentWillReceiveProps()

- **componentWillReceiveProps(nextProps)**：当子组件接受到 nextProps 时，不管这个 props 与原来的是否相同都会调用

> `props` 改变或者调用 this.setState() 方法更新 `state`，都会触发组件的更新，调用后面的钩子函数

- shouldComponentUpdata(nextProps, nextState)

  ：接收一个新的 props 和 state，返回true/false，表示是否允许更新

  - 通常情况下为了优化，需要对新的 props 以及 state 和原来的数据作对比，如果发生变化才更新

> 调用 this.forceUpdate() 方法会直接进入 componentWillUpdate。跳过 shouldComponentUpdate()

- **componentWillUpdate()**：将要更新
- render()：重新渲染
- **componentDidUpdate()**：已经完成更新

除了首次 render 之后调用 `componentDidMount`，其它 render 结束之后都是调用 `componentDidUpdate`

3）销毁阶段（移除组件）

> 执行 ReactDOM.unmountComponentAtNode(containerDom) 用来使组件从真实 DOM 中卸载（开始销毁阶段）

- componentWillUnmount()

   

  ：组件将要被移除时（移出前）回调

  - 一般在 `componentDidMount` 里面注册的事件需要在这里删除

#### 重要的勾子

1. render()：初始化渲染时或更新渲染时调用
2. componentDidMount()：开启监听，可以初始化一些异步操作：启动定时器/发送 ajax 请求
3. componentWillUnmount()：做一些收尾工作，如：清理定时器
4. componentWillReceiveProps()：当组件接收到（父元素传递的）新的 props 属性前调用

#### **新的生命周期**

**注意**

`componentWillMount`、`componentWillReceiveProps` 和 `componentWillUpdate` 这三个生命周期函数都被添加了 UNSAFE_ 不安全标记，并且在 17.0 版本将会被删除。

> 由于 React 未来的版本中推出了异步渲染，在 `dom` 被挂载之前的阶段都可以被打断重来，导致 `componentWillMount`、`componentWillUpdate`、`componentWillReceiveProps` 在一次更新中可能会被触发多次，因此那些只希望触发一次的应该放在 `componentDidUpdate` 中。这也就是为什么要把异步请求放在 `componentDidMount` 中，而不是放在 `componentWillMount` 中的原因，为了向后兼容。

**目前新的生命周期流程图：**

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200830142058322.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwNTA4ODMy,size_16,color_FFFFFF,t_70#pic_center)

**getDerivedStateFromProps**

功能：将 props 映射到 state 上面

触发时间：会在调用 render 方法之前调用（**每次渲染前都会触发**），并且在初始挂载及后续更新时都会被调用。

它是一个**静态**函数，所以函数体内不能访问 this，输出完全由输入的参数 nextProps 和 prevState 来决定，如果 props 传入的内容不需要影响到 state，那么就需要返回一个 null，这个返回值是必须的。

```
static getDerivedStateFromProps(props, state) {
  if (props.currentRow !== state.lastRow) { 
    // 如果新的props的当前行大于之前的state的最后一行，就向下滚动
    return { // 返回的对象将被映射到state（state原来的属性和值还在）
      isScrollingDown: props.currentRow > state.lastRow,
      lastRow: props.currentRow,
    };
  }
  // 返回 null 表示无需更新 state。
  return null;
}
```

> 与 `componentDidUpdate` 一起，这个新的生命周期涵盖过时的 `componentWillReceiveProps` 的所有用例。

**getSnapshotBeforeUpdate**

功能：使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置）

触发时间：在最近一次渲染输出（提交到 DOM 节点）之前调用

返回值将作为第三个参数传递给 `componentDidUpdate()`。在重新渲染过程中手动保留滚动位置等情况下非常有用。

> 与 `componentDidUpdate` 一起，这个新的生命周期涵盖过时的 `componentWillUpdate` 的所有用例。



##  虚拟 DOM 与  Diff 算法

####  基本原理图

![image-20200823152235286](https://img-blog.csdnimg.cn/20200830142058100.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwNTA4ODMy,size_16,color_FFFFFF,t_70#pic_center)

DOM Diff 能比较新旧虚拟 DOM 树，计算哪里改变，然后就只需要重绘变化的局部界面。

组件 render() 调用后，根据 **状态** 和 **JSX结构** 生成虚拟DOM对象，Diff过程 发生在 render() 调用后

render() 方法调用并不意味着浏览器中的重新渲染！！仅仅说明要进行diff比较



## React路由

> 前端路由功能：让用户从一个视图（页面）导航到另一个视图
>
> 前端路由是一套映射规则，在React中，是**URL地址**与**组件**的对应关系
>
> 使用React路由简单来说，就是配置 **路径** 和 **组件** （配对）

### 理解

####  react-router

1.react 的一个插件库

2.专门用来实现一个 SPA 应用

3.基于 react 的项目基本都会用到此库

#### SPA

1.单页 Web 应用（single page web application，SPA）

2.整个应用只有一个完整的页面

3.点击页面中的链接**不会刷新页面，也不会向服务器发请求**（会更新不同的组件）

4.当点击路由链接时，只会做页面的局部更新

5.数据都需要通过 ajax 请求获取，并在前端异步展现

###  路由

1.**什么是路由?**

 a. 一个路由就是一个映射关系（key:value）

 b. key 为路由路径，value 可能是 function/component

2.**路由分类**

 a. 后台路由：node 服务器端路由，value 是 function，用来处理客户端提交的请求并返回一个响应数据

 b. 前台路由：浏览器端路由，value 是 component，当请求的是路由 path 时，浏览器端没有发送 http 请求，但界面会更新显示对应的组件

3.**后台路由**

 a. 注册路由：router.get(path, function(req, res))，即路由器

 b. 当 node 接收到一个请求时，根据请求路径找到匹配的路由，调用路由中的函数来处理请求，返回响应数据

4.**前端路由**

 a. 注册路由：`<Route path="/about" component={About}>`

 b. 当浏览器的 hash 变为 #about 时，当前路由组件就会变为 About 组件

#### 前端路由的实现

1.history 库

 a. 管理浏览器会话历史（history）的工具库

 b. 包装的是原生 BOM 中的 window.history 和 window.location.hash

2.history API

- History.createBrowserHistory()：得到封装 window.history 的管理对象
- History.createHashHistory()：得到封装 window.location.hash 的管理对象
- history.push()：添加一个新的历史记录
- history.replace()：用一个新的历史记录替换当前的记录
- history.goBack()：回退到上一个历史记录
- history.goForword()：前进到下一个历史记录
- history.listen(function(location){})：监视历史记录的变化

### react-router 相关 API

**组件**

路由器标签：

- `<BrowserRouter>`
- `<HashRouter>`：带#号

路由标签：

- `<Switch>`：包裹住`<Route>`，用来切换多个路由
- `<Route>`
- `<Redirect>`：自动跳转重定向，用来直接选中某个路由

路由链接：

- `<Link>`
- `<NavLink>`：比`<Link>`多了一个 class，选中有 active 效果

**其他**

1.this.props 中的

- match 对象：.match.params，通过路由参数向路由组件传递数据
- history 对象：.history，push()/replace()/goBack()/goForward()

2.withRouter 函数：用 this.props.history.push('/detail') 去跳转页面，但是报 this.props.history 错误 undefined，请在此组件中使用 withRouter 将 history 传入到 props 上。

### 路由使用

1.下载适用于 web 的 react-router：:`npm install --save react-router-dom`

2.流程

1. 编写**路由组件**
2. 在父路由组件中指定：
   - **路由链接**：`<NavLink>`
   - **路由**：`<Route>`
3. 嵌套路由：`path='/home/news'`



```jsx
//基本使用步骤,1.导入路由的核心三个组件
import {BrowerRouter as Router,Route,Link } from 'react-router-dom';

//2.使用Router组件包裹整个应用  
<Router>
	<div className='App'>
    ....
	</div>
</Router>

//3.使用Link组件作为导航菜单(路由入口) <Link to='/first' >页面一</Link>  最终会转化为一个a标签
<Router>
	<div className='App'>
    <Link to='/first'>页面一</Link>
	</div>
</Router>

//4.使用Route组件配置路由规则和要展示的组件（路由出口）
const First = () => <P>页面一的页面内容</P>
<Router>
	<div className='App'>
    //指定入口
  	<Link to='/first'>页面一</Link>
    //指定出口
    <Route path='/first' component={First}></Route>
	</div>
</Router>
```

#### 

### 向路由组件传递参数数据

不能用 props 传递数据，因为加载组件用的不是标签的形式，而是：

```jsx
<Route path='/home/message' component={Message}/>
// message.jsx
// 路由链接
<Link to={`/home/message/messagedetail/${m.id}`}>{m.title}</Link>
// 路由
<Route path={`/home/message/messagedetail/:id`} component={MessageDetail}/>
// message-detail.jsx
const {id} = this.props.match.params
```

这样就通过路由参数传递了数据，可以在 `this.props.match.params` 中获取

#### HashRouter/BrowserRouter

HashRouter：使用URL的哈希值实现 （localhost:3000/#/first）

BrowserRouter：使用H5的history API实现



#### 编程式导航

>histroy是React路由提供的，用来获取浏览器历史记录的相关信息，通过props拿到history
>
>props.history.push(path)  跳转到某个页面
>
>props.history.go(n)  前进或后退到某个页面，n代表前进后退的数量（比如-1）

```jsx
class Login extends React.Component{
  handleClick=()=>{
    //使用编程式导航实现路由跳转
    this.props.history.push('/home')
  }
  render(){
    return (
    	<div>
      	<p>登录页面</p>
        <button onClick={this.handleClick}	>登录</button>  
      </div>
    )
  }
}
const Home = () => (
	<div>
  	<h2>我是后台首页</h2>
  </div>
)
const App = () => (
  <Router>
		<div>
  		<h1>编程式导航</h1>
      <Link to='/login'>去登陆页面</Link>
      <Route path='/login' component={Login}></Route>
      <Route path='/home' component={Home}></Route>
  	</div>  
  </Router>
)
```



## 组件间通信

### 方式一：通过 props 传递

1.共同的数据放在父组件上，特有的数据放在自己组件内部（state）

2.通过 props 可以传递一般数据和函数数据，只能一层一层传递

3.一般数据 --> 父组件传递数据给子组件 --> 子组件读取数据

4.函数数据 --> 子组件传递数据给父组件 --> 子组件调用函数

#### 父传子

```jsx
class Parent extends React.Component{
  state={lastName:'王'}
	render(){
    return(
    	<div>
      	传递数据给子组件：<Child name={this.state.lastName} />
      </div>
    )
  }
}
function Child(props){
  return <div>子组件接收到数据：{props.name}</div>
}
```

#### 子传父 

```jsx
//思路：利用回调函数，父组件提供回调传入子组件，子组件调用，将要传递的数据作为回调函数的参数
//1.父组件提供回调函数，用于接收数据
class Parent extends React.Component{
  //注意回调函数的this问题
  getChildMsg = (msg)=> {
    console.log('接收到子组件数据：',msg)
  }
//2.将该函数作为属性的值，传递给子组件
  render(){
    return (
    	<div>
      	子组件<Child getMsg={this.getChildMsg} />
      </div>
    )
  }
}
//3.子组件通过props调用回调函数
class Child extends React.Component{
  state = { childMsg:'子组件数据' }
	handleClick = () => {
    this.props.getMsg(this.state.childMsg)
  }
	render(){
    return(
    	<button onClick={this.handleClick}>点我，传数据给父组件</button>
    )
  }
}
```

#### 兄弟组件通信

```jsx
//将共享状态提升到最近的公共父组件中，由公共父组件管理这个状态。称为：状态提升
//公共父组件职责：1.提供共享状态 2.提供操作共享状态的方法
//要通信的子组件只需通过props接收状态或操作状态的方法
class Father extends React.Component{
//提供状态
  state={
    count:0
  }
//提供修改方法
	onIncrement = () =>{
    this.setState({
      count:this.state.count + 1
    })
  }
  render(){
    return(
    	<div>
      	<Child1 count={this.state.count} />
        <Child2 onIncrement={this.onIncrement}/>
      </div>
    )
  }
}

const Child1 = () =>{
  return <h1>计数器：{props.count}</h1>
}

const Child2 = () =>{
  return <button onClick={()=>props.onIncrement()}>+1</button>
}
```

#### Context 跨组件传递数据

```jsx
//使用步骤1.调用React.creatContext()创建Provider（提供数据）和Consumer（消费数据）两个组件
const {Provider,Consumer} = React.createContext()

//2.使用Provider组件作为父节点，包裹应用
render(){
  return(
  	<Provider>
      <div className='app'>
      	<Child1 />
      </div>
		</Provider>
  )
}

//3.设置value属性，表示要传递的数据
<Provider value='pink'></Provider>

//4.调用Consumer组件接收数据
<Consumer>
	{
    data => <span>data参数为接收到的数据： {data}</span>
  }
</Consumer>
```

### 方式二：使用消息订阅-发布机制（subscribe-publish）

1.工具库：PubSubJS

2.下载：npm install pubsub-js --save

3.使用：

```
import PubSub from 'pubsub-js' //引入

PubSub.subscribe('delete', function(data){ }); //订阅消息，绑定监听
PubSub.publish('delete', data) //发布消息，触发事件
```

例子：

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



### 方式三：redux



------



## 纯函数和高阶函数

#### 纯函数

1.一类特别的函数：只要是同样的输入，必定得到同样的输出

2.必须遵守以下一些约束

 a. 不得改写参数

 b. 不能调用系统 I/O 的 API

 c. 能调用 Date.now() 或者 Math.random() 等不纯的方法

3.reducer 函数必须是一个纯函数

#### 高阶函数

1.理解：一类特别的函数

 a. 情况1：参数是函数

 b. 情况2：返回是函数

2.常见的高阶函数：

 a. 定时器设置函数

 b. 数组的 map()/filter()/reduce()/find()/bind()

 c. react-redux 中的 connect 函数

3.作用：能实现更加动态，更加可扩展的功能

## 参考

[尚硅谷React实战教程(从入门到精通)](https://www.bilibili.com/video/BV1oW41157DY)

[redux基本使用－构建Todolist](https://zhuanlan.zhihu.com/p/92625276)



# Umi/Dva

## 1.用脚手架创建项目

```js
//脚手架初始化项目
//react 提供了一个用于创建 react 项目的脚手架库：`create-react-app`
//项目的整体技术架构为：react + webpack + es6 + eslint
npx create-react-app xxxx
yarn start
```

**常用的 ajax 请求库**

1.jQuery：比较重，如果需要另外引入不建议使用

2.axios：轻量级，建议使用

- 封装了 XmlHttpRequest 对象的 ajax

- 是 promise 风格

- 既可以用在浏览器端又可以用在 node 服务器端

3.fetch：原生函数，但老版本浏览器不支持

- 不再使用 XmlHttpRequest 对象提交 ajax 请求

- 为了兼容低版本的浏览器，可以引入兼容库 fetch.js

### axios

**GET 请求**

```
axios.get('/user?ID=12345')
  .then(response => {
  console.log(response)
})
  .catch(error => {
  console.log(error)
})

axios.get('/user', {
  prams: {
    ID: 12345
  }
})
  .then(response => {
  console.log(response)
})
  .catch(error => {
  console.log(error)
}))
```

**POST 请求**

```
axios.post('/user', {
  firstName: 'Fred',
  lastName: 'Flintstone'
})
  .then(response => {
  console.log(response)
})
  .catch(error => {
  console.log(error)
})))
```

### Fetch

**GET 请求**

```
fetch(url)
  .then(response => {
    return response.json()
}).then(data => {
    console.log(data)
}).catch(error => {
    console.log(error)
})
```

**POST 请求**

```
fetch(url, {
  method: 'POST',
  body: JSON.stringify(data)
}).then(data => {
    console.log(data)
}).catch(error => {
    console.log(error)
})
```

## 最流行的开源 React UI 组件库

### material-ui(国外)

1.官网：http://www.material-ui.com/#/

2.github：https://github.com/callemall/material-ui

### ant-design(国内蚂蚁金服)

1.PC官网：https://ant.design/index-cn

2.移动官网：https://mobile.ant.design/index-cn

3.Github：https://github.com/ant-design/ant-design/

4.Github：https://github.com/ant-design/ant-design-mobile/

### ant-design-mobile 使用入门

**搭建 antd-mobile 的基本开发环境**

[基本使用](https://mobile.ant.design/docs/react/introduce-cn#1.-创建一个项目)

**实现按需打包(组件js/css)**

[按需加载](https://mobile.ant.design/docs/react/use-with-create-react-app-cn#按需加载)



# React-Hook

> Hook 就是 JavaScript 函数，但是使用它们会有两个额外的规则：
>
> - 只能在**函数最外层**调用 Hook。不要在循环、条件判断或者子函数中调用。
> - 只能在 **React 的函数组件**中调用 Hook。不要在其他 JavaScript 函数中调用。（还有一个地方可以调用 Hook —— 就是自定义的 Hook 中，我们稍后会学习到。）

## State Hook



## Effect Hook





## 自定义 Hook

> 目前为止，在 React 中有两种流行的方式来共享组件之间的状态逻辑: [render props](https://react.docschina.org/docs/render-props.html) 和[高阶组件](https://react.docschina.org/docs/higher-order-components.html)，现在让我们来看看 Hook 是如何在让你不增加组件的情况下解决相同问题的。

当我们想在两个函数之间共享逻辑时，我们会把它提取到第三个函数中。而组件和 Hook 都是函数，所以也同样适用这种方式。

**自定义 Hook 是一个函数，其名称以 “`use`” 开头，函数内部可以调用其他的 Hook。**





## 内置 Hook API

- [基础 Hook](https://react.docschina.org/docs/hooks-reference.html#basic-hooks)
  - [`useState`](https://react.docschina.org/docs/hooks-reference.html#usestate)
  - [`useEffect`](https://react.docschina.org/docs/hooks-reference.html#useeffect)
  - [`useContext`](https://react.docschina.org/docs/hooks-reference.html#usecontext)
- [额外的 Hook](https://react.docschina.org/docs/hooks-reference.html#additional-hooks)
  - [`useReducer`](https://react.docschina.org/docs/hooks-reference.html#usereducer)
  - [`useCallback`](https://react.docschina.org/docs/hooks-reference.html#usecallback)
  - [`useMemo`](https://react.docschina.org/docs/hooks-reference.html#usememo)
  - [`useRef`](https://react.docschina.org/docs/hooks-reference.html#useref)
  - [`useImperativeHandle`](https://react.docschina.org/docs/hooks-reference.html#useimperativehandle)
  - [`useLayoutEffect`](https://react.docschina.org/docs/hooks-reference.html#uselayouteffect)
  - [`useDebugValue`](https://react.docschina.org/docs/hooks-reference.html#usedebugvalue)