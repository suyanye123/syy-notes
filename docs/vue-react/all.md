# 比较 vue、react

## 相同点

1. 都使用了 Virtual DOM（虚拟 DOM），有自己的 diff 渲染算法
2. 都提供了响应式（Reactive）和组件化（Composable）的视图组件
3. 都将注意力集中保持在核心库，而将其他功能如路由和全局状态管理交给相关库（vue-router、vuex、react-router、redux 等）

## 数据管理

### 数据更新

1.React 是在 state 对象中进行状态管理、存储数据的，并且都是 immutable 不可变的。不能直接用 `this.state = {}` 来修改原 state，只能通过 setState() 传入新 state 对象 `this.setState({})` 的方式来更新 state 状态。

> 更新会被合并，React 为了优化性能，有可能会将多个 setState() 调用合并为一次更新。更新也可能是异步的，不能依赖其更新的值计算下一个 state。这时可以用另一种 setState() 的形式，它接受一个函数而不是一个对象。这个函数将接收前一个状态作为第一个参数，应用更新时的 props 作为第二个参数

2.在 Vue 中，**数据在 data 属性中进行响应式管理，可以直接改变原数据**。

> 对每一个属性建立 Watcher 来监听， 当 data 属性变化的时候，响应式的更新对应的虚拟 dom

### 数据流

![img](https://img-blog.csdnimg.cn/20200903105437537.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwNTA4ODMy,size_16,color_FFFFFF,t_70#pic_center)

**vue2 与 react 中通信的 props 都是单向数据流，由父组件流向子组件中。**这样是为了组件间更好的解耦，在开发中可能有多个子组件依赖于父组件的某个数据，假如子组件可以修改父组件数据的话，一个子组件修改会引发所有依赖这个数据的其他子组件发生变化，所以 vue 不推荐子组件修改父组件的数据，直接修改 props 会抛出警告。

### 数据双向绑定

**Vue**

所谓双向绑定，指的是 vue 实例中的 data 与其渲染的 DOM 元素的内容保持一致，无论谁被改变，另一方会相应的更新为相同的数据。这是通过 Object.defineProperty 监听劫持 data 对象的 getter/setter 属性实现的。Vue 的依赖追踪是：原理上不支持双向绑定，v-model 只是通过监听 DOM 事件实现的语法糖。

在 Vue2 中父子组件之间不能双向绑定了（但是提供了一个语法糖 $emit 可以自动通过事件的方式修改），并且 Vue2 已经不鼓励组件对自己的 props 进行任何修改了。所以现在只有 组件实例 <--> DOM 之间通过 v-model 双向绑定

**React**

而 React 从诞生之初就不支持双向绑定，React一直提倡的是单向数据流，称之为 onChange/setState() 模式。

和 vue 相比 react 并没有提供向 v-model 这样的指令来实现文本框的数据流双向绑定，只能通过改变 State 改变视图。所以我们需要借助 onChange 和 setState 来实现一个受控组件的双向数据流。

不过由于我们一般都会用 Vuex 以及 Redux 等单向数据流的状态管理框架，因此很多时候我们感受不到两者在这一点上的区别了。

## 组件通信

![img](https://img-blog.csdnimg.cn/20200903105437551.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwNTA4ODMy,size_16,color_FFFFFF,t_70#pic_center)

### Vue 中实现组件通信

**父子之间**

1.父 --> 子：父组件通过 props 向子组件传递数据或者方法

2.子 --> 父：事件绑定机制 this.$emit('eventName', data)

3.通过 `$parent` 和 `$children` 获取组件的父或者子组件的实例，之后通过实例对象去修改组件的属性。

**兄弟之间**

1.先传递给父组件，再传递给兄弟组件

2.查找父组件下的子组件实例，然后进行组件进行通信。如 `this.$parent.$children`，在`$children`中，可以通过组件的 name 找到要通信的组件，进而进行通信。

**多层级组件**

1.通过不断的获取 `$parent/$children` 找到需要传递的祖先/孙级组件，然后进行通信，但是这样繁琐易错，并不推荐。

2.V2.2.0 中新增的 provide/inject 来实现父组件向子组件注入数据，可以跨越多个层级。

**任意组件之间**

1.简单的情况使用 EventBus 或 Pubsub

2.复杂的情况使用 Vuex

### 在 React 中实现组件通信

**父子之间**

1.父 --> 子：通过props将数据传递给子组件

2.子 --> 父：父组件向子组件传递方法，子级调用了父级的方法，利用回调函数实现数据传递

**兄弟之间**

先将数据传递给父组件，然后父组件再传递给兄弟组件。

**多层级组件**

可以通过 context（Provider/Consumer） 进行跨层级的通信，这其实和 vue中的 provide/inject 起到的作用差不多。

**任意组件之间**

1.简单的情况使用 EventBus 或 Pubsub

2.复杂的情况使用 Redux

## 模板渲染

### HTML

1.**表层上， 模板的语法不同**：

- 在 React 中，一切都是 JavaScript。React 是通过 JSX 渲染模板
- 而 Vue 是通过模板语法 Template 进行渲染

2.**深层上，模板的原理不同**，这才是他们的本质区别：

- React 是在组件 JS 代码中，通过原生 JS 实现模板中的常见语法，比如插值，条件，循环等，都是通过 JS 语法（如 map 遍历）实现的
- Vue 是在和组件 JS 代码分离的单独的 template 模板中，通过指令来实现的，比如 v-if、v-for 等

> react 中 render 函数是支持闭包特性的，所以我们 import 的组件在 render 中可以直接调用。但是在 Vue 中，由于模板中使用的数据都必须挂在 this 上进行一次中转，所以我们 import 一个组件完了之后，还需要在 components 中再声明下

### CSS

- 对于 Vue 来说，设置样式的默认方法是单文件组件里 style 的标签。 可以在同一个文件里完全控制 CSS，将其作为组件代码的一部分
- 对于 React 来说，设置 class 是用 className 字段
  - 设置内联样式 style 属性是使用对象的形式：style={{display: display}}
  - 或者引入外部的 css 文件

### 组合-组件间的代码重用

- React 通过特殊的 prop.children + JSX 的形式来实现父子级嵌套。（React 可以通过 props 传递任何东西，对象，JSX，甚至组件）
- vue 中的组件嵌套是通过 `<slot>` 标签。

两者差异不大。

### 再渲染性能

#### React

React 中，当某个组件的状态发生变化时，它会以该组件为根重新渲染整个组件子树（当前视图包括其中的组件子组件和底下的子组件都会一起更新），这样将导致不必要的子组件被重新渲染，违反性能的机制。

所以 React 提供了生命周期 `shouldComponentUpdate` 方法让你决定当前组件是否更新，还有 `PureComponent` 方法会自动检测，state 或者 props 发生变化时，才会调用 render 方法。但这只是浅比较，如果搭配 ImmutableJs 持久化数据，性能会大大的提升，除此之外还能节省大量的手动比较代码的时间。

过程：

1. 调用 render 函数利用 JSX 生成虚拟 Dom 树，直到数据 state/props 发生改变的时候，render 函数会被再次调用渲染出另外一棵虚拟 Dom 树
2. 比较前后两棵 Dom 树同层级的节点区别，非同层级节点包括所属子节点整个直接删除重新创建
   - 不同的节点类型，直接替换（删除，重新创建）
   - 相同节点类型
     - 是 DOM 节点，替换属性；如果有 children，继续递归比较 children
     - 是组件节点，继续递归，比较其子节点
   - 列表比较.赋予唯一的 key 作比较
3. 更新视图中差异的地方

#### Vue

因为 Vue 是使用 Object.defineProperty 对绑定的 data 属性进行数据劫持的，所以比起 React，它能够精确接收到哪些组件才是需要渲染的。

> 通过 Watcher 监听数据的变化，当数据发生变化时，Render 函数执行生成 VNode 对象，通过 patch 方法，对比新旧 VNode 对象，通过 Diff 算法，添加、修改、删除，得到真正的DOM元素

过程：

1. Vue 将遍历此 data 对象所有的属性，并使用 Object.defineProperty 把这些属性全部转为 getter/setter
2. 每个组件实例都有相应的 watcher 对象，它会在组件渲染的过程中把标签元素的属性保存为依赖（dep）
3. 在 data 的属性被访问和修改时通知对应组件
4. 对应的组件再次调动渲染函数，生成虚拟 Dom 树对比，实现更新

## Vuex 和 Redux

### 核心概念对比

**Vuex：**

![img](https://img-blog.csdnimg.cn/2020090310481864.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwNTA4ODMy,size_16,color_FFFFFF,t_70#pic_center)

**Redux：**

![img](https://img-blog.csdnimg.cn/20200903104817967.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQwNTA4ODMy,size_16,color_FFFFFF,t_70#pic_center)

| Vue                                                    | Redux                                                        |
| ------------------------------------------------------ | ------------------------------------------------------------ |
| action 可用于异步操作，commit 提交 mutation            | action 同步操作，或借助中间件实现异步操作（不会改变 store，只是描述了有事情发生） |
| mutation 根据旧的 state 和传递的数据参数直接修改 state | reducer 纯函数，根据 action 对象中的 type/data 和旧的 state 计算新的 state |
| state 单一数据源                                       | store 单一数据源，把 actions 和 reducers 联系到一起的对象.   |

### 将状态数据绑定到视图

**从表面上来说，store 注入和使用方式有一些区别：**

1.在 Vuex 中，$store 作为全局属性被直接注入到了组件实例中，可以比较灵活的使用：

- 使用 dispatch 和 commit 提交更新
- 可以直接通过 this.$store 来读取数据或者通过 `mapState`、`mapAction`、`mapMutations` 等 API 将 store 映射到 Vuex 各个组件，这个参考了 React-redux 的 `mapStateToProps`。

2.在 Redux 中，我们每一个组件都需要显式的用 connect/provider 把 UI 组件与其需要的 props、actions 连接起来。 也可以直接使用 Redux 自己提供的 `store.subscribe()` 订阅 store 的改变到组件中的 props 属性（`this.props.store`）。Redux 不仅仅可以用于 React，也可以用于其他框架如 Vue。

另外 Vuex 更加灵活一些，组件中既可以 dispatch action 也可以 commit updates，而 Redux 中只能进行 dispatch，并不能直接调用 reducer 进行修改。

**从实现原理上来说，最大的区别是两点：**

- Redux 使用的是不可变数据，而 Vuex 的数据是可变的。Redux 每次都是生成新的 state 替换旧的 state，而 Vuex 是直接修改
- Redux 在检测数据变化的时候，是通过 diff 的方式比较差异的，而 Vuex 和 Vue 的原理一样，是通过 getter/setter 来比较的（如果看 Vuex 源码会知道，内部直接创建一个 Vue 实例用来跟踪数据变化）

> 而这两点的区别，其实也是因为 React 和 Vue 的设计理念上的区别。React 更偏向于构建稳定大型的应用，非常的科班化。相比之下，Vue 更偏向于简单迅速的解决问题，更灵活，不那么严格遵循条条框框。因此也会给人一种大型项目用 React，小型项目用 Vue 的感觉。

### API

#### Vuex

1. `getters` ：用于根据 state 派生出一些数据，类似 Vue 的计算属性，当 state 改变时会重新计算一个结果出来提供给需要的组件；
2. 在组件中调用 `$store.dispatch('action名称', data)` 用于分发 action creator 函数，提交 mutation 更新 state 数据。

#### Redux

1. 提供了 `store.getState()` 这个 API 获取 store 的 state
2. 还有 `store.subscribe(listener)` 订阅 store 的变化，当 store 改变时会调用监听器；`store.unsubscribe(listener)` 返回的函数注销监听器
3. 在组件中调用 `store.dispatch({type, data})` 用于分发 action 对象，或者 `store.dispatch(action ceator名称(data))` 调用 action creactor 去创建对应的 action 对象，通知 reducer 更新 state 数据。

Redux：(dispatch)action --> (reducer)state

Vuex：(dispatch)action --> (commit)mutation --> (mutate)state

### 划分状态

对于大型项目，当应用状态数据过于复杂，可以划分状态，这样便于管理数据流向。

Redux 可以通过 `combineReducers()` 结合各个组件的 reducer，各个组件可以单独管理自己的状态，最后合并为一个 reducer 用于生成一个 store

Vuex 用 `Module` 这个概念划分 store，每个模块拥有自己的 state、mutation、action、getter。

### 使用原则

Redux 的原则：

1. 单一数据源（一个 Redux 应用只有一个 store），也是单向的数据流
2. state 只读，不能被修改（唯一改变 state 的方法就是触发 reducer 生成新的 state 替换旧的）
3. 使用纯函数（reducer）来修改 state

Vuex 的原则：

1. 应用层级的状态应该集中到单个 store 对象（不只有一个）中。
2. 提交 mutation 是更改状态的唯一方法，并且这个过程是同步的。
3. 异步逻辑都应该封装到 action 里面。

## 参考

[个人理解Vue和React区别](https://juejin.im/post/6844903668446134286)

[Vue与React比较](https://juejin.im/post/6844903671461838862)

[Redux 和 Vuex 的对比](https://juejin.im/post/6844903929063424013)

[vue和react对比(详解)](https://www.cnblogs.com/yangyangxxb/p/10105856.html)

[浅谈MVC,MVP,MVVM渐进变化及React与Vue比较](https://segmentfault.com/a/1190000019991211)